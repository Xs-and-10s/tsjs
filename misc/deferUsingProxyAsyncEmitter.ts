import EE from 'eventemitter2';

const property = {
  isAString(prop: string | symbol): prop is string {
    return typeof prop === "string";
  },
  isASymbol(prop: string | symbol): prop is symbol {
    return typeof prop === "symbol";
  },
};
function isAFunction(functionToCheck) {
  return (
    functionToCheck &&
    ({}.toString.call(functionToCheck) === "[object Function]" ||
      {}.toString.call(functionToCheck) === "[object AsyncFunction]")
  );
}

const raise = (err: string): never => {
  throw new Error(err);
};
// id ?? raise("id is required");

const redirect = <T>(method: string, args: T): never => {
  const obj = { doSomethingBetter: (args) => {} }
  obj[method](args)
  return {} as never;
};
type MethodName =
  | "doSomethingGreat"
  | "doSomethingBetter"
  | "doSomething"
  | "procrastinate"
  | "lolligag"
  | (string & {}); // this allows autocomplete!!
"method_missing" ?? redirect<readonly [number, number, number]>('doSomethingBetter', [1,2,3])

const redirectIfMethodNotFound = new Proxy(
  {},
  {
    get(obj, prop, receiver) {
      if (prop in obj) {
        obj[prop]
      } else {
        // obj["method_missing"];
        return Reflect.set(obj, "method_missing", () => {}, receiver);
        //
      }
    },
  }
);
const identityTarget = {};
const disposableTarget = {
  [Symbol.dispose]() {
    return identityTarget;
  }
};

const range = (min: number, max: number) => {
  return new Proxy(
    identityTarget,
    {
      has(_target, p) {
        if (property.isAString(p)) {
          return +p >= min && +p <= max;
        }
        return false;
      },
    }
  );
}
const X = 10.5;
const nums = [1, 5, X, 50, 100];
if (X in range(1, 100)) {
  raise("Found a non-integer!")
}
nums.filter((n) => n in range(1, 10)); // [1, 5]


const ageValidated = new Proxy(
  identityTarget,
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



/**
 * * (new) symbols as keys in WeakMaps *
 * ? WeakMap lets you extend an object with
 * ? extra properties (e.g., to keep track
 * ? of how often the object is used) without
 * ? worrying about creating a memory leak,
 * ! because the key-value pairs in a WeakMap
 * ! can be garbage collected !!
 * * initially, you could only use objects as keys
 * * in a WeakMap, but you want the keys to be unique
 * * "& symbols were defined as a new immutable way,
 * * that cannot be recreated, so having those as a
 * * unique key in the WeakMap makes a lot more sense" (Chris Heilmann)
 * ? This integrates symbols more with these new 
 * ? data structures & might well increase usage of them
 * TODO: figure out how to integrate with
 * TODO: proxies, event emitters, & derived-observables
 * ...
 * TODO: attempt (constant) ring buffer with KObj-WeakMaps
 * ? If KObj is retained elsewhere, WeakMap entry is
 * ? protected from the GC?  If so,
 */
const wmap = new WeakMap([
  [{idx:1}, 'steak_sauce'],
  [{idx:52}, 'love_shack'],
  [{idx:5}, "computers contracts communicants citadels clusters"],
  // [[Symbol.dispose]: () => {}]
]);
const ringbuf = [{a:1}, {b:52}, {c:5}]
const loop = (arr, ms = 16) => {
  let i = 0;
  do {
    setTimeout(() => {
      const wkey = wmap.get(arr[i])
      if (wkey[idx])
    }, ms);
  } while(true)
}

/**
 * * ? *
 * ? WeakSet! Huh! Goodgall, y'all! 
 * ! What's it even good for?
 */
const wset = WeakSet()


// * Change Array by Copy *



type DisposeWithDescription<T> = {
  (handle): T;
  description: string;
}

function noop <T>(handle): void {
  return;
}
noop.description = "Don't do anything";

// @ts-ignore
Symbol.dispose ??= Symbol("Symbol.dispose")
// @ts-ignore
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose")

const trivialProxyHandler = {
  get(target, p, receiver) {
    return Reflect.get(target, p, receiver)
  },
  set(target, p, newValue, receiver) {
    return Reflect.set(target, p, newValue, receiver);
  },
}

const proxy = new Proxy({}, trivialProxyHandler
)

class EvtEmitter extends EE {
  constructor() {
    super()
  }
  [Symbol.dispose]() {
    this.removeAllListeners()
  }
}

class Resource {
  #x_factor
  constructor(value) {
    this.#x_factor = value;
  }
  [Symbol.dispose]() {
    this.#x_factor = undefined;
  }
}

const defer = (dispose) => (handle) => {
  const disposableHandle = {
    handle,
    // @ts-ignore
    [Symbol.dispose]() {
      handle[Symbol.dispose]()
      dispose(handle);
    },
  };
  return disposableHandle;
}
using resource = defer((resource) => resource.close())(new Resource({ x:1 }))

using ee = defer(noop)(new EvtEmitter())


