import { useMemo } from "react";
import { Observable, observable } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";

export function useObservableState<T>(
  initialValue?: T | (() => T) | (() => Promise<T>)
): [T, Observable<T>] {
  const obs$ = useMemo(
    () =>
      observable<T>(
        isFunction(initialValue as () => T)
          ? (initialValue as () => T)()
          : (initialValue as T)
      ),
    []
  );
  return new Proxy([obs$, undefined], proxyHandler) as [T, Observable<T>];
}

const proxyHandler: ProxyHandler<any[]> = {
  get(target, prop, receiver) {
    if (prop === "1") {
      return useSelector(target[0]);
    }

    return Reflect.get(target, prop, receiver);
  },
};

function isFunction(functionToCheck) {
  return (
    functionToCheck &&
    ({}.toString.call(functionToCheck) === "[object Function]" ||
      {}.toString.call(functionToCheck) === "[object AsyncFunction]")
  );
}
