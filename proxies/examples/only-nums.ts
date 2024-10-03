const onlyNumAges = new Proxy(
  { age: 0 },
  {
    set(target, p, newValue, receiver) {
      if (p === "age") {
        target[p] = +newValue;
        return true;
      } else {
        return false;
      }
    },
  }
);
