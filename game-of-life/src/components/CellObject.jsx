import React from "react";
import "./cellObject.css";

export default class CellObject extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);

    // each cell will hold it`s state as a boolean value
    // False = dead, True = alive
    this.state = { currentState: false, bgColor: false, isDisabled: false };
  }

  handleClick() {
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
