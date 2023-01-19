import { WebSocketServer } from "ws";

import { MouseUpHandler } from "./handlers";

export const wsServer = {
  listen(port: number) {
    const ws = new WebSocketServer({ port });

    const commandHandler = [new MouseUpHandler()].reduce((result, handler) => {
      return handler.setNext(result);
    }, undefined);

    const handleMessage = async (message: string) => {
      const command = message.toString();

      try {
        await commandHandler.handle(command);
      } catch (err) {
        console.error(`${command} is not implemented`);
      }
    };

    ws.on("connection", (ws) => {
      ws.on("message", handleMessage);
    });
  },
};
