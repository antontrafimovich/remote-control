import { down, mouse } from "@nut-tree/nut-js";
import { Duplex } from "node:stream";

import { CommandHandler } from "../model/command-handler";

export class MouseDownHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    const [commandName, valueStr] = command.split(" ");

    if (commandName !== "mouse_down") {
      return this.next.handle(command, ws);
    }

    const value = Number.parseInt(valueStr);

    await mouse.move(down(value));

    console.log(`Mouse has been moved down by ${value} px`);
  }
}
