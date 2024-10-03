/* import { debounce } from "./debounce"; */
// Somewhat more complicated. function is fired right away, then for maximum
// every 250 ms. You might potentially have to wait 250 ms after last seen event
/* export function composeDebounceThrottle(delay, limit, fn) {
  delay = delay || 100;
  limit = limit || 250;
  let last = 0;
  let deferTimer;

  const db = debounce(delay, fn);
  return function () {
    const args = arguments;
    const now = +new Date();
    if (last && now < last + limit) {
      clearTimeout(deferTimer);
      db.apply(this, args);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, limit);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
} */

function debounce(delay, cb) {
  delay = delay || 16;
  // A timer variable to track the delay period
  let timer;
  // Return a function that takes arguments
  return function () {
    const context = this;
    const args = arguments;
    // Unschedule timed function, if any
    clearTimeout(timer);
    // Set a new timer that will execute the function after the delay period
    timer = setTimeout(() => {
      // Apply the function with arguments
      cb.apply(context, args);
    }, delay);
  };
}
export function savvyFire(delay, limit, fn) {
  delay = delay || 100;
  limit = limit || 250;
  let last = 0;
  let deferTimer;

  const db = debounce(delay, fn);
  return function throttleDebouncedFn() {
    const args = arguments;
    const now = +new Date();
    if (last && now < last + limit) {
      clearTimeout(deferTimer);
      db.apply(this, args);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, limit);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}
