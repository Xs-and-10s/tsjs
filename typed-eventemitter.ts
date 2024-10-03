export type Listener<T> = {
  (event: T): any;
};

export type Disposable = {
  dispose();
};

/** passes through events as they happen.
 * You will not get events from before you
 * start listening */
export class TypedEvent<T> {
  #listeners: Listener<T>[] = [];
  #hearers: Listener<T>[] = [];

  on = (listener: Listener<T>): Disposable => {
    this.#listeners.push(listener);
    return {
      dispose: () => this.off(listener),
    };
  };

  once = (hearer: Listener<T>): void => {
    this.#hearers.push(hearer);
  };

  off = (listener: Listener<T>) => {
    const callbackIndex = this.#listeners.indexOf(listener);
    if (callbackIndex > -1) this.#listeners.splice(callbackIndex, 1);
  };

  emit = (event: T) => {
    /** Update any general listeners */
    this.#listeners.forEach((listener) => listener(event));

    /** Clear the `once` queue */
    if (this.#hearers.length !== 0) {
      const toCall = this.#hearers;
      this.#hearers = [];
      toCall.forEach((listener) => listener(event));
    }
  };

  pipe = (te: TypedEvent<T>): Disposable => {
    return this.on((e) => te.emit(e));
  };
}
