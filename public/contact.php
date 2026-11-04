<?php
/**
 * Prime-Techmate enquiry form handler.
 *
 * Runs on the Hostinger hosting alongside the static site (it is copied
 * into `out/` by `npm run build`). It receives the contact form as a POST
 * request and emails it to RECIPIENT using PHP's mail().
 *
 * The page calls it at /contact.php. It always answers with JSON:
 *   { "ok": true } or { "ok": false, "error": "..." }
 */

declare(strict_types=1);

const RECIPIENT = 'info@centreghana.com';
const MAX_PER_WINDOW = 5;       // enquiries allowed per visitor...
const WINDOW_SECONDS = 600;     // ...in this many seconds

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function field(string $key, int $max): string
{
    $value = trim((string) ($_POST[$key] ?? ''));
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
}

/** Remove line breaks so a value cannot inject extra mail headers. */
function single_line(string $value): string
{
    return trim((string) preg_replace('/[\r\n\t]+/', ' ', $value));
}

function encode_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// Only accept submissions sent from this website.
$host = strtolower((string) preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')));
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    respond(403, ['ok' => false, 'error' => 'Forbidden.']);
}

// Honeypot: real visitors never see or fill this field. Pretend success for bots.
if (field('website', 200) !== '') {
    respond(200, ['ok' => true]);
}

$name = single_line(field('name', 120));
$organisation = single_line(field('organisation', 160));
$email = single_line(field('email', 200));
$phone = single_line(field('phone', 40));
$interest = single_line(field('interest', 120));
$message = field('message', 5000);

$errors = [];
if ($name === '') {
    $errors['name'] = 'Please enter your name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}
if (strlen($message) < 10) {
    $errors['message'] = 'Please tell us a little about your project.';
}
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'Please check the highlighted fields.', 'fields' => $errors]);
}

// Simple per-visitor rate limit, stored in the server's temp folder.
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$bucket = sys_get_temp_dir() . '/ptm-enquiry-' . hash('sha256', $ip);
$now = time();
$recent = [];
if (is_file($bucket)) {
    $stored = json_decode((string) @file_get_contents($bucket), true);
    if (is_array($stored)) {
        $recent = array_values(array_filter($stored, static fn ($t) => is_int($t) && $t > $now - WINDOW_SECONDS));
    }
}
if (count($recent) >= MAX_PER_WINDOW) {
    respond(429, ['ok' => false, 'error' => 'Too many enquiries in a short time. Please try again later.']);
}

$domain = (string) preg_replace('/^www\./', '', $host);
if (!preg_match('/^[a-z0-9.-]+$/', $domain)) {
    $domain = 'localhost';
}
$subject = encode_header('Website enquiry from ' . $name . ($organisation !== '' ? " ({$organisation})" : ''));

$lines = [
    'New enquiry from the Prime-Techmate website',
    str_repeat('-', 44),
    'Name:          ' . $name,
    'Organisation:  ' . ($organisation !== '' ? $organisation : '-'),
    'Email:         ' . $email,
    'Phone:         ' . ($phone !== '' ? $phone : '-'),
    'Interested in: ' . ($interest !== '' ? $interest : '-'),
    '',
    'Message:',
    $message,
    '',
    str_repeat('-', 44),
    'Sent ' . gmdate('Y-m-d H:i') . ' UTC from ' . $domain,
];
$body = str_replace(["\r\n", "\r"], "\n", implode("\n", $lines));

$headers = [
    'From: ' . encode_header('Prime-Techmate Website') . " <noreply@{$domain}>",
    'Reply-To: ' . encode_header($name) . " <{$email}>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = @mail(RECIPIENT, $subject, $body, implode("\r\n", $headers), '-f noreply@' . $domain);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'Your message could not be sent. Please try again later.']);
}

$recent[] = $now;
@file_put_contents($bucket, json_encode($recent), LOCK_EX);

respond(200, ['ok' => true]);
