import type { Request, Response, NextFunction } from "express";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`Middleware: Auth running...`)
  console.log(req.session);
  if (req.session.user) {
    res.locals.user = req.session.user;

    next();
  } else {
    console.log("Middleware: Auth Failed, User must be logged in");
    res.redirect("/auth/login");
  }
};

export default authMiddleware;
