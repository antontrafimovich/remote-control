import { mouse, Region, screen, ScreenClass } from "@nut-tree/nut-js";
import { WebSocket } from "ws";
import Jimp from "jimp";

import { CommandHandler } from "../model/command-handler";

export class PrintScreenHandler extends CommandHandler {
  async handle(command: string, ws: WebSocket): Promise<void> {
    if (command !== "prnt_scrn") {
      return this.next.handle(command, ws);
    }

    const squareSize = 200;

    const point = await mouse.getPosition();

    let image;

    try {
      image = await screen.grabRegion(
        new Region(
          point.x - squareSize / 2,
          point.y - squareSize / 2,
          squareSize,
          squareSize
        )
      );
    } catch (err) {
      console.error(
        "Error: Seems like one of the coordinates to capture is outside of your main display. Make sure, that you trying to capture an image from main display."
      );
      return;
    }

    let jimpImage;
    try {
      jimpImage = new Jimp(image.data,
        (data) => {
          console.log(data);
        }
      );
      // console.log(image.data.toString("base64"));
      // jimpImage = await Jimp.read(image.data.toString("base64"));
    } catch (err) {
      console.error(`Jimp read: ${err}`);
      return;
    }

    // let pngBuffer;
    // try {
    //   console.log(jimpImage);
    //   pngBuffer = await jimpImage.getBufferAsync("image/png");
    // } catch (err) {
    //   console.error(err);
    //   return;
    // }

    // console.log(pngBuffer.toString("base64"));

    // ws.send(`${command} ${pngBuffer.toString("base64")}`);
  }
}
