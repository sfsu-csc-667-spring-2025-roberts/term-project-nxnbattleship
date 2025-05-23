import express from "express";
import { Request, Response } from "express";

import { User } from "../db";

const router = express.Router();

router.get("/register", async (_req: Request, res: Response) => {
  res.render("auth/register");
});

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.register(username, email, password);
  
    // TODO: We need to find a way to extend the Session Object with DataSession
    // @ts-ignore
    req.session.user = user;
    res.redirect("/lobby");

  } catch (error) {
    console.error("Error registering user:", error);
    res.render("auth/register", { error: "Invalid credentials.", email });
  }
});

router.get("/login", async (_req: Request, res: Response) => {
  res.render("auth/login");
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //@ts-ignore
    req.session.user = user;
    res.redirect("/lobby");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.render("auth/login", { error: "Invalid credentials.", email });
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
