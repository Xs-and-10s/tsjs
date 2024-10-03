// ! "mimic" but don't change existing obj
// ? (normally Proxy changes obj)
const original = { x: "factor" };
const mimic = new Proxy(
  { ...original },
  {
    set(target, p, newValue, receiver) {
      target[p] = newValue;
      return true;
    },
  }
);
