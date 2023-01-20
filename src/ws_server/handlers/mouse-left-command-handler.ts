import { left, mouse } from "@nut-tree/nut-js";

import { CommandHandler } from "../model/command-handler";

export class MouseLeftHandler extends CommandHandler {
  async handle(command: string): Promise<void> {
    if (!command.includes("mouse_left")) {
      return this.next.handle(command);
    }

    const [, value] = command.split(" ");

    await mouse.move(left(Number.parseInt(value)));
  }
}
