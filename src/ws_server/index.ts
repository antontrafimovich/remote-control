import { WebSocketServer } from "ws";

import {
  DrawCircleHandler,
  DrawRectangleHandler,
  DrawSquareHandler,
  MouseDownHandler,
  MouseLeftHandler,
  MouseRightHandler,
  MouseUpHandler,
  PrintScreenHandler,
} from "./handlers";

export const wsServer = {
  listen(port: number) {
    const ws = new WebSocketServer({ port });

    const commandHandler = [
      new PrintScreenHandler(),
      new DrawCircleHandler(),
      new DrawSquareHandler(),
      new DrawRectangleHandler(),
      new MouseRightHandler(),
      new MouseLeftHandler(),
      new MouseDownHandler(),
      new MouseUpHandler(),
    ].reduce((result, handler) => {
      return handler.setNext(result);
    }, undefined);

    ws.on("connection", (ws) => {
      ws.on("message", async (message: string) => {
        const command = message.toString();

        try {
          await commandHandler.handle(command, ws);
        } catch (err) {
          console.error(err);
          console.error(`${command} is not implemented`);
        }
      });
    });
  },
};
