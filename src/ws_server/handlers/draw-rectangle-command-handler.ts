import { Button, down, left, mouse, right, up } from "@nut-tree/nut-js";
import { Duplex } from "node:stream";

import { CommandHandler } from "../model/command-handler";

export class DrawRectangleHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    if (!command.includes("draw_rectangle")) {
      return this.next.handle(command, ws);
    }

    const [, widthStr, heightStr] = command.split(" ");

    const [width, height] = [widthStr, heightStr].map((value) =>
      Number.parseInt(value)
    );

    mouse.config.mouseSpeed = 400;
    await mouse.pressButton(Button.LEFT);
    await mouse.move(down(height));
    await mouse.move(right(width));
    await mouse.move(up(height));
    await mouse.move(left(width));
    await mouse.releaseButton(Button.LEFT);
  }
}
