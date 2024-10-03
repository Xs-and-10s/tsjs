async function asyncQueue<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<(PromiseFulfilledResult<T> | PromiseRejectedResult)[]> {
  const results: (PromiseFulfilledResult<T> | PromiseRejectedResult)[] = [];

  const runTask = async (task: () => Promise<T>, index: number) => {
    try {
      const value = await task();
      results[index] = { status: "fulfilled", value };
    } catch (reason) {
      results[index] = { status: "rejected", reason };
    }
  };

  const runningTasks: Promise<void>[] = [];
  for (let i = 0; i < Math.min(limit, tasks.length); i++) {
    runningTasks.push(runTask(tasks[i], i));
  }

  let nextTaskIndex = limit;
  while (runningTasks.length > 0) {
    const completedTaskIndex = await Promise.race(
      runningTasks.map((t, idx) => t.then(() => idx))
    );
    runningTasks.splice(completedTaskIndex, 1);

    if (nextTaskIndex < tasks.length) {
      runningTasks.push(runTask(tasks[nextTaskIndex], nextTaskIndex));
      nextTaskIndex++;
    }
  }

  return results;
}
