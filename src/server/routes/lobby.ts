import { Router, Request, Response } from "express";

type Game = {
  name: string;
};

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const games: Game[] = [
    { name: "Game 1" },
    { name: "Game 2" },
    { name: "Game 3" },
    { name: "Game 4" }
  ];

  res.render("index", {
    title: "Lobby",
    styles: ["lobby.css"],
    scripts: ["chat.js"],
    games: games
  });
});

export default router;