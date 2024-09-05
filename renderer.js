const audioContext = new AudioContext();
let interval = null;
const bpmSlider = document.getElementById('bpm-slider');
const bpmDisplay = document.getElementById('bpm-display');

bpmSlider.oninput = function() {
  bpmDisplay.textContent = `${this.value} BPM`;
  if (interval) {
    stopMetronome();
    startMetronome();
  }
};

function startMetronome() {
  const bpm = parseInt(bpmSlider.value);
  const intervalTime = 60000 / bpm;
  interval = setInterval(() => {
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.frequency.value = 440; // A4 音高
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // 持续时间为 0.1 秒
  }, intervalTime);
}

function stopMetronome() {
  clearInterval(interval);
  interval = null;
}
