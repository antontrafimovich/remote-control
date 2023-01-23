import { down, mouse } from "@nut-tree/nut-js";
import { Duplex } from "node:stream";

import { CommandHandler } from "../model/command-handler";

export class MouseDownHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    if (!command.includes("mouse_down")) {
      return this.next.handle(command, ws);
    }

    const [, value] = command.split(" ");

    await mouse.move(down(Number.parseInt(value)));
  }
}
