import { chain } from "~/middlewares/chain";
import { corsMiddleware } from "~/middlewares/cors";
import { loggingMiddleware } from "~/middlewares/logging";
import { bookingMiddleware } from "./middlewares/booking";

export default chain([corsMiddleware, loggingMiddleware, bookingMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
