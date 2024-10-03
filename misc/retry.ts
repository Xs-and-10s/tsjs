async function retry<T>(fn: () => Promise<T>, retries: number = 5) {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0) {
      console.log("retrying...");
      return await retry(fn, retries - 1);
    }
    throw err;
  }
}

retry(() => Promise.resolve("hello")).then((str) => {
  console.log(str);
  //          ^?
  // .........should be str: string
});
