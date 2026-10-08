import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Storyblok signs the raw request body with the webhook secret
 * (HMAC-SHA1, hex) and sends the result in the `webhook-signature` header.
 */
function isValidSignature(
  payload: string,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature) return false;

  const expected = createHmac("sha1", secret).update(payload).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(signature);

  // timingSafeEqual throws if the lengths differ, so check them first.
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const payload = await request.text();
  const signature = request.headers.get("webhook-signature");

  // Fail closed: without a configured secret nobody can revalidate.
  if (!secret || !isValidSignature(payload, signature, secret)) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}