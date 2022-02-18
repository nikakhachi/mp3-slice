const getDuration = (src: File): Promise<number> =>
  new Promise((res, rej) => {
    const tempAudioEl = document.createElement("audio");
    tempAudioEl.src = window.URL.createObjectURL(src);
    tempAudioEl.addEventListener("loadedmetadata", () => {
      res(tempAudioEl.duration);
    });
  });

export { getDuration };
