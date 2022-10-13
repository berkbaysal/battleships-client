import { playerBoardValues, opponentBoardValues } from './gameValues';

const gameEngine = {
  initBoard: (size = 10) => {
    let board: number[] = [];
    for (let i = 0; i < Math.pow(size, 2); i++) {
      board.push(playerBoardValues.empty);
    }
    return board;
  },
  changeCellValue(array: number[], cell: number, newValue: number) {
    let newArray = array.map((value, index) => {
      if (index === cell) {
        return newValue;
      } else {
        return value;
      }
    });
    return newArray;
  },
  getCellStyle(boardType: 'player' | 'opponent', cellValue: number, collision: boolean = false) {
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
          style.backgroundColor = collision ? 'red' : 'yellow';
          break;
        case playerBoardValues.placingShipCollides:
          style.backgroundColor = 'red';
          break;
        case playerBoardValues.shipWreck:
          style.backgroundColor = 'red';
          break;
        case playerBoardValues.missedShot:
          style.backgroundColor = 'yellow';
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
  calculatePlacementShift(
    input: string,
    orientation: 'vertical' | 'horizontal',
    board: number[],
    originCell: number,
    size: number
  ) {
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
        newOriginCell = originCell - 1;
        if (originCell % boardSize === 0) {
          newOriginCell = originCell;
        }
        break;
      default:
        throw new Error('undefined keystroke');
    }
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
  swapOrientationOfShipCells(shipCells: number[], board: number[], currentOrientation: 'vertical' | 'horizontal') {
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
    return this.adjustForOutOfBounds(newShipCells, board, currentOrientation);
  },
  adjustForOutOfBounds(shipCells: number[], board: number[], currentOrientation: 'vertical' | 'horizontal') {
    const boardSize = Math.sqrt(board.length);
    let newShipCells: number[] = [];
    let adjustmentAmount = 0;
    if (currentOrientation === 'horizontal' && shipCells.some((cell) => cell >= board.length)) {
      shipCells.forEach((cell) => {
        if (cell >= board.length) adjustmentAmount++;
      });
      newShipCells = shipCells.map((cell) => cell - boardSize * adjustmentAmount);
      return newShipCells;
    } else if (currentOrientation == 'vertical' && shipCells.some((cell, index) => cell % boardSize === 0 && index !== 0)) {
      shipCells.forEach((cell, index) => {
        if (cell % boardSize === 0) {
          adjustmentAmount = shipCells.length - index;
        }
      });
      newShipCells = shipCells.map((cell) => cell - adjustmentAmount);
      return newShipCells;
    } else {
      return shipCells;
    }
  },
  placeShips(board: number[], shipCells: number[]) {
    let newBoard = board.map((cell, index) => {
      if (shipCells.includes(index)) {
        return playerBoardValues.ship;
      } else {
        return cell;
      }
    });
    return newBoard;
  },
  checkCollision(board: number[], shipCells: number[]) {
    let collision = false;
    for (let i = 0; i < shipCells.length; i++) {
      let boardIndex = shipCells[i];
      if (board[boardIndex] !== playerBoardValues.empty) {
        collision = true;
        break;
      }
    }
    return collision;
  },
  isGameLost(playerBoard: number[]) {
    return playerBoard.every((cell) => cell !== playerBoardValues.ship);
  },
};

export default gameEngine;
