import { Button, mouse } from "@nut-tree/nut-js";
import { Duplex } from "node:stream";

import { draw } from "../figures";
import { CommandHandler } from "../model/command-handler";

export class DrawCircleHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    const [commandStr, radiusStr] = command.split(" ");

    if (commandStr !== "draw_circle") {
      return this.next.handle(command, ws);
    }

    const radius = Number.parseInt(radiusStr);

    const circle = draw({ top: { x: 0, y: radius }, radius });

    const point = await mouse.getPosition();

    const updatedCoords = circle.map((coord) => {
      return {
        x: coord.x + point.x,
        y: coord.y + point.y,
      };
    });

    await mouse.setPosition(updatedCoords[0]);

    mouse.config.mouseSpeed = 400;
    await mouse.pressButton(Button.LEFT);
    await mouse.move(updatedCoords);
    await mouse.releaseButton(Button.LEFT);
  }
}
