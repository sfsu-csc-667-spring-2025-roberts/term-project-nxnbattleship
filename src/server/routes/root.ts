import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send(`Hello World from route in another file! (At ${res.locals.time_current})`);
});

export default router;
