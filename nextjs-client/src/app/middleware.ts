import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const allowedOrigin = process.env.NEXT_PUBLIC_FRONT_END_URL;

  const requestOrigin = req.headers.get("origin");

  if (requestOrigin && requestOrigin !== allowedOrigin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next(); // Tiếp tục xử lý request nếu hợp lệ
}
