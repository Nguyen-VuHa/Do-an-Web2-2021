import { cookies } from "next/headers";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/constants/cookies";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.set(ACCESS_TOKEN, "", { expires: new Date(0), path: "/" });
  cookieStore.set(REFRESH_TOKEN, "", { expires: new Date(0), path: "/" });

  return new Response("Sign-out successfully", { status: 200 });
}
