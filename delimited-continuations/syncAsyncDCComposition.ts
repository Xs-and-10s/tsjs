import { evaluate, shift } from "continuation";

function* add(lhs, rhs) {
  let left = yield* shift(lhs);
  let right = yield* shift(rhs);
  return left + right;
}

const sync = function* (k) {
  k(value); // ! WTF does `value` come from?
};

evaluate(function* () {
  let first = yield* add(sync(13), function* (k) {
    Promise.resolve(55).then(k);
  });

  let second = yield* add(
    function* (k) {
      setTimeout(() => k(21), 1000);
    },
    function* (k) {
      k(Math.random());
    }
  );

  let result = yield* add(sync(first), sync(second));

  return result;
});
