import express from "express";
import { Request, Response } from "express";
import { ChatMessage } from "global";

const router = express.Router();

router.post("/:id", (req: Request, res: Response) => {
  const { message } = req.body;
  const id = req.params.id;
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
