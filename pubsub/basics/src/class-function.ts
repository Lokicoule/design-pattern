import { createSubscribable } from "./SubscribableFunction";

const sub = createSubscribable();

sub.subscribe(console.log);
const unsubscribeError = sub.subscribe(console.error);
const unsubscribeWarn = sub.subscribe(console.warn);

sub.publish("test1");
unsubscribeError();
sub.publish("test2");
unsubscribeWarn();
sub.publish("test3");
