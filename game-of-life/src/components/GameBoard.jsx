import React from "react";
import Cell from "./Cell";

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.createSquares = this.createSquares.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
    this.state = {
      generation: 0,
      isGameDisabled: false,
    };
    this.board = this.makeBoard();
  }

  handleStart() {
    this.setState({ ...this.state, isGameDisabled: true });
  }

  handleStop() {
    this.setState({ ...this.state, isGameDisabled: false });
  }

  handleClear() {}

  makeBoard() {
    let board = [];
    for (let y = 0; y < 25; y++) {
      board[y] = [];
      for (let x = 0; x < 25; x++) {
        board[y][x] = false;
      }
    }

    return board;
  }

  toggleCell(xValue, yValue) {
    this.board[xValue][yValue] = !this.board[xValue][yValue];
  }

  createSquares() {
    let rows = [];
    let board = [];
    for (let x = 0; x < 25; x++) {
      board = [];
      for (let y = 0; y < 25; y++) {
        board.push(
          <Cell
            key={(x + 1) * y}
            x={x}
            y={y}
            toggleCell={this.toggleCell}
            isGameDisabled={this.state.isGameDisabled}
          />
        );
      }
      rows.push(
        <div
          key={x}
          className="board-row"
          style={{ border: "none", padding: "0", margin: "0" }}
        >
          {board}
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
