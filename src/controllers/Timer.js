import player from "./Player";
import sequence from "./Sequence";
import clock from "./Clock";

class Timer {
  constructor() {
    this._bpm = 50;
    this.playing = false;
    this.cb = undefined;
  }

  set bpm(bpm) {
    this._bpm = bpm;
  }

  get bpm() {
    return this._bpm;
  }

  playBeat(bpm) {
    if (!this.playing) {
      this.playing = true;
      console.log({ ACTUAL_SPEED: this.convertBpmToMs(bpm) });
      this.interval = setInterval(() => {
        player.play();
      }, this.convertBpmToMs(bpm));
    }
  }

  stopBeat() {
    if (this.playing) {
      this.playing = false;
      clearInterval(this.interval);
    }
  }

  convertBpmToMs(bpm) {
    return Math.round(60000 / bpm);
  }

  reset() {
    this.stopBeat();
    sequence.clear();
  }

  async playSequence({ steps }) {
    if (steps.length) {
      for (const step of steps) {
        await this.playSequenceItem(step);
      }
    }
  }

  playSequenceItem(item) {
    return new Promise((res, rej) => {
      const { bpm, length } = item;
      console.log({ PLAYING_BPM: bpm });
      this.playBeat(bpm);
      this.runCounter(length);

      this.timeout = setTimeout(() => {
        this.stopBeat();
        this.stopCounter();
        return res(true);
      }, length * 1000);
    });
  }

  stopPlaySequence() {
    this.stopBeat();
    clearTimeout(this.timeout);
  }

  runCounter(length) {
    // clock.countTime(length);
  }

  stopCounter() {
    // clock.stopTime();
  }
}

const timer = new Timer();

export default timer;
