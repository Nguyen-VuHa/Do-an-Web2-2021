import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/constants/cookies";

export async function POST(req, res) {
  const { access_token, refresh_token } = req.body;

  res.cookies.set(ACCESS_TOKEN, access_token || "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 ngày
  });

  res.cookies.set(REFRESH_TOKEN, refresh_token || "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 ngày
  });

  res.status(200).json({ message: 'Token saved to cookie' });
  res.writeHead(302, { Location: '/' });  // Chuyển hướng về trang chủ
  res.end();
}
