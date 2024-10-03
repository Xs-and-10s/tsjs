export function debounce(delay, cb) {
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
    timer = setTimeout(function () {
      // Apply the function with arguments
      cb.apply(context, args);
    }, delay);
  };
}
