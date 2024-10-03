"use strict";

export const trampoline =
  (fn) =>
  (...args) => {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };

// AFTER
const sumBelowTramp = (num: number, sum: number = 0) =>
  num === 0 ? sum : () => sumBelowTramp(num - 1, sum + num);

// BEFORE
const sumBelowRecur = (num: number, sum: number = 0) =>
  num === 0 ? sum : sumBelowRecur(num - 1, sum + num);
