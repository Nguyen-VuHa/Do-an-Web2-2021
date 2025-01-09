import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "~/constants/cookies";

export async function GET(req: NextRequest) {
  // Lấy cookie bằng cách sử dụng req.cookies
  const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return NextResponse.json("", { status: 200 });
  }

  return NextResponse.json(accessToken, { status: 200 });
}
