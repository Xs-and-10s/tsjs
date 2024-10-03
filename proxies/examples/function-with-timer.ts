const aFunctionWithTimer = withTimerProxy(aFunction);

function withTimerProxy((callback) => new Proxy(callback, {
  apply(target, thisArg, argArray) {
    console.time("Duration");

    // const result = callback.apply(thisArg, argArray);
    const result = Reflect.apply(callback, thisArg, argArray);

    console.timeEnd("Duration")

    return result;
  },
}));

function aFunction (param) {
  console.log(`The function has been called with ${param}`)
  return "Hello " + param;
}
