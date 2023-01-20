import { down, mouse } from "@nut-tree/nut-js";

import { CommandHandler } from "../model/command-handler";

export class MouseDownHandler extends CommandHandler {
  async handle(command: string): Promise<void> {
    if (!command.includes("mouse_down")) {
      return this.next.handle(command);
    }

    const [, value] = command.split(" ");

    await mouse.move(down(Number.parseInt(value)));
  }
}
