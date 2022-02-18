import audioBufferToWav = require("audiobuffer-to-wav");
import { getDuration } from "./utils/getAudioDuration";

const sliceMp3InChunks = async (src: File, chunkDuration: number) => {
  const duration: number = await getDuration(src);

  const arrayBuffer = await new Response(src).arrayBuffer();

  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const chunks = [];
  for (let i = 0; i < duration / chunkDuration; i++) {
    const computedStart = (audioBuffer.length * i * chunkDuration) / audioBuffer.duration;
    const computedEnd = (audioBuffer.length * (i * chunkDuration + chunkDuration)) / audioBuffer.duration;

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

export { sliceMp3InChunks };
