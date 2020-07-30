import React, { useRef, useCallback, useState } from "react";
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
                ? { backgroundColor: "CornflowerBlue" }
                : { backgroundColor: "purple" }
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
      <p className="generationsParagraph">Current Generation: {generations}</p>
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
export default GameBoard;
