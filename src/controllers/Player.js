import Beat1 from '../resources/beat1.wav'

class Player {
  constructor() {
    this.beat = new Audio(Beat1);
  }

  play() {
    this.beat.play();
  }
}

const player = new Player();

export default player;
