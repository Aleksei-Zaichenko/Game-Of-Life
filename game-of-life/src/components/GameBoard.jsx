import React from "react";
import Cell from "./Cell";
import produce from "immer";
import "./cellObject.css";

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
    this.makeBoard = this.makeBoard.bind(this);
    this.state = {
      xValue: 25,
      yValue: 25,
      generation: 0,
      isGameDisabled: false,
      board: this.makeBoard(),
    };
  }

  handleStart() {
    this.setState({ ...this.state, isGameDisabled: true });
  }

  handleStop() {
    this.setState({ ...this.state, isGameDisabled: false });
  }

  handleClear() {
    this.setState({
      ...this.state,
      generation: 0,
      isGameDisabled: false,
      board: this.makeBoard(),
    });
  }

  makeBoard() {
    let board = [];
    for (let x = 0; x < this.state.xValue; x++) {
      board[x] = [];
      for (let y = 0; y < this.state.yValue; y++) {
        board[x][y] = false;
      }
    }

    return board;
  }

  toggleCell(xValue, yValue) {
    const newBoard = produce(this.state.board, (boardCopy) => {
      boardCopy[xValue][yValue] = this.state.board[xValue][yValue]
        ? false
        : true;
    });
    this.setState({ ...this.state, board: newBoard });
  }

  createSquares(rows, xValue) {
    return (
      <div key={xValue} style={{ border: "none", padding: "0", margin: "0" }}>
        {rows.map((colm, y) => (
          <button
            key={(xValue + 1) * y}
            className="individualCell"
            onClick={() => {
              this.toggleCell(xValue, y);
            }}
            style={
              this.state.board[xValue][y]
                ? { backgroundColor: "orange" }
                : { backgroundColor: "#D3D3D3" }
            }
            disabled={this.state.isGameDisabled}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="GameBoard">
        <p>Current Generation: {this.state.generation}</p>
        <div>
          {this.state.board.map((rows, x) => this.createSquares(rows, x))}
        </div>
        <div className="buttonsContainer">
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handleStop}>Stop</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
      </div>
    );
  }
}
