import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getOAuthUrl, TAuthProvider } from "@shared/utils/query/getOAuthUrl.utils";

async function GET(req: NextRequest) {
  const provider = req.nextUrl.searchParams.get("provider") as TAuthProvider;
  const origin = req.nextUrl.origin;

  const state = crypto.randomBytes(16).toString("hex");

  const codeVerifier = crypto.randomBytes(64).toString("base64url");
  const codeVerifierHash = crypto.createHash("sha256").update(codeVerifier).digest();
  const codeChallenge = codeVerifierHash.toString("base64url").replace(/=+$/, "");

  const oauthURL = getOAuthUrl(origin, provider, codeChallenge, state);

  return NextResponse.redirect(oauthURL);
}
