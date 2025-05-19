import { Router, Request, Response } from "express";

const router = Router();
let games: { id: string; name: string }[] = [];

router.get("/", (_req: Request, res: Response) => {
  res.render("index", {
    title: "LOBBY ROOM",
    styles: ["lobby.css"],
    scripts: ["chat.js"],
    games: games
  });
});

router.post("/create", (req: Request, res: Response) => {
  const name = req.body.name || `Game ${Math.random().toString(36).substring(2, 8)}`;
  const id = Math.random().toString(36).substring(2, 8);
  games.push({ id, name });
  res.redirect("/lobby");
});

export default router;