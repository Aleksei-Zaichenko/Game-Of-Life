import React from "react";
import CellObject from "./CellObject";

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { generation: 0, cells: Array(625).fill(false) };
  }

  handleStart() {}

  handleStop() {}

  handleClear() {}

  createSquares() {
    let rows = [];
    for (var i = 0; i < 25; i++) {
      let squares = [];
      for (var j = 0; j < 25; j++) {
        squares.push(<CellObject color="yellow" />);
      }
      rows.push(
        <div
          className="board-row"
          style={{ border: "none", padding: "0", margin: "0" }}
        >
          {squares}
        </div>
      );
    }
    return rows;
  }

  render() {
    return (
      <div className="GameBoard">
        <p>Current Generation: {this.state.generation}</p>
        <div>{this.createSquares()}</div>
        <div className="buttonsContainer">
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handleStop}>Stop</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
      </div>
    );
  }
}
