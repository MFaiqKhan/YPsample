import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function appendWaitlistEmail(email: string) {
  const dir = path.join(process.cwd(), ".data");
  const filePath = path.join(dir, "waitlist.jsonl");

  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(
    filePath,
    JSON.stringify({ email, createdAt: new Date().toISOString() }) + "\n",
    "utf8",
  );
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, message: "Expected JSON body." },
      { status: 415 },
    );
  }

  const body = (await req.json().catch(() => null)) as unknown;
  const email =
    typeof body === "object" && body !== null && "email" in body
      ? (body as { email?: unknown }).email
      : undefined;

  if (typeof email !== "string" || !isValidEmail(email.trim().toLowerCase())) {
    return NextResponse.json(
      { ok: false, message: "Invalid email." },
      { status: 400 },
    );
  }

  await appendWaitlistEmail(email.trim().toLowerCase());

  return NextResponse.json({ ok: true, message: "You’re on the list." });
}

