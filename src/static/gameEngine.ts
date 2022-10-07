import { playerBoardValues, opponentBoardValues } from './gameValues';

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
  calculatePlacementShift(input: string, orientation: 'vertical' | 'horizontal', board: number[], originCell: number, size: number) {
    const boardSize = Math.sqrt(board.length);
    let newOriginCell: number;
    switch (input) {
      case 'ArrowDown':
        newOriginCell = (originCell + boardSize) % board.length;
        break;
      case 'ArrowUp':
        newOriginCell = (originCell - boardSize) % board.length;
        if (newOriginCell < 0) newOriginCell = newOriginCell + board.length;
        break;
      case 'ArrowRight':
        newOriginCell = (originCell + 1) % board.length;
        break;
      case 'ArrowLeft':
        newOriginCell = (originCell - 1) % board.length;
        if (newOriginCell < 0) newOriginCell = newOriginCell + board.length;
        break;
      default:
        throw new Error('undefined keystroke');
    }
    console.log(newOriginCell);
    let shipCells: number[] = [];
    if (orientation === 'horizontal') {
      for (let i = 0; i < size; i++) {
        shipCells.push(newOriginCell + i);
      }
    } else {
      for (let i = 0; i < size; i++) {
        shipCells.push(newOriginCell + i * boardSize);
      }
    }
    if (shipCells.some((cell) => cell > board.length - 1)) return null;
    else return shipCells;
  },
};

export default gameEngine;
