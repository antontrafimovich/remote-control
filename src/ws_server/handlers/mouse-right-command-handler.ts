import { mouse, right } from "@nut-tree/nut-js";

import { CommandHandler } from "../model/command-handler";

export class MouseRightHandler extends CommandHandler {
  async handle(command: string): Promise<void> {
    if (!command.includes("mouse_right")) {
      return this.next.handle(command);
    }

    const [, value] = command.split(" ");

    await mouse.move(right(Number.parseInt(value)));
  }
}
