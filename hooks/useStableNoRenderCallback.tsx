import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * ? https://blog.thoughtspile.tech/2021/04/07/better-usecallback/ ?
 * ! CANNOT BE CALLED IN RENDER!
 * * BUT *
 * * - Simplifies the code by *
 *   * removing explicit dependency listing.
 * * - Eliminated useless updates of child components. *
 * * - Obtained a totally stable wrapper for callback *
 *   * props that can be used
 *   * - in setTimeout or
 *   * - as a native event listener.
 * * Works with Concurrent React
 * @param callback
 * @returns
 */
export const useStableNoRenderCallback = (callback) => {
  const onChangeInner = useRef(callback);
  // Added useLayoutEffect here
  useLayoutEffect(() => {
    onChangeInner.current = callback;
  });
  const stable = useCallback((...args) => onChangeInner.current(...args), []);
  return stable;
};
