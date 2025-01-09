import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

export function corsMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const allowedOrigin = process.env.NEXT_PUBLIC_FRONT_END_URL;

    const requestOrigin = request.headers.get("origin");

    if (requestOrigin && requestOrigin !== allowedOrigin) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return middleware(request, event, response);
  };
}
