import { chain } from "~/middlewares/chain";
import { corsMiddleware } from "~/middlewares/cors";
import { loggingMiddleware } from "~/middlewares/logging";
import { authMiddleware } from "./middlewares/auth";

export default chain([corsMiddleware, loggingMiddleware, authMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
