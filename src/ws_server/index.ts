import { createWebSocketStream, WebSocketServer } from "ws";

import {
  DrawCircleHandler,
  DrawRectangleHandler,
  DrawSquareHandler,
  MouseDownHandler,
  MouseLeftHandler,
  MousePositionHandler,
  MouseRightHandler,
  MouseUpHandler,
  PrintScreenHandler,
} from "./handlers";

const createWebSocketServer = () => {
  let wss: WebSocketServer;

  return {
    listen(port: number) {
      wss = new WebSocketServer({ port });

      const commandHandler = [
        new MousePositionHandler(),
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

      wss.on("listening", () => {
        console.log(
          `Start websocket server on the wss://localhost:${wss.options.port}`
        );
      });

      wss
        .on("connection", (wss) => {
          const wsStream = createWebSocketStream(wss, {
            encoding: "utf-8",
            defaultEncoding: "utf-8",
            decodeStrings: false,
          });

          wsStream.on("data", async (message: string) => {
            const command = message.toString();

            try {
              await commandHandler.handle(command, wsStream);
            } catch (err) {
              console.error(err);
            }
          });
        })
        .on("close", () => console.log("Websocket server has been closed."));
    },
    close: () => {
      wss.close();
    },
  };
};

export const wsServer = createWebSocketServer();
