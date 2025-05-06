import { Request, Response, NextFunction } from "express";

const mware_time = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(`Request made at ${new Date().toISOString()}`);
  next();
};

export { mware_time };
