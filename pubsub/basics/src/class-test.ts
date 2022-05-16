import { Subscribable } from "./SubscribableClass";

const sub = new Subscribable<string>();

sub.subscribe(console.log);
const unsubscribeError = sub.subscribe(console.error);
const unsubscribeWarn = sub.subscribe(console.warn);

sub.publish("test1");
unsubscribeError();
sub.publish("test2");
unsubscribeWarn();
sub.publish("test3");

class DataClass extends Subscribable<number> {
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

const dc = new DataClass(0);
const dcUnsub = dc.subscribe((v: number) => console.log("subOne", v));
const dcUnsub2 = dc.subscribe((v: number) => console.log("subTwo", v));
dc.setValue(42);
dcUnsub();
dc.setValue(1);
dcUnsub2();
dc.setValue(2);
