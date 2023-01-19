export abstract class CommandHandler {
  protected next: CommandHandler;

  abstract handle(command: string): Promise<void>;

  setNext(next: CommandHandler) {
    this.next = next;
    return this;
  }
}
