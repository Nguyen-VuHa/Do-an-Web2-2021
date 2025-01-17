import { NextResponse } from "next/server";
import { apiVerifyAccount } from "~/apis/auth.api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/constants/cookies";
import { STATUS_SUCCESS } from "~/constants/status";

export async function GET(req) {
  // Lấy query từ URL
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id"); // Thay 'user_id' bằng key query của bạn

  // Lấy giá trị từ header
  const token = searchParams.get("token"); // Thay 'token' bằng tên header của bạn

  // Payload cho API verify
  const payload = {
    user_id: user_id,
    token: token,
  };

  const protocol = req.headers.get("x-forwarded-proto") || "http";
  const host = req.headers.get("host");
  const homeUrl = `${protocol}://${host}/`; // Tạo URL tuyệt đối cho trang chủ

  try {
    const resVerify = await apiVerifyAccount(payload);
    // Kiểm tra phản hồi từ API verify
    if (resVerify && resVerify.statusCode === STATUS_SUCCESS) {
      const data = resVerify.data;

      // Tạo response để đặt cookie
      const response = NextResponse.redirect(homeUrl);

      // Đặt cookie cho ACCESS_TOKEN
      response.cookies.set(ACCESS_TOKEN, data.accessToken || "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 ngày
      });

      // Đặt cookie cho REFRESH_TOKEN
      response.cookies.set(REFRESH_TOKEN, data.refreshToken || "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 ngày
      });

      // Trả về response với redirect và cookie
      return response;
    } else {
      if (resVerify.error === "1") {
        // Tạo response để đặt cookie
        return NextResponse.redirect(homeUrl);
      } else {
        // Trường hợp verify thất bại
        return NextResponse.redirect(homeUrl + "/error");
      }
    }
  } catch (error) {
    // Xử lý lỗi khi gọi API
    console.error("Error verifying account:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
