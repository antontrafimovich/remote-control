import { mouse } from "@nut-tree/nut-js";
import { Duplex } from "node:stream";

import { CommandHandler } from "../model/command-handler";

export class MousePositionHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    if (command !== "mouse_position") {
      return this.next.handle(command, ws);
    }

    const position = await mouse.getPosition();

    ws.write(`mouse_position ${position.x},${position.y}`);
  }
}
