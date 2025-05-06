import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {

  //Do anything here relevant prior to rendering:
  //i.e. figure out if dark mode is needed or not, pass in as "styles"

  //RENDER
  res.render("index", {
    scripts: ['thing_A.js'],
    styles: ['default.css'],

    title: "Root Route Title!",
    desc: `Hello World from route in another file! (At ${res.locals.time_current})`
  });
  ////////
});

export default router;
