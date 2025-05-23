import type { Request, Response, NextFunction } from "express";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // @ts-ignore
  if (req.session.user) {
    // @ts-ignore
    res.locals.user = req.session.user;

    next();
  } else {
    res.redirect("/auth/login");
  }
};

export default authMiddleware;
