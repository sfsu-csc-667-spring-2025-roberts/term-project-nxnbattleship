import type { Request, Response, NextFunction } from "express";

const roomMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  ) => {
    const { room_id } = req.params;
    if (room_id == undefined && req.url.includes("lobby")) {
      res.locals.room_id = 0;
    } else if (room_id !== undefined) {
      res.locals.room_id = room_id;
    }

  next();
};

export default roomMiddleware;
