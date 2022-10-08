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
        case playerBoardValues.placingShip:
          style.backgroundColor = 'yellow';
          break;
        case playerBoardValues.placingShipCollides:
          style.backgroundColor = 'red';
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
        newOriginCell = originCell + boardSize;
        if (newOriginCell > board.length - 1) {
          newOriginCell = originCell;
        }
        break;
      case 'ArrowUp':
        newOriginCell = originCell - boardSize;
        if (newOriginCell < 0) newOriginCell = originCell;
        break;
      case 'ArrowRight':
        newOriginCell = originCell + 1;
        if ((newOriginCell % boardSize) + size > boardSize && orientation === 'horizontal') {
          newOriginCell = originCell;
        } else if (newOriginCell % boardSize === 0 && orientation === 'vertical') {
          newOriginCell = originCell;
        }
        break;
      case 'ArrowLeft':
        if (originCell % boardSize === 0 && orientation === 'vertical') {
          newOriginCell = (originCell + boardSize - 1) % board.length;
        } else if (originCell % boardSize === 0 && orientation === 'horizontal') {
          newOriginCell = originCell;
        } else newOriginCell = (originCell - 1) % board.length;
        if (newOriginCell < 0) newOriginCell = originCell;
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
    console.log(shipCells);
    if (shipCells.some((cell) => cell > board.length - 1)) return null;
    else return shipCells;
  },
  swapOrientationOfShipCells(shipCells: number[], board: number[], currentOrientation: 'vertical' | 'horizontal') {
    console.log(shipCells, board, currentOrientation);
    const boardSize = Math.sqrt(board.length);
    const originCell = shipCells[0];
    let newShipCells = [];
    if (currentOrientation === 'vertical') {
      for (let i = 0; i < shipCells.length; i++) {
        newShipCells.push(originCell + i);
      }
    } else {
      for (let i = 0; i < shipCells.length; i++) {
        newShipCells.push(originCell + i * boardSize);
      }
    }
    return newShipCells;
  },
  willRotationBeOutOfBounds() {},
};

export default gameEngine;
