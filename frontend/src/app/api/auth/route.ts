import { NextURL } from "next/dist/server/web/next-url";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface googleResponse extends NextResponse {
  code?: string;
}

export async function GET(res: googleResponse) {
  const path = new NextURL(res.url);
  const code = path.searchParams.get("code");
  if (!code) {
    redirect("/");
  }
  console.log(code);
  redirect("/user");
}
