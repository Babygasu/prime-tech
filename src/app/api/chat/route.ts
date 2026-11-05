import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "@/lib/chatbot/knowledge";

// In-memory sliding-window rate limiter per client IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export type ChatMessage = {
  role: "user" | "model";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP for Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "You are sending messages too quickly. Please pause for a moment and try again.",
        },
        { status: 429 }
      );
    }

    // 2. Validate API Key
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      console.error("[Chat API] GEMINI_API_KEY is not configured in server environment.");
      return NextResponse.json(
        {
          success: false,
          error: "The virtual assistant is unconfigured on this deployment. Please add GEMINI_API_KEY in Vercel Project Settings > Environment Variables.",
        },
        { status: 503 }
      );
    }

    // 3. Parse & Validate Payload
    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload. 'messages' array is required." },
        { status: 400 }
      );
    }

    // Keep only the most recent 6 messages to keep context concise, relevant, and cost-controlled
    const rawMessages: unknown[] = body.messages.slice(-6);
    const validatedMessages: ChatMessage[] = [];

    for (const item of rawMessages) {
      if (
        typeof item === "object" &&
        item !== null &&
        "role" in item &&
        "content" in item &&
        (item.role === "user" || item.role === "model") &&
        typeof item.content === "string"
      ) {
        const cleanContent = item.content.trim().slice(0, 800);
        if (cleanContent.length > 0) {
          validatedMessages.push({
            role: item.role as "user" | "model",
            content: cleanContent,
          });
        }
      }
    }

    if (validatedMessages.length === 0 || validatedMessages[validatedMessages.length - 1].role !== "user") {
      return NextResponse.json(
        { success: false, error: "Last message must be from a user with non-empty content." },
        { status: 400 }
      );
    }

    // 4. Initialize Official Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey });
    const configuredModel = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
    const candidateModels = Array.from(
      new Set([configuredModel, "gemini-flash-lite-latest", "gemini-3.5-flash-lite", "gemini-flash-latest"])
    );

    // Format contents according to the Gemini SDK schema
    const contents = validatedMessages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    // 5. Call Gemini with Timeout Handling & Multi-Model Fallback
    let replyText = "";
    let lastError: unknown = null;

    for (const modelToTry of candidateModels) {
      try {
        const response = await Promise.race([
          ai.models.generateContent({
            model: modelToTry,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              maxOutputTokens: 750,
              temperature: 0.35, // lower temperature for higher factual grounding
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Timeout waiting for AI response")), 12000)
          ),
        ]);

        if (response.text?.trim()) {
          replyText = response.text.trim();
          break; // successfully got response
        }
      } catch (err: unknown) {
        lastError = err;
        console.warn(`[Chat API] Model ${modelToTry} failed or busy, trying fallback...`);
      }
    }

    if (!replyText) {
      console.error("[Chat API Error]: All candidate models failed.", lastError);
      return NextResponse.json(
        {
          success: false,
          error: "Our assistant is experiencing high traffic right now. Please try again in a few seconds or contact us directly.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: replyText,
    });
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number };
    console.error("[Chat API Error]:", err?.message || error);

    return NextResponse.json(
      {
        success: false,
        error: "Our assistant encountered an unexpected error. Please try again or visit our Contact page.",
      },
      { status: 500 }
    );
  }
}
