import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "~/constants/cookies";
import { CustomMiddleware } from "./chain";

export function loggingMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    // Lấy token từ cookie
    const token = request.cookies.get(ACCESS_TOKEN)?.value;

    // Định nghĩa các trang auth
    const authPath: string[] = ["/dang-nhap", "/dang-ky"];

    // Nếu có token và đang ở trong trang đăng nhập hoặc đăng ký, chuyển hướng về trang chủ
    if (token && authPath.includes(request.nextUrl.pathname)) {
      console.log("Redirecting to home page because user is already logged in");
      return NextResponse.redirect(new URL("/", request.url)); // Chuyển hướng về trang chủ
    }

    return middleware(request, event, response);
  };
}
