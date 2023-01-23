import { left, mouse } from "@nut-tree/nut-js";
import { Duplex } from "node:stream";

import { CommandHandler } from "../model/command-handler";

export class MouseLeftHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    if (!command.includes("mouse_left")) {
      return this.next.handle(command, ws);
    }

    const [, value] = command.split(" ");

    await mouse.move(left(Number.parseInt(value)));
  }
}
