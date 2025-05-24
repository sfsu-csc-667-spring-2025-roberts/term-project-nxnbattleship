import { Server } from "socket.io";
import type { Application, RequestHandler } from "express";

const configureSockets = (
  io: Server,
  app: Application,
  sessionMiddleware: RequestHandler,
) => {
  app.set("io", io);

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {
    // @ts-ignore
    const session = socket.request.session;
    const user = session?.user;
    const id = session?.id;
  
    if (!user || !id) {
      console.warn("⚠️  Socket connected without valid session or user.");
      return;
    }
  
    console.log(`User [${user.id}] connected with session id ${id}`);
    socket.join(`${user.id}`);
  
    socket.on("disconnect", () => {
      console.log(`User [${user.id}] disconnected`);
      socket.leave(`${user.id}`);
    });
  });  
};

export default configureSockets;
