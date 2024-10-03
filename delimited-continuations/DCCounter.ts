import { evaluate, reset, shift } from "continuation";

type Count = {
  value: number;
  increment(): Count;
};

function useCounter() {
  return reset<Count>(function* () {
    for (let i = 0; ; i++) {
      yield* shift<void>(function* (k) {
        return { value: i, increment: k };
      });
    }
  });
}

let start = evaluate<Count>(useCounter);

let once = start.increment();
let twice = once.increment();
let thrice = twice.increment();

console.dir([once.value, twice.value, thrice.value]);
// => [1, 2, 3]
