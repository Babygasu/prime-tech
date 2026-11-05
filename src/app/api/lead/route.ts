import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    const { name, organisation, email, phone, interest, message, consent, website } = body;

    // Bot honeypot check
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Required fields check
    if (!name?.trim()) {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "A valid email is required." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json(
        { success: false, error: "Please agree to the privacy policy to submit your enquiry." },
        { status: 400 }
      );
    }

    // If on local preview / development, simulate successful submission
    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) {
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Your enquiry has been received (simulated in local preview).",
      });
    }

    // In production on Hostinger, forward to the existing PHP mail handler
    const host = req.headers.get("host") || "indigo-alligator-395177.hostingersite.com";
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const endpoint = `${protocol}://${host}/contact.php`;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("organisation", (organisation || "").trim());
    formData.append("email", email.trim());
    formData.append("phone", (phone || "").trim());
    formData.append("interest", (interest || "General Healthcare Technology Enquiry").trim());
    formData.append("message", (message || "Enquiry submitted via AI Assistant").trim());
    formData.append("website", "");

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    const data = await res.json().catch(() => null);

    if (res.ok && data?.ok) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: data?.error || "Could not deliver your enquiry. Please use our Contact page." },
      { status: 502 }
    );
  } catch (error) {
    console.error("[Lead API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Could not submit enquiry. Please use the Contact page." },
      { status: 500 }
    );
  }
}

