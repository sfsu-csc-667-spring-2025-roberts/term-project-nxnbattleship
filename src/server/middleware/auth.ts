import type { Request, Response, NextFunction } from "express";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`Middleware: Auth running...`)
  
  // @ts-ignore
  if (req.session.user) {
    // @ts-ignore
    res.locals.user = req.session.user;

    next();
  } else {
    console.log("Middleware: Auth Failed, User must be logged in");
    res.redirect("/auth/login");
  }
};

export default authMiddleware;
