import { mouse, up } from "@nut-tree/nut-js";
import { WebSocketServer } from "ws";

class MouseUpHandler {
  _next;

  setNext(handler) {
    this._next = handler;
    return this;
  }

  handle(message) {
    if (!message.includes("mouse_up")) {
      this._next(message);
    }

    const [, value] = message.split(" ");

    mouse.move(up(Number.parseInt(value)));
  }
}

const handleMessage = (message) => {};

export const wsServer = {
  listen(port) {
    const ws = new WebSocketServer({ port });

    const messageHandler = [new MouseUpHandler()].reduce((result, handler) => {
      return handler.setNext(result);
    }, undefined);

    ws.on("connection", (ws) => {
      ws.on("message", (message) => {
        const command = message.toString();

        try {
          messageHandler.handle(command);
        } catch (err) {
          console.error(`${command} is not implemented`);
        }
      });
    });
  },
};
