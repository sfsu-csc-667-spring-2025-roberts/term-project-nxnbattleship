import { Request, Response, NextFunction } from "express";

const mware_time = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const time_current = new Date().toISOString();
  console.log(`Current Time: ${time_current}`);

  res.locals.time_current = time_current; // Store the time in response locals

  next();
};

export { mware_time };
