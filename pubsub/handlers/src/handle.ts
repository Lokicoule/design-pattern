export const createHandlerStack = <MessageType>() => {
  const subscribers: Set<(msg: MessageType) => undefined | unknown> = new Set();
  return {
    subscribe(cb: (msg: MessageType) => undefined | unknown): () => void {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },
    publish(msg: MessageType): undefined | unknown {
      let data: unknown;
      for (let subscriber of Array.from(subscribers)) {
        data = subscriber(msg);
        if (data != undefined) break;
      }
      return data;
    },
    size() {
      return subscribers.size;
    },
    cleanAll() {
      subscribers.forEach((cb) => subscribers.delete(cb));
    },
  };
};
