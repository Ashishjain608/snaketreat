import React, { useCallback, useEffect, useState } from "react";
import "./SnakeBoard.css";
import { getRandomTreat, getSnakePositions } from "./util";

const SnakeBoard = (props) => {
  let { boardSize, snakeLength } = props;

  let positions = getSnakePositions(snakeLength, boardSize);
  let head = positions[positions.length - 1];
  const [snakeStatus, setSnakeStatus] = useState({
    positions,
    head,
  });

  const [treat, setTreat] = useState(getRandomTreat(boardSize));

  let [gameOver, setGameOver] = useState(false);

  const isEatTreat = useCallback(
    (head) => {
      return head[0] === treat[0] && head[1] === treat[1];
    },
    [treat]
  );

  const checkIfSnakeBitItself = useCallback(
    (xcoordinate, ycordinate) => {
      let { positions } = snakeStatus;
      return positions.some((p) => p[0] === ycordinate && p[1] === xcoordinate);
    },
    [snakeStatus]
  );

  let handler = useCallback(
    (evt) => {
      //ArrowUp, ArrowDown, ArrowLeft, ArrowRight
      let { positions, head } = snakeStatus;
      let [headY, headX] = head;
      let newHead = new Array(2);
      newHead[0] = headY;
      newHead[1] = headX;
      //   let isGameOver = false;
      switch (evt.key) {
        case "ArrowUp":
          if (headY - 1 < 0 || checkIfSnakeBitItself(headX, headY - 1)) {
            setGameOver(true);
            break;
          }
          newHead[0] = headY - 1;
          break;
        case "ArrowDown":
          if (
            headY + 1 > boardSize - 1 ||
            checkIfSnakeBitItself(headX, headY + 1)
          ) {
            setGameOver(true);
            return;
            // break;
          }
          newHead[0] = headY + 1;
          break;
        case "ArrowLeft":
          if (headX - 1 < 0 || checkIfSnakeBitItself(headX - 1, headY)) {
            setGameOver(true);
            return;
          }
          newHead[1] = headX - 1;
          break;
        case "ArrowRight":
          if (
            headX + 1 > boardSize - 1 || //wall hit
            checkIfSnakeBitItself(headX + 1, headY) // if snake bit itself
          ) {
            setGameOver(true);
            return;
          }
          newHead[1] = headX + 1;
          break;

        default:
          return;
      }

      positions.push(newHead);

      if (isEatTreat(newHead)) {
        setTreat(getRandomTreat(boardSize));
      } else {
        positions = positions.slice(1);
      }
      setSnakeStatus({
        positions,
        head: newHead,
      });

      //   debugger;
    },
    [snakeStatus, isEatTreat, checkIfSnakeBitItself, boardSize]
  );

  useEffect(() => {
    document.addEventListener("keyup", handler);
    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, [handler]);

  const getBoard = () => {
    let board = [];

    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        let isSnake = snakeStatus.positions.some(
          (p) => p[0] === i && p[1] === j
        );
        let lastPostion =
          snakeStatus.positions[snakeStatus.positions.length - 1];
        let isHead = isSnake && lastPostion[0] === i && lastPostion[1] === j;

        let isTreat = treat[0] === i && treat[1] === j;

        row.push(
          <div className="cell">
            {isHead ? "H" : isSnake ? "--" : isTreat ? "T" : null}
          </div>
        );
      }
      board.push(row);
    }
    return board;
  };

  return (
    <div className="container">
      {gameOver && <div>GAME OVER</div>}
      {getBoard().map((row, i) => (
        <div className="row" key={i}>
          {row}
        </div>
      ))}
    </div>
  );
};

export default SnakeBoard;
