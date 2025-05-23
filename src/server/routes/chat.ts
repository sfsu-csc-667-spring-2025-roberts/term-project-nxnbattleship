import express from "express";
import { Request, Response } from "express";
// TODO:
// The only way that I got sessions to play nicely was by breaking this,
// The type wasn't being loaded as a module properly so it is what it is
import { ChatMessage } from "../../../types/global";

const router = express.Router();

router.post("/:room_id", (req: Request, res: Response) => {
  const { message } = req.body;
  const id = req.params.room_id;
  const io = req.app.get("io");

  const broadcastMessage: ChatMessage = {
    message,
    // TODO: Extend Session Data types
    // @ts-ignore
    sender: req.session.user.email,
    // @ts-ignore
    gravatar: req.session.user.gravatar,
    timestamp: Date.now(),
  };

  console.log({ broadcastMessage });

  io.emit(`chat-message:${id}`, broadcastMessage);

  res.status(200).send();
});

export default router;
