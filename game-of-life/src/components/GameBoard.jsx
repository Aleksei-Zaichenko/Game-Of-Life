import React from "react";
import Cell from "./Cell";
import CellObject from "./CellObject";

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      generation: 0,
      cells: Array(625).fill(new CellObject()),
      animationID: null,
      isGameDisabled: false,
    };
  }

  handleStart() {
    this.setState({ ...this.state, isGameDisabled: true });
    for (let i = 0; i < 625; i++) {
      this.state.cells[i].setDisabled(!this.state.cells[i].getDisabled());
    }
    console.log("done");
    console.log(this.state.cells[0]);
  }

  handleStop() {}

  handleClear() {}

  createSquares() {
    let rows = [];
    let squares = [];
    for (var i = 0; i < 625; i++) {
      if (i % 25 === 0) {
        rows.push(
          <div
            key={i}
            className="board-row"
            style={{ border: "none", padding: "0", margin: "0" }}
          >
            {squares}
          </div>
        );
        squares = [];
      }
      squares.push(
        <Cell
          key={i}
          CellObject={this.state.cells[i]}
          isGameDisabled={this.state.isGameDisabled}
        />
      );
    }
    return rows;
  }

  render() {
    const rows = this.createSquares();

    console.log(rows);
    return (
      <div className="GameBoard">
        <p>Current Generation: {this.state.generation}</p>
        <div>{rows}</div>
        <div className="buttonsContainer">
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handleStop}>Stop</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
      </div>
    );
  }
}
