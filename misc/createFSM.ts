type NoInfer<T> = [T][T extends any ? 0 : never];

// BEFORE
declare function createFSM<TState extends string>(config: {
  // Without NoInfer, TS doesn't know which
  // TState is the source of truth
  initial: TState;
  states: TState[];
}): TState;
const example = createFSM({
  initial: "not_allowed",
  states: ["open", "closed"],
});

// AFTER
declare function createFSM2<TState extends string>(config: {
  // With NoInfer, 'initial' is removed
  // as a candidate!
  initial: NoInfer<TState>;
  states: TState[];
}): TState;
const example2 = createFSM2({
  initial: "not_allowed",
  states: ["open", "closed"],
});
