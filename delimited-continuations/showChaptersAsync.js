// cf. Jake Archibald blog ???
async function showChapters(chapterURLs) {
  const chapterPromises = chapterURLs.map(async (url) => {
    const response = await fetch(url);
    return response.json();
  });

  for (const promise of chapterPromises) promise.catch(() => {});

  for await (const chapterData of chapterPromises) {
    appendChapter(chapterData);
  }
}
