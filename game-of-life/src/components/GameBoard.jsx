import React, { useRef, useCallback, useState } from "react";
import Cell from "./Cell";
import produce from "immer";
import "./cellObject.css";

const operations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
];

// export default class GameBoard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleStart = this.handleStart.bind(this);
//     this.handleStop = this.handleStop.bind(this);
//     this.handleClear = this.handleClear.bind(this);
//     this.toggleCell = this.toggleCell.bind(this);
//     this.makeBoard = this.makeBoard.bind(this);
//     this.state = {
//       gameSpeed: 1000,
//       xValue: 25,
//       yValue: 25,
//       generation: 0,
//       isGameDisabled: false,
//       board: this.makeBoard(),
//     };
//   }

//   handleStart() {
//     this.setState({ ...this.state, isGameDisabled: true });

//     const runningRef = useRef(this.state.isGameDisabled);

//     runningRef.current = this.state.isGameDisabled;

//     const runGame = useCallback(() => {
//       if (!runningRef.current) {
//         return;
//       }

//       const newBoard = produce(this.state.board, (boardCopy) => {
//         for (let x = 0; x < this.state.xValue; x++) {
//           for (let y = 0; y < this.state.yValue; y++) {
//             let neighbors = 0;
//             operations.forEach(([row, column]) => {
//               const rowResult = x + row;
//               const columnResult = y + column;
//               if (
//                 rowResult >= 0 &&
//                 rowResult < this.state.xValue &&
//                 columnResult >= 0 &&
//                 columnResult < this.state.yValue
//               ) {
//                 neighbors += this.state.board[rowResult][columnResult];
//               }
//             });

//             if (neighbors < 2 || neighbors > 3) {
//               boardCopy[x][y] = false;
//             } else if (this.state.board[x][y] === 0 && neighbors === 3) {
//               boardCopy[x][y] = false;
//             }
//           } //end of inner for loop
//         } //end of outer for loop
//       });

//       this.setState({
//         ...this.state,
//         generation: this.state.generation + 1,
//         board: newBoard,
//       });

//       setTimeout(runGame, this.state.gameSpeed);
//     }, []);
//   }

//   handleStop() {
//     this.setState({ ...this.state, isGameDisabled: false });
//   }

//   handleClear() {
//     this.setState({
//       ...this.state,
//       generation: 0,
//       isGameDisabled: false,
//       board: this.makeBoard(),
//     });
//   }

//   makeBoard() {
//     let board = [];
//     for (let x = 0; x < 25; x++) {
//       board[x] = [];
//       for (let y = 0; y < 25; y++) {
//         board[x][y] = false;
//       }
//     }

//     return board;
//   }

//   toggleCell(xValue, yValue) {
//     const newBoard = produce(this.state.board, (boardCopy) => {
//       boardCopy[xValue][yValue] = this.state.board[xValue][yValue]
//         ? false
//         : true;
//     });
//     this.setState({ ...this.state, board: newBoard });
//   }

//   createSquares(rows, xValue) {
//     return (
//       <div key={xValue} style={{ border: "none", padding: "0", margin: "0" }}>
//         {rows.map((colm, y) => (
//           <button
//             key={(xValue + 1) * y}
//             className="individualCell"
//             onClick={() => {
//               this.toggleCell(xValue, y);
//             }}
//             style={
//               this.state.board[xValue][y]
//                 ? { backgroundColor: "orange" }
//                 : { backgroundColor: "#D3D3D3" }
//             }
//             disabled={this.state.isGameDisabled}
//           />
//         ))}
//       </div>
//     );
//   }

//   render() {
//     return (
//       <div className="GameBoard">
//         <p>Current Generation: {this.state.generation}</p>
//         <div>
//           {this.state.board.map((rows, x) => this.createSquares(rows, x))}
//         </div>
//         <div className="buttonsContainer">
//           <button onClick={this.handleStart}>Start</button>
//           <button onClick={this.handleStop}>Stop</button>
//           <button onClick={this.handleClear}>Clear</button>
//         </div>
//       </div>
//     );
//   }
// }
function GameBoard(props) {
  const [gameSpeed, setGameSpeed] = useState(500);
  const [xValue, setXValue] = useState(25);
  const [yValue, setYValue] = useState(25);
  const [generations, setGenerations] = useState(0);
  const [isGameDisabled, setIsGameDisabled] = useState(false);
  const [board, setBoard] = useState(() => {
    return makeBoard();
  });

  function makeBoard() {
    let board = [];
    for (let x = 0; x < xValue; x++) {
      board[x] = [];
      for (let y = 0; y < yValue; y++) {
        board[x][y] = 0;
      }
    }
    return board;
  }

  function createSquares(rows, passedxValue) {
    return (
      <div key={passedxValue} className="row">
        {rows.map((colm, y) => (
          <button
            key={(passedxValue + 1) * y}
            className="individualCell"
            onClick={() => {
              toggleCell(passedxValue, y);
            }}
            style={
              board[passedxValue][y]
                ? { backgroundColor: "orange" }
                : { backgroundColor: "#D3D3D3" }
            }
            disabled={isGameDisabled}
          />
        ))}
      </div>
    );
  }

  function toggleCell(xValue, yValue) {
    const newBoard = produce(board, (boardCopy) => {
      boardCopy[xValue][yValue] = board[xValue][yValue] ? 0 : 1;
    });
    setBoard(newBoard);
  }

  function handleStart() {
    setIsGameDisabled(true);
    if (!isGameDisabled) {
      runningRef.current = true;
      runGame();
    }
  }

  function handleStop() {
    setIsGameDisabled(false);
  }

  function handleClear() {
    setIsGameDisabled(false);
    setGenerations(0);
    setBoard(makeBoard());
  }

  const runningRef = useRef(isGameDisabled);
  runningRef.current = isGameDisabled;

  const runGame = useCallback(() => {
    if (!runningRef.current) {
      console.log("return");
      return;
    }

    setBoard((b) => {
      return produce(b, (boardCopy) => {
        for (let i = 0; i < xValue; i++) {
          for (let k = 0; k < yValue; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < xValue && newK >= 0 && newK < yValue) {
                neighbors += b[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              boardCopy[i][k] = 0;
            } else if (b[i][k] === 0 && neighbors === 3) {
              boardCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setGenerations((generations) => generations + 1);
    setTimeout(runGame, gameSpeed);
  }, [gameSpeed]);

  return (
    <div className="GameBoard">
      <p className="generationDisplay">Current Generation: {generations}</p>
      <div className="cellsContainer">
        {board.map((rows, x) => createSquares(rows, x))}
      </div>
      <div className="buttonsContainer">
        <button
          className="controlButton"
          style={{ backgroundColor: "#4CAF50" }}
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="controlButton"
          style={{ backgroundColor: "#f44336" }}
          onClick={handleStop}
        >
          Stop
        </button>
        <button
          className="controlButton"
          style={{ color: "black" }}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <div>
        <p className="rules">
          1) Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
          <br /> 2) Any live cell with two or three live neighbours lives on to
          the next generation. <br />
          3) Any live cell with more than three live neighbours dies, as if by
          overpopulation. <br />
          4) Any dead cell with exactly three live neighbours becomes a live
          cell, as if by reproduction.
        </p>
      </div>
    </div>
  );
}

// setBoard((b) => {
//   return produce(b, (boardCopy) => {
//     for (let i = 0; i < xValue; i++) {
//       for (let k = 0; k < yValue; k++) {
//         let neighbors = 0;
//         operations.forEach(([x, y]) => {
//           const newI = i + x;
//           const newK = k + y;
//           if (newI >= 0 && newI < xValue && newK >= 0 && newK < yValue) {
//             neighbors += 1;
//           }
//         });

//         if (neighbors < 2 || neighbors > 3) {
//           boardCopy[i][k] = false;
//         } else if (b[i][k] === 0 && neighbors === 3) {
//           boardCopy[i][k] = true;
//         }
//       }
//     }
//   });
// });

export default GameBoard;
