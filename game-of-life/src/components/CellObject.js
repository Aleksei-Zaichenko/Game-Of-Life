export default class CellObject {
  constructor(state = false, backGroundColor = false, disabled = false) {
    this.state = state;
    this.backGroundColor = backGroundColor;
    this.disabled = disabled;
  }
  getState() {
    return this.state;
  }
  getBackgroundColor() {
    return this.backGroundColor;
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
