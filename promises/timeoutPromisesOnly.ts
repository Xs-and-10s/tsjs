const load = Promise.race([
  fetch("/api").then((res) => res.json()),
  new Promise((_, fail) => setTimeout(() => fail(new Error("Timeout")), 5000)),
]).then(
  (res) => {
    /* process as you wish */
  },
  (err) => {
    /* retry or display error */
  }
);
/**
 * this technique, unlike AbortSignal,
 * works not only for fetch, but for
 * any promise-based operation: just
 * replace fetch call above with
 * yourApiLayer.load(), DBQuery.execute(),
 * serviceMesh.callRPC() or whatever
 * async stuff you want to timeout,
 * and you're good to go.
 */
