import { NextRequest, NextResponse } from "next/server";
import { apiSignInAccount } from "~/apis/auth.api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/constants/cookies";
import { STATUS_SUCCESS } from "~/constants/status";
import { ISignInPayload } from "~/types/auth.type";

export async function POST(req: NextRequest) {
  const signInPayload: ISignInPayload = await req.json();

  // Gửi request tới API server (server khác)
  const apiResponse = await apiSignInAccount(signInPayload);

  // Set cookie trên SSR
  const response = NextResponse.json(apiResponse, {
    status: apiResponse.statusCode,
  });

  if (apiResponse && apiResponse.statusCode === STATUS_SUCCESS) {
    const data = apiResponse.data;

    response.cookies.set(ACCESS_TOKEN, data.accessToken || "", {
      httpOnly: false,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 ngày
    });

    response.cookies.set(REFRESH_TOKEN, data.refreshToken || "", {
      httpOnly: false,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 ngày
    });

    return response;
  } else {
    return response;
  }
}
