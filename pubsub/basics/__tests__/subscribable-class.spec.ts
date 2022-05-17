import { DataClass } from "../src/DataClass";
import { Subscribable } from "../src/SubscribableClass";

describe("Subscribable", () => {
  it("should log", () => {
    const logSpyOnLog = jest.spyOn(console, "log");
    const logSpyOnError = jest.spyOn(console, "error");
    const logSpyOnWarn = jest.spyOn(console, "warn");
    const sub = new Subscribable();
    sub.subscribe(console.log);
    sub.subscribe(console.error);
    sub.subscribe(console.warn);
    sub.publish("test 42");
    sub.cleanAll();
    expect(logSpyOnLog).toHaveBeenCalledWith("test 42");
    expect(logSpyOnError).toHaveBeenCalledWith("test 42");
    expect(logSpyOnWarn).toHaveBeenCalledWith("test 42");
  });
  it("should unsubscribe", () => {
    const sub = new Subscribable();
    const unsubLog = sub.subscribe(console.log);
    const unsubError = sub.subscribe(console.error);
    const unsubWarn = sub.subscribe(console.warn);
    expect(sub.size()).toEqual(3);
    unsubLog();
    expect(sub.size()).toEqual(2);
    unsubWarn();
    expect(sub.size()).toEqual(1);
    unsubError();
    expect(sub.size()).toEqual(0);
  });
  it("should unsubscribe all", () => {
    const sub = new Subscribable();
    for (let i = 0; i < 17; i++) sub.subscribe((v: unknown) => console.log(v));
    expect(sub.size()).toEqual(17);
    sub.cleanAll();
    expect(sub.size()).toEqual(0);
  });
});
