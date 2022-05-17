import { DataClass } from "../src/DataClass";
describe("DataClass", () => {
  it("should log", () => {
    const logSpyOnLog = jest.spyOn(console, "log");
    const sub = new DataClass(0);
    sub.subscribe((v: number) => console.log("subA", v));
    sub.subscribe((v: number) => console.log("subB", v));
    sub.subscribe((v: number) => console.log("subC", v));
    sub.publish(42);
    sub.cleanAll();
    expect(logSpyOnLog).toHaveBeenCalledWith("subA", 42);
    expect(logSpyOnLog).toHaveBeenCalledWith("subB", 42);
    expect(logSpyOnLog).toHaveBeenCalledWith("subC", 42);
  });
  it("should unsubscribe", () => {
    const sub = new DataClass(42);
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
    const sub = new DataClass(0);
    for (let i = 0; i < 17; i++) sub.subscribe((v: number) => console.log(v));
    expect(sub.size()).toEqual(17);
    sub.cleanAll();
    expect(sub.size()).toEqual(0);
  });
});
