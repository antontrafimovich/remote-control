import { down, mouse } from "@nut-tree/nut-js";
import { WebSocket } from "ws";

import { CommandHandler } from "../model/command-handler";

export class MouseDownHandler extends CommandHandler {
  async handle(command: string, ws: WebSocket): Promise<void> {
    if (!command.includes("mouse_down")) {
      return this.next.handle(command, ws);
    }

    const [, value] = command.split(" ");

    await mouse.move(down(Number.parseInt(value)));
  }
}
