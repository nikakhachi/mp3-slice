import { decodeAudioFromFile, trimAudioBuffer, audioBufferToWavBlob } from "./services/audio.service";

const trim = async (file: File, trimFrom: number, trimTo: number): Promise<Blob> => {
  if (file.type !== "audio/mpeg") throw Error("The provided file should be mp3");

  const { audioBuffer, audioContext } = await decodeAudioFromFile(file);
  const { duration } = audioBuffer;

  if (trimFrom > duration) throw Error("Starting time is greater than the file duration");
  if (trimFrom < 0) throw Error("Starting time should not be a negative number");

  if (trimTo > duration) trimTo = duration;

  const newBuffer = trimAudioBuffer(audioBuffer, audioContext, trimFrom, trimTo);

  const trimmedAudioBlob = audioBufferToWavBlob(newBuffer);

  return trimmedAudioBlob;
};

export { trim };
