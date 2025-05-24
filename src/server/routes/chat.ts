import express from "express";
import { Request, Response } from "express";
import { ChatMessage } from "global";

const router = express.Router();

router.post("/:room_id", (req: Request, res: Response) => {
  const { message } = req.body;
  const { room_id } = req.params;
  // @ts-ignore
  const { id, email, gravatar } = request.session.user;
  const io = req.app.get("io");

  /* Error Checking */
  if (!io) {
    res.status(500).send("Socket.io not initialized");
    return;
  }

  if (!message) {
    res.status(400).send("Message is required");
    return;
  }

  io.emit(`chat:message:${room_id}`, {
    message,
    sender: {
      id,
      email,
      gravatar,
    },
    timestamp: new Date(),
  });

  res.status(200).send();
});

export default router;
