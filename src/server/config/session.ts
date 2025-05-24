import type { Express, RequestHandler } from "express";

import session from "express-session";
import connectPgSimple from "connect-pg-simple";

let sessionMiddleware: RequestHandler;

const configureSession = (app: Express) => {
  const store = new (connectPgSimple(session))({
    createTableIfMissing: true,
  });

  const secret = process.env.SESSION_SECRET || "fallback_secret";
  
  const sessionMiddleware = session({
    store,
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: false,
  });

  app.use(sessionMiddleware);

  return sessionMiddleware;
};

export default configureSession;
export { sessionMiddleware };
