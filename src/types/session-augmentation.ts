// This exists just because everything on the internet
// is telling me conflicting things on /types/*.d.ts
// and the only way it works is to make it janky like this
import "express-session";
import {default as User} from "./user"

console.log("express-session type expanded!");

declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}
