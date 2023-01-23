import { mouse, right } from "@nut-tree/nut-js";
import { WebSocket } from "ws";

import { CommandHandler } from "../model/command-handler";

export class MouseRightHandler extends CommandHandler {
  async handle(command: string, ws: WebSocket): Promise<void> {
    if (!command.includes("mouse_right")) {
      return this.next.handle(command, ws);
    }

    const [, value] = command.split(" ");

    await mouse.move(right(Number.parseInt(value)));
  }
}
