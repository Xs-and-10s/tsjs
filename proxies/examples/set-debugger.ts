const setDebugger = new Proxy(
  { prop: 0 },
  {
    set(target, p, newValue, receiver) {
      console.log(`Setting ${p} from ${target[p]} to ${newValue}`);
      return Reflect.set(target, p, newValue, receiver);
    },
  }
);
setDebugger.prop = 1;
setDebugger.prop = 2;
