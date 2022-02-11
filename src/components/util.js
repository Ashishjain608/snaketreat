export const getSnakePositions = (snakeLength, boardSize) => {
  let position = [[0, 0]];
  let x = 0,
    y = 0;
  let count = 1;
  while (count < snakeLength) {
    if (x < boardSize) {
      x++;
      position.push([x, y]);
      count++;
    } else {
      y++;
      position.push([x, y]);
      count++;
    }
  }
  return position;
};

export const getTreatsPositions = (boardSize) => {
  let treats = [];
  for (let i = 0; i < Math.floor(boardSize / 2); i++) {
    let x = Math.floor(Math.random() * boardSize);
    let y = Math.floor(Math.random() * boardSize);
    treats.push([x, y]);
  }
  return treats;
};

export const getRandomTreat = (boardSize) => {
    return [Math.floor(Math.random()*boardSize), Math.floor(Math.random()*boardSize)]
}
