import { playerBoardValues, opponentBoardValues } from './boardValues';

const gameEngine = {
  initBoard: (size = 10) => {
    let board: number[] = [];
    for (let i = 0; i < Math.pow(size, 2); i++) {
      board.push(playerBoardValues.empty);
    }
    return board;
  },
  placeTestShips: (board: number[] | undefined) => {
    console.log(board);
    let newBoard: number[] = [];
    if (board) newBoard = [...board];
    newBoard[0] = 1;
    newBoard[10] = 1;
    newBoard[20] = 1;
    return newBoard;
  },
  changeCellValue(array: number[], cell: number, newValue: number) {
    let newArray = array.map((value, index) => {
      if (index === cell) {
        return newValue;
      } else {
        return value;
      }
    });
    console.log(newArray);
    return newArray;
  },
  getCellStyle(boardType: 'player' | 'opponent', cellValue: number) {
    let style = { backgroundColor: '' };

    if (boardType === 'player') {
      switch (cellValue) {
        case playerBoardValues.empty:
          style.backgroundColor = 'blue';
          break;
        case playerBoardValues.ship:
          style.backgroundColor = 'gray';
          break;
      }
    } else {
      switch (cellValue) {
        case opponentBoardValues.unknown:
          style.backgroundColor = 'blue';
          break;
        case opponentBoardValues.hit:
          style.backgroundColor = 'red';
          break;
        case opponentBoardValues.missed:
          style.backgroundColor = 'yellow';
          break;
      }
    }

    return style;
  },
};

export default gameEngine;
