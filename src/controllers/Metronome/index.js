import worker from "../../WebWorker/worker";
import WebWorker from "../../WebWorker/workerSetup";

const NOTE_LENGTH = 0.05;
const SCHEDULE_AHEAD_TIME = 0.1;
const LOOKAHEAD = 25.0;
const HIGH_FREQUENCY = 880.0;
const LOW_FREQUENCY = 440.0;

class Metronome {
  audioContext = null;
  unlocked = false;
  isPlaying = false;
  startTime;
  current16thNote;
  _tempo = 70.0;
  nextNoteTime = 0.0;
  firstNoteTime = 0.0;
  notesInQueue = [];
  timeWorker = null;
  endOfStepTime = 0.0;
  osc;

  onSequenceFinish;
  onSequenceStart;

  constructor(onSequenceStartCB, onSequenceFinishCB) {
    this.onSequenceStart = onSequenceStartCB;
    this.onSequenceFinish = onSequenceFinishCB;

    this.initTimeWorker();
  }

  initTimeWorker() {
    this.timeWorker = new WebWorker(worker);

    this.timeWorker.onmessage = ({ data }) => {
      const { message, index } = data;

      if (data === "tick") {
        this.scheduler();
      } else if (message && message === "play_index") {
        const lastStepPlayed = index === this._sequence.steps.length;

        if (lastStepPlayed) {
          this.pauseSequence();
        } else {
          this.setTempoAndTime(index);
          this.timeWorker.postMessage("start");
        }
      } else {
        console.log(`message: ${data}`);
      }
    };

    this.timeWorker.postMessage({ interval: LOOKAHEAD });
  }

  set tempo(bpm) {
    this._tempo = bpm;
  }

  set sequence(sequence) {
    this._sequence = sequence;
  }

  scheduler() {
    while (
      this.nextNoteTime <
      this.audioContext.currentTime + SCHEDULE_AHEAD_TIME
    ) {
      console.log({
        END_OF_STP: this.endOfStepTime,
        CURRENT: this.audioContext.currentTime,
      });
      if (
        this.endOfStepTime &&
        this.audioContext.currentTime >= this.endOfStepTime
      ) {
        this.playNextStepInSequence();
      }
      this.scheduleNote(this.current16thNote, this.nextNoteTime);
      this.nextNote();
    }
  }

  scheduleNote(beatNumber, time) {
    this.notesInQueue.push({ note: beatNumber, time });

    if (beatNumber % 4) {
      // we're not playing non-quarter 8th notes
      return;
    }

    // create an oscillator;
    const osc = this.audioContext.createOscillator();
    osc.connect(this.audioContext.destination);
    osc.frequency.value =
      beatNumber % 16 === 0 ? HIGH_FREQUENCY : LOW_FREQUENCY;
    osc.start(time);
    osc.stop(time + NOTE_LENGTH);
  }

  nextNote() {
    const secondsPerBeat = 60.0 / this._tempo;
    const nextNoteTime = this.nextNoteTime + 0.25 * secondsPerBeat;
    this.nextNoteTime = nextNoteTime;

    this.current16thNote = this.current16thNote + 1;
    if (this.current16thNote === 16) {
      this.current16thNote = 0;
    }
  }

  play() {
    const playerPreped = this.prepPlayer();
    if (playerPreped) {
      this.timeWorker.postMessage("start");
    }
  }

  prepPlayer() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    if (!this.unlocked) {
      // play silent buffer to unlock the audio
      const buffer = this.audioContext.createBuffer(1, 1, 22050);
      const node = this.audioContext.createBufferSource();
      node.buffer = buffer;
      node.start(0);
      this.unlocked = true;
    }

    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      // start playing
      this.current16thNote = 0;
      this.nextNoteTime = this.audioContext.currentTime;
      return true;
    }
  }

  setTempoAndTime(index) {
    const { length, bpm } = this._sequence.steps[index];
    this.endOfStepTime = this.audioContext.currentTime + length;
    this._tempo = bpm;
  }

  startSequence() {
    const playerPreped = this.prepPlayer();
    if (playerPreped) {
      this.timeWorker.postMessage("start_sequence");
      this.onSequenceStart();
    }
  }

  playNextStepInSequence() {
    this.timeWorker.postMessage("stop");
    this.timeWorker.postMessage("next_sequence");
  }

  pauseSequence() {
    this.timeWorker.postMessage("finish_sequence");
    this.pause();
    this.onSequenceFinish();
  }

  pause() {
    if (this.isPlaying) {
      this.isPlaying = !this.isPlaying;
      this.timeWorker.postMessage("stop");
    }
  }
}

let metronome;

const initMetronome = (onSequenceStartCB, onSequenceFinishCB) => {
  metronome = new Metronome(onSequenceStartCB, onSequenceFinishCB);
};

export { metronome, initMetronome };
