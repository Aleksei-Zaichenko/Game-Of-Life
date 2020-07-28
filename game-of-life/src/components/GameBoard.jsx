import React from "react";
import CellObject from "./CellObject";

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
    // this.createSquares = this.createSquares.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      generation: 0,
      cells: Array(25).fill(<div>{Array(25).fill(<CellObject />)}</div>),
      animationID: null,
    };
  }

  handleStart() {
    // console.log(this.state.cells[0]);
    // for (let i = 0; i < 625; i++) {
    //   if (this.state.cells[i].getCurrentState() === true) {
    //     console.log("true");
    //     this.state.cells[i].handleDisabling();
    //   }
    // }
  }

  handleStop() {}

  handleClear() { 
    this.setState({
      generation: 0,
      cells: Array(25).fill(<div>{Array(25).fill(<CellObject />)}</div>),
      animationID: null,
    });
  }

  createSquares() {
    // let rows = [];
    // for (var i = 0; i < 25; i++) {
    //   let squares = [];
    //   for (var j = 0; j < 25; j++) {
    //     squares.push(<CellObject />);
    //   }
    //   rows.push(
    //     <div
    //       className="board-row"
    //       style={{ border: "none", padding: "0", margin: "0" }}
    //     >
    //       {squares}
    //     </div>
    //   );
    // }
    // let rows = [];
    // let squares = [];
    // for (var i = 0; i < 625; i++) {
    //   if (i % 25 === 0) {
    //     rows.push(
    //       <div
    //         className="board-row"
    //         style={{ border: "none", padding: "0", margin: "0" }}
    //       >
    //         {squares}
    //       </div>
    //     );
    //     squares = [];
    //   }
    //   squares.push();
    // }
    // return rows;
  }

  componentDidMount() {
    // const rows = this.createSquares();
    // this.setState({ ...this.state, cells: rows });
  }

  render() {
    // const rows = this.createSquares();

    // console.log(rows);
    return (
      <div className="GameBoard">
        <p>Current Generation: {this.state.generation}</p>
        <div>{this.state.cells}</div>
        <div className="buttonsContainer">
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handleStop}>Stop</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
      </div>
    );
  }
}
