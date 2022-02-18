const audioBufferToWav = require("audiobuffer-to-wav");

const getDuration = (src: File): Promise<number> =>
  new Promise((res, rej) => {
    const tempAudioEl = document.createElement("audio");
    tempAudioEl.src = window.URL.createObjectURL(src);
    tempAudioEl.addEventListener("loadedmetadata", () => {
      res(tempAudioEl.duration);
    });
  });

const main = async (src: File, chunkDuration: number) => {
  const duration: number = await getDuration(src);

  const buffer = await new Response(src).arrayBuffer();
  const audioContext = new AudioContext();
  // Convert ArrayBuffer into AudioBuffer
  const decodedData = await audioContext.decodeAudioData(buffer);

  const chunks = [];
  for (let i = 0; i < duration / chunkDuration; i++) {
    //Compute start and end values in secondes
    let computedStart = (decodedData.length * i * chunkDuration) / decodedData.duration;
    let computedEnd = (decodedData.length * (i * chunkDuration + chunkDuration)) / decodedData.duration;

    //Create a new buffer
    const newBuffer = audioContext.createBuffer(
      decodedData.numberOfChannels,
      computedEnd - computedStart,
      decodedData.sampleRate,
    );

    // Copy from old buffer to new with the right slice.
    // At this point, the audio has been cut
    for (let i = 0; i < decodedData.numberOfChannels; i++) {
      newBuffer.copyToChannel(decodedData.getChannelData(i).slice(computedStart, computedEnd), i);
    }
    const wav = audioBufferToWav(newBuffer);
    const blob = new Blob([wav], { type: "audio/wav" });
    chunks.push(blob);
  }

  return chunks;
};

export default main;
