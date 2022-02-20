import audioBufferToWav = require("audiobuffer-to-wav");

const decodeAudioFromFile = async (file: File) => {
  const arrayBuffer = await new Response(file).arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return { audioBuffer, audioContext };
};

const trimAudioBuffer = (audioBuffer: AudioBuffer, audioContext: AudioContext, trimFrom: number, trimTo: number) => {
  const computedStart = (audioBuffer.length * trimFrom) / audioBuffer.duration;
  const computedEnd = (audioBuffer.length * trimTo) / audioBuffer.duration;

  const newBuffer = audioContext.createBuffer(
    audioBuffer.numberOfChannels,
    computedEnd - computedStart,
    audioBuffer.sampleRate,
  );

  for (let j = 0; j < audioBuffer.numberOfChannels; j++) {
    newBuffer.copyToChannel(audioBuffer.getChannelData(j).slice(computedStart, computedEnd), j);
  }

  return newBuffer;
};

const audioBufferToWavBlob = (audioBuffer: AudioBuffer) => {
  const wav = audioBufferToWav(audioBuffer);
  const wavBlob = new Blob([wav], { type: "audio/wav" });

  return wavBlob;
};

export { decodeAudioFromFile, trimAudioBuffer, audioBufferToWavBlob };
