import { Duplex } from "node:stream";

export abstract class CommandHandler {
  protected next: CommandHandler;

  abstract handle(command: string, ws: Duplex): Promise<void>;

  setNext(next: CommandHandler) {
    this.next = next;
    return this;
  }
}
