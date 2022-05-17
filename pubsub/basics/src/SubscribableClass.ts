interface ISubscribable<MessageType> {
  subscribe(cb: (msg: MessageType) => void): () => void;
  publish(msg: MessageType): void;
}

export class Subscribable<MessageType> implements ISubscribable<MessageType> {
  private subscribers: Set<(msg: MessageType) => void> = new Set();

  constructor() {}

  subscribe(cb: (msg: MessageType) => void): () => void {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  publish(msg: MessageType): void {
    this.subscribers.forEach((cb) => cb(msg));
  }

  cleanAll(): void {
    this.subscribers.forEach((cb) => this.subscribers.delete(cb));
  }

  size(): number {
    return this.subscribers.size;
  }
}
