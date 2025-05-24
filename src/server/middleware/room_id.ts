import type { Request, Response, NextFunction } from "express";

const middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.params.room_id !== undefined) {
    res.locals.room_id = req.params.room_id;
  } else {
    res.locals.room_id = 0;
  }

  next();
};

export default middleware;
