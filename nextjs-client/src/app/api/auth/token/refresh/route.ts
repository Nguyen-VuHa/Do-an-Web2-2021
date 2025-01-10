import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/constants/cookies";
import { STATUS_SUCCESS } from "~/constants/status";

export async function POST(req: NextRequest) {
  // Lấy cookie bằng cách sử dụng req.cookies
  const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token failed" },
      { status: 403 },
    );
  }

  const responseToken = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/token/refresh",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  const tokenData = responseToken.data;

  const response = NextResponse.json(tokenData, {
    status: tokenData.statusCode,
  });

  if (tokenData.statusCode === STATUS_SUCCESS) {
    response.cookies.set(ACCESS_TOKEN, tokenData.data.access_token || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 ngày
    });

    response.cookies.set(REFRESH_TOKEN, tokenData.data.refresh_token || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 ngày
    });

    return response;
  }

  return response;
}
