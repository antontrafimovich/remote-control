import { mouse, up } from "@nut-tree/nut-js";

import { CommandHandler } from "../model/command-handler";

export class MouseUpHandler extends CommandHandler {
  async handle(command: string): Promise<void> {
    if (!command.includes("mouse_up")) {
      return this.next.handle(command);
    }

    const [, value] = command.split(" ");

    await mouse.move(up(Number.parseInt(value)));
  }
}