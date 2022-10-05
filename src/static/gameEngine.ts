import boardValues from './boardValues';

const gameEngine = {
  initBoard: (size = 10) => {
    let board: number[] = [];
    for (let i = 0; i < Math.pow(size, 2); i++) {
      board.push(boardValues.empty);
    }
    return board;
  },
  placeTestShips: (board: number[] | undefined) => {
    let newBoard: number[] = [];
    if (board) newBoard = [...board];
    newBoard[0] = 1;
    newBoard[0] = 10;
    newBoard[0] = 20;
    return newBoard;
  },
};

export default gameEngine;
