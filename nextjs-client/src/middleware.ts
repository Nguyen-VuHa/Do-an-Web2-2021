import { chain } from "~/middlewares/chain";
import { corsMiddleware } from "~/middlewares/cors";
import { loggingMiddleware } from "~/middlewares/logging";

export default chain([corsMiddleware, loggingMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
