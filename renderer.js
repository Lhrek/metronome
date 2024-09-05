const audioContext = new AudioContext();
let interval = null;
let beatCounter = 0;
const bpmSlider = document.getElementById('bpm-slider');
const bpmDisplay = document.getElementById('bpm-display');
const pendulum = document.getElementById('pendulum');

bpmSlider.oninput = function() {
  bpmDisplay.textContent = `${this.value} BPM`;
  updatePendulumPeriod(this.value);
  if (interval) {
    stopMetronome();
    startMetronome();
  }
};

function updatePendulumPeriod(bpm) {
  const period = 60000 / bpm / 2;
  pendulum.style.animationDuration = `${period}ms`;
}

function startMetronome() {
  const bpm = parseInt(bpmSlider.value);
  const intervalTime = 60000 / bpm;
  beatCounter = 0;
  interval = setInterval(() => {
    playBeat(beatCounter === 0);
    beatCounter = (beatCounter + 1) % 4;
  }, intervalTime);
}

function playBeat(isStrongBeat) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = isStrongBeat ? 440 : 330; // A4 for strong, E4 for weak
  gainNode.gain.value = isStrongBeat ? 1.0 : 0.6;

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}

function stopMetronome() {
  clearInterval(interval);
  interval = null;
  beatCounter = 0;
}
