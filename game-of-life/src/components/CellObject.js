export default class CellObject {
  constructor(state = false) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
  setState(value) {
    this.state = value;
  }
}
