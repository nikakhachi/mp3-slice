import { decodeAudioFromFile, trimAudioBuffer, audioBufferToWavBlob } from "./services/audio.service";

const sliceIntoSeconds = async (file: File, eachChunkDuration: number): Promise<Blob[]> => {
  if (file.type !== "audio/mpeg") throw Error("The provided file should be mp3");

  const { audioBuffer, audioContext } = await decodeAudioFromFile(file);
  const { duration } = audioBuffer;

  if (duration < eachChunkDuration) throw Error("The provided chunks duration is greater than the file duration");
  if (eachChunkDuration < 0) throw Error("The provided chunks duration should not be a negative number");

  const chunks: Blob[] = [];
  for (let i = 0; i < duration / eachChunkDuration; i++) {
    const newBuffer = trimAudioBuffer(audioBuffer, audioContext, i * eachChunkDuration, (i + 1) * eachChunkDuration);
    const trimmedAudioBlob = audioBufferToWavBlob(newBuffer);
    chunks.push(trimmedAudioBlob);
  }

  return chunks;
};

export { sliceIntoSeconds };
