"use client";
import { time } from "console";
import { Effect, Either } from "effect";

const MAIN_EFFECT_ALL = Effect.gen(function* (_) {
  yield* _(Effect.log("MAIN_EFFECT: running"));
  const effects = [1, 2, 3, 4, 5].map((x) => WORK_EFFECT(x));
  const results = yield* _(Effect.all(effects, { concurrency: "unbounded" }));

  yield* _(Effect.log(`We got results: ${results}`));
});

const MAIN_EFFECT_EITHERS = Effect.gen(function* (_) {
  yield* _(Effect.log("MAIN_EFFECT: running"));
  const effects = [1, 2, 3, 4, 5].map((x) => WORK_EFFECT(x));
  const eithers = effects.map((x) => Effect.either(x));
  const results = yield* _(Effect.all(eithers, { concurrency: "unbounded" }));

  const errors = results.filter(Either.isLeft).map((x) => x.left);
  const successes = results.filter(Either.isRight).map((x) => x.right);

  yield* _(Effect.sync(() => console.log(`We got successes: ${successes}`)));
  yield* _(Effect.sync(() => console.log(`We got errors: ${errors}`)));
});

const MAIN_RUN = () => {
  Effect.runPromise(
    MAIN_EFFECT_ALL.pipe(
      Effect.catchAll((error) => Effect.log(`We got error: ${error._tag}`))
    )
  );
};

async function WORK(i: number) {
  if (i === 4) {
    throw "4 sux tbh";
  }
  await waitFor(i);
  console.log("WORK: resolved", i);

  return i ** 2;
}

async function WORK_ABORTABLE(i: number, signal: AbortSignal) {
  console.log("WORK: running for ", i);
  if (i === 4) {
    throw "WORK: 4sux tbh";
  }
  await waitForABORTABLE(i, signal);
  console.log("WORK: resolved:", i);
}

function WORK_EFFECT(i: number) {
  return Effect.gen(function* (_) {
    yield* _(Effect.log(`WORK_EFFECT: running for: ${i}`));

    if (i === 4) {
      return yield* _(Effect.fail(new FourError()));
    }

    // yield* _(Effect.promise(() => waitFor(i)));
    yield* _(
      Effect.tryPromise({
        try: (signal) => waitForABORTABLE(i, signal),
        catch: (_error) => new WaitForError(),
      })
    );
    yield* _(Effect.log(`WORK_EFFECT: resolved: ${i}`));

    return i ** 2;
  });
}

async function MAIN() {
  const abortController = new AbortController();
  const { signal } = abortController;

  try {
    console.log("MAIN: running");
    // const promises = [1, 2, 3, 4, 5].map((i) => WORK(i));
    const promises = [1, 2, 3, 4, 5].map((i) => WORK_ABORTABLE(i, signal));
    const results = await Promise.all(promises);

    console.log("MAIN: We got results:", results);
  } catch (e) {
    console.error("MAIN: failed for reason:", e?.message ?? e);
    abortController.abort();
    return e;
  }
}

async function MAIN_SETTLED() {
  console.log("MAIN_SETTLED: running");
  const promises = [1, 2, 3, 4, 5].map((i) => WORK(i));
  const results = await Promise.allSettled(promises);
  const errors = results
    .filter((r): r is PromiseRejectedResult => r.status === "rejected")
    .map((r) => r.reason);
  const successes = results
    .filter(
      (r): r is PromiseFulfilledResult<number> => r.status === "fulfilled"
    )
    .map((r) => r.value);
}

async function waitFor(i: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(i);
    }, 1000 * i);
  });
}

async function waitForABORTABLE(i: number, abortSignal: AbortSignal) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      console.log("waitFor: resolved:", i);
      resolve(i);
    }, 1000 * i);

    abortSignal.addEventListener("abort", () => {
      clearTimeout(timeout);
      console.log("waitFor: aborted:", i);
      reject("waitFor: aborted");
    });
  });
}

class FourError {
  readonly _tag = "FourError";
}

class WaitForError {
  readonly _tag = "WaitForError";
}
