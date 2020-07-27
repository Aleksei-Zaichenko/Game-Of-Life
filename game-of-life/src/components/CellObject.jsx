import React from "react";

const individualCell = {
  background: "#D3D3D3",
  border: "1px solid #999",
  lineHeight: "34px",
  height: "34px",
  marginRight: "-1px",
  marginTop: "-2px",
  padding: "0",
  width: "34px",
};

export default class CellObject extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);

    // each cell will hold it`s state as a boolean value
    // False = dead, True = alive
    this.state = { currentState: false };
  }

  handleClick() {
    this.setState({ currentState: !this.state.currentState });
  }

  handleStateChange() {
    this.setState({ currentState: !this.state.currentState });
  }

  render() {
    return (
      <button
        className="individualCell"
        style={individualCell}
        onClick={this.handleClick}
      ></button>
    );
  }
}
