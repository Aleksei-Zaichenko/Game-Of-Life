import React from "react";
import CellObject from "./CellObject";

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { generation: 0, cells: Array(25).fill(CellObject) };
  }

  handleStart() {}

  handleStop() {}

  handleClear() {}

  render() {
    return (
      <div className="GameBoard">
        <p>Current Generation: {this.state.generation}</p>
        {this.state.cells.map((cell, counter) => (
          <p>{counter}</p>
        ))}
        <div className="buttonsContainer">
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.props.handleStop}>Stop</button>
          <button onClick={this.props.handleClear}>Clear</button>
        </div>
      </div>
    );
  }
}
