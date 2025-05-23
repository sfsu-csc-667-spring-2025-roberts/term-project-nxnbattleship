import express from "express";
import { Request, Response } from "express";

import * as DB from "../db";
import User from "../../types/user"

const router = express.Router();

router.get("/register", async (_req: Request, res: Response) => {
  res.render("auth/register", {
    title: "Register Page",
    styles: ["default.css"]
  });
});

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await DB.User.register(username, email, password);

    req.session.user = user;
    res.redirect("/lobby");

  } catch (error) {
    console.error("Error registering user:", error);
    res.render("auth/register", { 
      title: "Register Page",
      error: "Invalid credentials.",
      email
    });
  }
});

router.get("/login", async (_req: Request, res: Response) => {
  res.render("auth/login", {
    title: "Login Page"
  });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const temp: User = await DB.User.login(email, password);
    console.log(temp);

    req.session.user = temp; 
    console.log(req.session.user);

    res.redirect("/lobby");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.render("auth/login", {
      title: "Login Page",
      error: "Invalid credentials.",
      email,
    });
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  // @ts-ignore
  req.session.user = null;
  // @ts-ignore
  req.session.destroy(() => {
    // TODO: Define this no-op... eventually
  });
});

export default router;
