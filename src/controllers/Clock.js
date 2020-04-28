class Clock {
  count;
  clear;

  countTime(length) {
    this.interval = setInterval(() => {
      this.count();
    }, 1000);
  }

  stopTime() {
    this.clear();
    clearInterval(this.interval);
  }
}

const clock = new Clock();

export default clock;