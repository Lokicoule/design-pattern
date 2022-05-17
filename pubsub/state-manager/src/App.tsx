import React from "react";
import { createStateHook } from "./stateManager";

const useCounter = createStateHook(0);

const Counter = () => {
  const [count, setCount] = useCounter();

  const onClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={onClick}>Increment</button>
      <div>Count : {count}</div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Counter></Counter>
      <Counter></Counter>
      <Counter></Counter>
      <Counter></Counter>
      <Counter></Counter>
    </div>
  );
}

export default App;
