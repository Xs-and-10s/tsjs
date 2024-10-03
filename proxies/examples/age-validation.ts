const ageValidated = new Proxy(
  {},
  {
    set(target, p, newValue, receiver) {
      if (p === "age" && newValue > 100) {
        newValue = 100;
      }
      target[p] = newValue;
      return true;
    },
  }
);
