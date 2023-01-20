import { Button, down, left, mouse, right, up } from "@nut-tree/nut-js";

import { CommandHandler } from "../model/command-handler";

const timeout = (
  sec: number,
  action: () => Promise<unknown>
): Promise<void> => {
  return new Promise((resolve) => {
    return setTimeout(() => {
      return action().then(() => resolve());
    }, sec);
  });
};

export class DrawRectangleHandler extends CommandHandler {
  async handle(command: string): Promise<void> {
    if (!command.includes("draw_rectangle")) {
      return this.next.handle(command);
    }

    const [, widthStr, heightStr] = command.split(" ");

    const [width, height] = [widthStr, heightStr].map((value) =>
      Number.parseInt(value)
    );

    const timer = 200;

    mouse.config.mouseSpeed = 400;
    await mouse.pressButton(Button.LEFT);
    await mouse.move(down(height));
    await mouse.move(right(width));
    await mouse.move(up(height));
    await mouse.move(left(width));
    // await timeout(timer, async () => mouse.move(down(height)));
    // await timeout(timer, async () => mouse.move(right(width)));
    // await timeout(timer, async () => mouse.move(up(height)));
    // await timeout(timer, async () => mouse.move(left(width)));
    await mouse.releaseButton(Button.LEFT);
  }
}
