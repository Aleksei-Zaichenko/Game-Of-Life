export default class CellObject {
  constructor(state = false, disabled = false) {
    this.state = state;
    this.disabled = disabled;
  }
  getState() {
    return this.state;
  }
  getDisabled() {
    return this.disabled;
  }
  setState(value) {
    this.state = value;
  }
  setDisabled(value) {
    this.disabled = value;
  }
}
