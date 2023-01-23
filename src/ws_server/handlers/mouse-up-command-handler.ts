import { mouse, up } from "@nut-tree/nut-js";
import { Duplex } from "node:stream";

import { CommandHandler } from "../model/command-handler";

export class MouseUpHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    const [commandName, value] = command.split(" ");

    if (commandName !== "mouse_up") {
      return this.next.handle(command, ws);
    }

    await mouse.move(up(Number.parseInt(value)));
  }
}
