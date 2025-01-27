import { Button, mouse } from "@nut-tree/nut-js";
import { Duplex } from "node:stream";

import { draw } from "../figures";
import { CommandHandler } from "../model/command-handler";

export class DrawCircleHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    const [commandName, radiusStr] = command.split(" ");

    if (commandName !== "draw_circle") {
      return this.next.handle(command, ws);
    }

    const radius = Number.parseInt(radiusStr);

    const circle = draw({ top: { x: 0, y: radius }, radius });

    const position = await mouse.getPosition();

    const updatedCoords = circle.map((coord) => {
      return {
        x: coord.x + position.x,
        y: coord.y + position.y,
      };
    });

    await mouse.setPosition(updatedCoords[0]);

    mouse.config.mouseSpeed = 400;
    await mouse.pressButton(Button.LEFT);
    await mouse.move(updatedCoords);
    await mouse.releaseButton(Button.LEFT);

    console.log(`Circle with radius ${radius} has been drawn.`);
  }
}
