import { Button, down, left, mouse, right, up } from "@nut-tree/nut-js";

import { CommandHandler } from "../model/command-handler";

export class DrawSquareHandler extends CommandHandler {
  async handle(command: string): Promise<void> {
    const [commandStr, widthStr] = command.split(" ");

    if (commandStr !== "draw_square") {
      return this.next.handle(command);
    }

    const width = Number.parseInt(widthStr);

    mouse.config.mouseSpeed = 400;
    await mouse.pressButton(Button.LEFT);
    await mouse.move(down(width));
    await mouse.move(right(width));
    await mouse.move(up(width));
    await mouse.move(left(width));
    await mouse.releaseButton(Button.LEFT);
  }
}