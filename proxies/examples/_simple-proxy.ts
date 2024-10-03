const proxy = new Proxy(
  { myKey: "value" },
  {
    get(target, prop, receiver) {
      return target[prop];
    },
    set(target, prop, value, receiver) {
      target[prop] = value;
      return true;
    },
  }
);
proxy.myKey = "updated";

const proxyWithReflect = new Proxy(
  { myKey: "value" },
  {
    get(target, p, receiver) {
      return Reflect.get(target, p, receiver);
    },
    set(target, p, newValue, receiver) {
      return Reflect.set(target, p, newValue, receiver);
    },
  }
);
