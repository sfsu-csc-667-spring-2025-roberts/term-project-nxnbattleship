/**
 * src/routes/test.ts
 *
 * Test Router
 */

import express, { Request, Response } from "express";
import type {Server} from "socket.io";

import db from "../db/connection"

const router = express.Router();

router.get("/", (req: Request, res: Response) => {

  //Do anything here relevant prior to rendering:
  //i.e. figure out if dark mode is needed or not, pass in as "styles"

  //RENDER
  res.render("index", {
    scripts: ['thing_A.js'],
    styles: ['default.css'],

    title: "Test Route Title!",
    desc: `This is the testing landing page (At ${res.locals.time_current})`
  });
  ////////
});

router.get("/insert", async (_request: Request, response: Response) => {

  try {
    await db.none("INSERT INTO test_table (test_string) VALUES ($1)", [
      `Test string ${new Date().toISOString()}`,
    ]);
    response.json(await db.any("SELECT * FROM test_table"));
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/insert_Promise", (request: Request, response: Response) => {
  db.none("INSERT INTO test_table (test_string) VALUES ($1)", [
    `Test string ${new Date().toISOString()}`,
  ])
    .then(() => {
      return db.any("SELECT * FROM test_table");
    })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/socket", (req: Request, res: Response) => {
  const io: Server = req.app.get("io");

  // @ts-ignore
  io.emit("test", { user: req.session.user });

  // @ts-ignore
  io.to(req.session.user.id).emit("test", { secret: "hello" });

  res.json({ message: "Socket event emitted" });
});

export default router;
