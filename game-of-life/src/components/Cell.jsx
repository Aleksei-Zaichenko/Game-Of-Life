import React from "react";
import "./cellObject.css";

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleDisabling = this.handleDisabling.bind(this);
    this.getCurrentState = this.getCurrentState.bind(this);
    // each cell will hold it`s state as a boolean value
    // False = dead, True = alive
    this.state = {
      currentState: this.props.state,
      bgColor: this.props.backgroundColor,
      isDisabled: this.props.CellObject.disabled,
    };
  }

  handleClick() {
    console.log("props", this.props.CellObject);
    console.log("currentState:", this.state.currentState);
    console.log("disabled: ", this.state.isDisabled);
    this.setState({
      ...this.state,
      currentState: !this.state.currentState,
      bgColor: !this.state.bgColor,
    });
  }

  handleStateChange() {
    this.setState({
      ...this.state,
      currentState: !this.state.currentState,
      bg: !this.state.bgColor,
    });
  }

  handleDisabling() {
    this.setState({
      ...this.state,
      isDisabled: !this.state.isDisabled,
    });
  }

  getCurrentState() {
    return this.state.currentState;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prev", prevProps);
    console.log(prevState);
    if (this.props.CellObject.disabled) {
      console.log("oh");
      this.setState({
        currentState: this.props.state,
        bgColor: this.props.backgroundColor,
        isDisabled: this.props.CellObject.disabled,
      });
    }
  }

  render() {
    return (
      <button
        className="individualCell"
        style={
          this.state.bgColor
            ? { backgroundColor: "orange" }
            : { backgroundColor: "#D3D3D3" }
        }
        onClick={this.handleClick}
        disabled={this.state.isDisabled}
      ></button>
    );
  }
}