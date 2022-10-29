import { playerBoardValues, opponentBoardValues, server } from './gameValues';
import sprites from './sprites';
import { Game, ShipValues } from './interfaces';

const gameEngine = {
  initBoard(size = 10) {
    let board: number[] = [];
    for (let i = 0; i < Math.pow(size, 2); i++) {
      board.push(playerBoardValues.empty);
    }
    return board;
  },
  createTestBoard() {
    let board = this.initBoard();
    const boardSize = Math.sqrt(board.length);
    for (let i = 0; i < playerBoardValues.ship.length; i++) {
      const shipCells = [];
      for (let j = 0; j < playerBoardValues.ship[i].values.length; j++) {
        shipCells.push(j * boardSize + i);
      }
      board = this.placeShips(board, shipCells, i);
    }
    return board;
  },
  createTestPlacedShips(boardSize = 10) {
    let placedShips: {
      orientation: 'vertical' | 'horizontal';
      placementStyle: React.CSSProperties;
    }[] = [];
    for (let i = 0; i < playerBoardValues.ship.length; i++) {
      const shipCells = [];
      for (let j = 0; j < playerBoardValues.ship[i].values.length; j++) {
        shipCells.push(j * boardSize + i);
      }
      placedShips.push({
        orientation: 'vertical',
        placementStyle: this.calculateSpriteGridPosition(shipCells, 'vertical', boardSize),
      });
    }
    return placedShips;
  },
  damageTestBoard(board: number[], numberOfAttacks = 25) {
    let newBoard: number[] = [];
    let attackedSquares: number[] = [];
    const validShipValues = this.getValidShipValues();
    while (attackedSquares.length < numberOfAttacks) {
      const randomCell = Math.floor(Math.random() * 100);
      if (attackedSquares.includes(randomCell)) continue;
      else attackedSquares.push(randomCell);
    }
    for (let i = 0; i < board.length; i++) {
      if (attackedSquares.includes(i)) {
        if (validShipValues.includes(board[i])) {
          newBoard.push(playerBoardValues.shipWreck);
        } else newBoard.push(playerBoardValues.missedShot);
      } else newBoard.push(board[i]);
    }
    return newBoard;
  },
  getInitialGameState(debugMode = ''): Game {
    switch (debugMode) {
      case 'placement':
        return {
          clientId: null,
          roomName: 'test',
          clientIsHost: true,
          gameState: 'placement',
          activeMenu: 'welcome',
          opponentGameState: 'placement',
          turn: '',
          opponent: null,
          playerBoard: gameEngine.initBoard(),
          opponentBoard: gameEngine.initBoard(),
          selectedCell: null,
          activeGame: true,
          winner: null,
          errorMessage: '',
          placedShips: [],
        };
      case 'start':
        return {
          clientId: 'player',
          roomName: 'test',
          clientIsHost: true,
          gameState: 'active',
          activeMenu: 'welcome',
          opponentGameState: 'active',
          turn: 'player',
          opponent: 'opponent',
          playerBoard: this.createTestBoard(),
          opponentBoard: gameEngine.initBoard(),
          selectedCell: null,
          activeGame: true,
          winner: null,
          errorMessage: '',
          placedShips: this.createTestPlacedShips(),
        };
      case 'midgame':
        return {
          clientId: 'player',
          roomName: 'test',
          clientIsHost: true,
          gameState: 'active',
          activeMenu: 'welcome',
          opponentGameState: 'active',
          turn: 'player',
          opponent: 'opponent',
          playerBoard: this.damageTestBoard(this.createTestBoard()),
          opponentBoard: gameEngine.initBoard(),
          selectedCell: null,
          activeGame: true,
          winner: null,
          errorMessage: '',
          placedShips: this.createTestPlacedShips(),
        };
      default:
        return {
          clientId: null,
          roomName: null,
          clientIsHost: false,
          gameState: 'inactive',
          activeMenu: 'welcome',
          opponentGameState: null,
          turn: '',
          opponent: null,
          playerBoard: [],
          opponentBoard: [],
          selectedCell: null,
          activeGame: false,
          winner: null,
          errorMessage: '',
          placedShips: [],
        };
    }
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
  getCellStyle(
    boardType: 'player' | 'opponent',
    cellValue: number,
    collision: boolean = false,
    orientation: 'vertical' | 'horizontal' = 'vertical'
  ) {
    let style: React.CSSProperties = {};

    if (boardType === 'player') {
      switch (cellValue) {
        case playerBoardValues.empty:
          style.backgroundColor = 'blue';
          break;
        case 999: //playerBoardValues.placingShip:
          style.backgroundColor = collision ? 'red' : 'yellow';
          break;
        case 999: //playerBoardValues.placingShipCollides:
          style.backgroundColor = 'red';
          break;
        case playerBoardValues.shipWreck:
          style.backgroundColor = 'red';
          break;
        case playerBoardValues.missedShot:
          style.backgroundColor = 'yellow';
          break;
        default:
          style = this.spriteStyleConstructor(cellValue, orientation);
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
  calculateSpriteGridPosition(
    shipCells: number[],
    orientation: 'vertical' | 'horizontal',
    boardSize: number
  ): React.CSSProperties {
    const originCell = shipCells[0];
    const colStart = (originCell % boardSize) + 1;
    const rowStart = Math.floor(originCell / boardSize) + 1;
    const rowEnd = orientation === 'vertical' ? rowStart + shipCells.length : rowStart;
    const colEnd = orientation === 'vertical' ? colStart : colStart + shipCells.length;
    return {
      gridArea: `${rowStart}/${colStart}/${rowEnd}/${colEnd}`,
    };
  },
  calculatePlacementShift(
    input: string,
    orientation: 'vertical' | 'horizontal',
    boardSize: number,
    originCell: number,
    size: number
  ) {
    let newOriginCell: number;
    switch (input) {
      case 'ArrowDown':
        newOriginCell = originCell + boardSize;
        if (newOriginCell > Math.pow(boardSize, 2) - 1) {
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
    if (shipCells.some((cell) => cell > Math.pow(boardSize, 2) - 1)) return null;
    else return shipCells;
  },
  swapOrientationOfShipCells(shipCells: number[], boardSize: number, currentOrientation: 'vertical' | 'horizontal') {
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
    return this.adjustForOutOfBounds(newShipCells, boardSize, currentOrientation);
  },
  adjustForOutOfBounds(shipCells: number[], boardSize: number, currentOrientation: 'vertical' | 'horizontal') {
    let newShipCells: number[] = [];
    let adjustmentAmount = 0;
    if (currentOrientation === 'horizontal' && shipCells.some((cell) => cell >= Math.pow(boardSize, 2))) {
      shipCells.forEach((cell) => {
        if (cell >= Math.pow(boardSize, 2)) adjustmentAmount++;
      });
      newShipCells = shipCells.map((cell) => cell - boardSize * adjustmentAmount);
      return newShipCells;
    } else if (currentOrientation === 'vertical' && shipCells.some((cell, index) => cell % boardSize === 0 && index !== 0)) {
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
  placeShips(board: number[], shipCells: number[], currentShipIndex: number) {
    const shipValues = playerBoardValues.ship[currentShipIndex].values;
    let shipCellIndex = 0;
    let newBoard = board.map((cell, index) => {
      if (shipCells.includes(index)) {
        return shipValues[shipCellIndex++];
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
    return playerBoard.every((cell) => !this.getValidShipValues().includes(cell));
  },
  async checkIfRoomExists(roomName: string) {
    const res = await fetch(`${server}checkRoom?roomName=${roomName}`);
    const json: ServerResponseRoomCheck = await res.json();
    return json.roomExists;
  },
  formatRoomName(roomName: string) {
    let formattedString = roomName.toLowerCase();
    formattedString = formattedString[0].toUpperCase() + formattedString.slice(1);
    return formattedString;
  },
  spriteStyleConstructor(code: number, orientation: 'vertical' | 'horizontal') {
    const rotated = orientation === 'horizontal';
    let part = 0;
    let shipName = '';
    let relevantValues: null | ShipValues[] = null;
    let placementStage = false;

    if (this.getValidShipValues().includes(code)) relevantValues = playerBoardValues.ship;
    else if (this.getValidPlacingShipValues().includes(code)) {
      relevantValues = playerBoardValues.placingShip;
      placementStage = true;
    }

    if (relevantValues !== null) {
      relevantValues.forEach((shipType) => {
        if (shipType.values.includes(code)) {
          shipName = shipType.shipName;
          shipType.values.forEach((value, index) => {
            if (value === code) part = index;
          });
        }
      });
      let shipParts = sprites.filter((shipType) => shipType.shipName === shipName)[0].parts;
      return {
        backgroundImage: `url(${shipParts[part]})`,
        transform: placementStage ? `rotate(${rotated ? '-90deg' : '0deg'})` : '',
      };
    }
    return {};
  },
  getValidShipValues() {
    let validShipValues: number[] = [];
    playerBoardValues.ship.forEach((shipType) => shipType.values.forEach((value) => validShipValues.push(value)));
    return validShipValues;
  },
  getValidPlacingShipValues() {
    let placingShipValues: number[] = [];
    playerBoardValues.placingShip.forEach((shipType) => shipType.values.forEach((value) => placingShipValues.push(value)));
    return placingShipValues;
  },
  getAllValidShipValues() {
    return [...this.getValidShipValues(), ...this.getValidPlacingShipValues()];
  },
};

export default gameEngine;

interface ServerResponseRoomCheck {
  roomExists: boolean;
}
