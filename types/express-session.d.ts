// types/express-session.d.ts
import "express-session";

console.log("✅ express-session.d.ts loaded");

declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      username: string;
      email: string;
      gravatar: string;
    };
  }
}
