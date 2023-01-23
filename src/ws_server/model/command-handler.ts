import { WebSocket } from "ws";

export abstract class CommandHandler {
  protected next: CommandHandler;

  abstract handle(command: string, ws: WebSocket): Promise<void>;

  setNext(next: CommandHandler) {
    this.next = next;
    return this;
  }
}
