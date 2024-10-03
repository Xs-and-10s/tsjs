const www = new Proxy(new URL("https://"), {
  get: function get(target, p, receiver) {
    let o = Reflect.get(target, p);
    if (typeof o === "function") {
      return o.bind(target);
    }
    if (typeof p === "string") {
      return o;
    }
    if (typeof p === "string" && p === "then") {
      return Promise.prototype.then.bind(fetch(target));
    }
    target = new URL(target);
    target.hostname += `.${prop}`;
    return new Proxy(target, { get });
  },
});
