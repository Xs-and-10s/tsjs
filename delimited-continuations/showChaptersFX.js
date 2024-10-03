import { request, json, call, parallel, forEach } from "starfx";

function* showChapters(chapterURLs) {
  const reqs = chapterURLs.map(function (url) {
    return function* () {
      const response = yield* request(url);
      return yield* json(response);
    };
  });

  const chapters = yield* parallel(reqs);

  yield* forEach(chapters.sequence, function* (/* chapter */) {
    const result = yield* chapter;
    if (result.ok) {
      appendChapter(result.error); // ! why result.error ?!
    } else {
      console.error(result.error);
    }
  });
}
