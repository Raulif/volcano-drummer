class Sequence {
  constructor() {
    this._list = [];
  }

  get list() {
    return this._list;
  }

  clear() {
    this._list = [];
  }

  add(bpm, length) {
    this._list.push({ bpm, length });
  }

  remove(index) {
    this._list.splice(index, 1);
  }
}

const sequence = new Sequence();

export default sequence;
