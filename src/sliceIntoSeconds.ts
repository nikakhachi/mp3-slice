import audioBufferToWav = require("audiobuffer-to-wav");

const sliceIntoSeconds = async (file: File, eachChunkDuration: number): Promise<Blob[]> => {
  if (file.type !== "audio/mpeg") throw Error("The provided file should be mp3");

  const arrayBuffer = await new Response(file).arrayBuffer();

  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const { duration } = audioBuffer;

  if (duration < eachChunkDuration) throw Error("The provided chunks duration is greater than the file duration");

  const chunks: Blob[] = [];
  for (let i = 0; i < duration / eachChunkDuration; i++) {
    const computedStart = (audioBuffer.length * i * eachChunkDuration) / duration;
    const computedEnd = (audioBuffer.length * (i * eachChunkDuration + eachChunkDuration)) / duration;

    const newBuffer = audioContext.createBuffer(
      audioBuffer.numberOfChannels,
      computedEnd - computedStart,
      audioBuffer.sampleRate,
    );

    for (let j = 0; j < audioBuffer.numberOfChannels; j++) {
      newBuffer.copyToChannel(audioBuffer.getChannelData(j).slice(computedStart, computedEnd), j);
    }

    const wav = audioBufferToWav(newBuffer);
    const blob = new Blob([wav], { type: "audio/wav" });
    chunks.push(blob);
  }

  return chunks;
};

export { sliceIntoSeconds };
