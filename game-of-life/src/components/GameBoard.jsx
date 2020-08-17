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
  const [buffer, setBuffer] = useState([board]);

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
    let temp = isGameDisabled;
    console.log("temo", temp);
    console.log(isGameDisabled);
    generationsGenerator(isGameDisabled);
  }

  function handleStop() {
    setIsGameDisabled(false);
    console.log(buffer);
  }

  function handleClear() {
    setIsGameDisabled(false);
    setGenerations(0);
    setXValue(25);
    setYValue(25);
    setBoard(makeBoard());
  }

  function handleRandom() {
    setIsGameDisabled(false);
    setGenerations(0);

    function makeRandomBoard() {
      let board = [];
      for (let x = 0; x < xValue; x++) {
        board[x] = [];
        for (let y = 0; y < yValue; y++) {
          board[x][y] = Math.floor(Math.random() * 2);
        }
      }
      return board;
    }

    setBoard(makeRandomBoard());
  }

  const runningRef = useRef(isGameDisabled);
  runningRef.current = isGameDisabled;

  const runGame = useCallback(() => {
    if (!runningRef.current) {
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
  }, [gameSpeed, xValue, yValue]);

  function generationsGenerator(gameStatus) {
    let m = 0;
    console.log(gameStatus);
    let temp = isGameDisabled;
    console.log("tempo", temp);
    // while (checkForloop) {
    // let newBoard = produce(buffer[m], (boardCopy) => {
    //   for (let i = 0; i < xValue; i++) {
    //     for (let k = 0; k < yValue; k++) {
    //       let neighbors = 0;
    //       operations.forEach(([x, y]) => {
    //         const newI = i + x;
    //         const newK = k + y;
    //         if (newI >= 0 && newI < xValue && newK >= 0 && newK < yValue) {
    //           neighbors += buffer[m][newI][newK];
    //         }
    //       });
    //       if (neighbors < 2 || neighbors > 3) {
    //         boardCopy[i][k] = 0;
    //       } else if (buffer[m][i][k] === 0 && neighbors === 3) {
    //         boardCopy[i][k] = 1;
    //       }
    //     }
    //   }
    // });
    //   setBuffer([...buffer, buffer]);
    //   m++;
    //   console.log(m);
    //   setBuffer([...buffer, board]);
    // }
  }

  function handleXValueChange(event) {
    setXValue(event.target.value);
    setBoard(makeBoard());
  }

  function handleYValueChange(event) {
    setYValue(event.target.value);
    setBoard(makeBoard());
  }

  function handleGameSpeedChange(event) {
    setGameSpeed(event.target.value);
  }

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
        <button
          className="controlButton"
          style={{ color: "Cornsilk", backgroundColor: "LightSalmon" }}
          onClick={handleRandom}
        >
          Crazy Random
        </button>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            fontSize: "1.3rem",
          }}
        >
          <label>
            Number of rows:{" "}
            <input
              type="number"
              name="xValue"
              value={xValue}
              onChange={(event) => handleXValueChange(event)}
            />
          </label>
          <label>
            Number of columns:{" "}
            <input
              type="number"
              name="yValue"
              value={yValue}
              onChange={(event) => handleYValueChange(event)}
            />
          </label>
        </form>
      </div>
      <div>
        <form>
          <label style={{ color: "Gainsboro", fontSize: "2.5rem" }}>
            Game Speed:{" "}
            <input
              style={{ fontSize: "2rem" }}
              type="number"
              name="gameSpeed"
              value={gameSpeed}
              onChange={(event) => handleGameSpeedChange(event)}
            />
          </label>
        </form>
      </div>
      <div>
        <p className="rules">
          1&#41; Any live cell with fewer than two live neighbours dies, as if
          by underpopulation.
          <br /> 2&#41; Any live cell with two or three live neighbours lives on
          to the next generation. <br />
          3&#41; Any live cell with more than three live neighbours dies, as if
          by overpopulation. <br />
          4&#41; Any dead cell with exactly three live neighbours becomes a live
          cell, as if by reproduction.
        </p>
      </div>
    </div>
  );
}
export default GameBoard;
