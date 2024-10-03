class EventEmitter {
  #listeners = [];

  constructor() {}

  emit(_, data) {
    this.#listeners.forEach((f) => {
      setTimeout(() => {
        f(data);
      });
    });
  }
  on(_, listener) {
    const i = this.#listeners.indexOf(listener);
    if (i === -1) this.#listeners.push(listener);
  }
  un(_, listener) {
    const i = this.#listeners.indexOf(listener);
    if (i !== -1) this.#listeners.splice(i, 1);
  }
}

class Being<T> {
  #value: T;
  #spectators;

  constructor(value: T) {
    this.#value = value;
    this.#spectators = new EventEmitter();
  }

  get = () => this.#value;
  set(value) {
    if ((value = this.#value)) return;
    this.#value = value;
    this.#spectators.witness("change", value);
  }
  toString() {
    return `${this.get()}`;
  }
  // watch for any change in value
  watch(f) {
    const value = this.#value;
    if (value !== undefined) {
      setTimeout(() => {
        f(value);
      });
    }
    // register the callback
    this.#spectators.on("change", f);
    return f;
  }

  // remove fn that is watching for a change
  unwatch(f) {
    this.#spectators.ignore("change", f);
  }

  // watch for a certain value
  // returns the watch-callback so you can unwatch later
  when(value, f) {
    const watcher = (v) => {
      if ((v = value)) {
        f();
      }
    };
    this.watch(watcher);
    return watcher;
  }
}
