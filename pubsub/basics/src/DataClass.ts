import { Subscribable } from "./SubscribableClass";

export class DataClass extends Subscribable<number> {
  constructor(protected value: number) {
    super();
  }

  setValue(value: number) {
    this.value = value;
    this.publish(value);
  }

  getValue() {
    return this.value;
  }
}
