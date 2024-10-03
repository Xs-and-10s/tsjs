// A throttle function that takes a function and an interval as parameters
function throttle(interval, cb) {
  // A flag variable to track whether the function is running or not
  let isRunning = false;
  // Return a function that takes arguments
  return function () {
    const args = arguments;
    // If the function is not running
    if (!isRunning) {
      // Set the flag to true
      isRunning = true;
      // Apply the function with arguments
      cb.apply(this, args);
      // Set a timer that will reset the flag after the interval
      setTimeout(() => {
        // Set the flag to false
        isRunning = false;
      }, interval);
    }
  };
}
