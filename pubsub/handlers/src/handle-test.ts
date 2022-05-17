import fs from "fs";
import { createHandlerStack } from "./handle";

type Payload = {
  name: string;
  contents: string;
};

const handlers = createHandlerStack<Payload>();

handlers.subscribe((contents) => contents);
handlers.subscribe(({ name, contents }) => {
  if (name.toLowerCase().endsWith(".json")) return JSON.parse(contents);
});

for (const name of fs.readdirSync("./files")) {
  const contents = fs.readFileSync(`./files/${name}`, "utf8");
  const output = handlers.publish({ name, contents });
  console.log(`${name} : ${JSON.stringify(output)}`);
}
