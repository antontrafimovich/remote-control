import { mouse, right } from "@nut-tree/nut-js";
import { Duplex } from "node:stream";

import { CommandHandler } from "../model/command-handler";

export class MouseRightHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    const [commandName, valueStr] = command.split(" ");

    if (commandName !== "mouse_right") {
      return this.next.handle(command, ws);
    }

    const value = Number.parseInt(valueStr);

    await mouse.move(right(value));

    console.log(`Mouse has been moved right by ${value} px`);
  }
}
