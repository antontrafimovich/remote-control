import { mouse, Region, screen } from "@nut-tree/nut-js";
import Jimp from "jimp";
import { Duplex } from "node:stream";

import { CommandHandler } from "../model/command-handler";

export class PrintScreenHandler extends CommandHandler {
  async handle(command: string, ws: Duplex): Promise<void> {
    if (command !== "prnt_scrn") {
      return this.next.handle(command, ws);
    }

    const squareSize = 200;

    const point = await mouse.getPosition();

    let regionBuffer;

    try {
      regionBuffer = await this.grabRegion({
        left: point.x - squareSize / 2,
        top: point.y - squareSize / 2,
        width: squareSize,
        height: squareSize,
      });
    } catch (err) {
      console.error(err);
      return;
    }

    let pngBase64;
    try {
      const base = await Jimp.create(squareSize, squareSize);
      base.bitmap.data = regionBuffer;
      const buffer = await base.getBufferAsync(Jimp.MIME_PNG);
      pngBase64 = buffer.toString("base64");
    } catch (err) {
      console.error(`PNG toBase64 convertion error: ${err}`);
      return;
    }

    const result = `${command} ${pngBase64}`;

    console.log(result);

    ws.write(result);
  }

  private async grabRegion({
    left,
    top,
    width,
    height,
  }: {
    left: number;
    top: number;
    width: number;
    height: number;
  }): Promise<Buffer> {
    try {
      const image = await screen.grabRegion(
        new Region(left, top, width, height)
      );

      return (await image.toRGB()).data;
    } catch (err) {
      throw new Error(
        "Error: Seems like one of the coordinates to capture is outside of your main display. Make sure, that you trying to capture an image from main display."
      );
    }
  }
}
