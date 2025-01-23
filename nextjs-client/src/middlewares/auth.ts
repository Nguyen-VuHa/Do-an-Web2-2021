import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "~/constants/cookies";
import { CustomMiddleware } from "./chain";

export function authMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    // Lấy token từ cookie
    const token = request.cookies.get(ACCESS_TOKEN)?.value;

    const url = request.nextUrl.clone();

    const pathsToAuth = ["/dat-ve", "/tai-khoan", "/history"];
    // Kiểm tra nếu đường dẫn bắt đầu với "/dat-ve" và không có token
    console.log(
      url.pathname,
      pathsToAuth.some((path) => url.pathname.startsWith(path)),
    );

    if (pathsToAuth.some((path) => url.pathname.startsWith(path)) && !token) {
      url.pathname = "/dang-nhap"; // Chuyển hướng về trang đăng nhập
      return NextResponse.redirect(url);
    }

    return middleware(request, event, response);
  };
}
