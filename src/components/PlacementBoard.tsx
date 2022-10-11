import { useEffect, useState } from 'react';
import gameEngine from '../static/gameEngine';
import style from '../styles/Board.module.css';
import { ships } from '../static/gameValues';
import { playerBoardValues } from '../static/gameValues';
import { useGameContext } from '../context/GameContext';

interface PlacementBoardProps {
  boardData: number[];
}

interface PlacementInterface {
  orientation: 'vertical' | 'horizontal';
  originCell: number;
  size: number;
  colliding: boolean;
  currentShipIndex: number;
  shipCells: number[];
  placementBoard: number[];
}

const INITIAL_PLACEMENT_STATE: PlacementInterface = {
  orientation: 'vertical',
  originCell: 0,
  size: ships[0].size,
  colliding: false,
  currentShipIndex: 0,
  shipCells: [0, 10, 20, 30, 40],
  placementBoard: [],
};

const PlacementBoard = () => {
  const game = useGameContext();
  const [placement, setPlacement] = useState<PlacementInterface>({
    ...INITIAL_PLACEMENT_STATE,
    placementBoard: game.data.playerBoard ? game.data.playerBoard : [],
  });

  const isThereCollision = gameEngine.checkCollision(game.data.playerBoard ? game.data.playerBoard : [], placement.shipCells);

  function handleKeydown(e: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const newShipCells = gameEngine.calculatePlacementShift(
        e.key,
        placement.orientation,
        placement.placementBoard,
        placement.originCell,
        placement.size
      );
      if (newShipCells) {
        setPlacement((oldData) => ({ ...oldData, originCell: newShipCells[0], shipCells: newShipCells }));
        updatePlacementBoard(newShipCells);
      }
    } else if (e.key === 'r') {
      const newShipCells = gameEngine.swapOrientationOfShipCells(
        placement.shipCells,
        placement.placementBoard,
        placement.orientation
      );
      setPlacement((oldData) => ({
        ...oldData,
        originCell: newShipCells[0],
        orientation: oldData.orientation === 'vertical' ? 'horizontal' : 'vertical',
        shipCells: newShipCells,
      }));
      updatePlacementBoard(newShipCells);
    } else if (e.key === 'Enter') {
      if (isThereCollision) return;
      const updatedBoard = gameEngine.placeShips(placement.placementBoard, placement.shipCells);
      if (placement.currentShipIndex + 1 === ships.length) {
        game.updateData({ playerBoard: [...updatedBoard], gameState: 'active' });
      } else {
        game.updateData({ playerBoard: [...updatedBoard] });
        advancePlacement(updatedBoard);
      }
    }
  }

  function updatePlacementBoard(shipCells: number[]) {
    setPlacement((oldBoard) => ({
      ...oldBoard,
      placementBoard: oldBoard.placementBoard.map((cell, index) => {
        if (shipCells.includes(index)) {
          return playerBoardValues.placingShip;
        } else if (!shipCells.includes(index) && cell === playerBoardValues.placingShip && game.data.playerBoard) {
          return game.data.playerBoard[index];
        } else {
          return cell;
        }
      }),
    }));
  }

  function advancePlacement(newBoard: number[]) {
    const boardSize = Math.sqrt(placement.placementBoard.length);
    const newIndex = placement.currentShipIndex + 1;
    const newSize = ships[newIndex].size;
    let newShipCells: number[] = [];
    for (let i = 0; i < newSize; i++) {
      newShipCells.push(i * boardSize);
    }
    setPlacement((oldData) => ({
      ...oldData,
      currentShipIndex: newIndex,
      size: newSize,
      orientation: 'vertical',
      shipCells: newShipCells,
      originCell: 0,
      placementBoard: newBoard,
    }));
    updatePlacementBoard(newShipCells);
  }

  useEffect(() => {
    function init() {
      updatePlacementBoard(placement.shipCells);
    }
    init();
    updatePlacementBoard(placement.shipCells);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [placement.orientation, placement.currentShipIndex, placement.placementBoard, placement.shipCells, game.data.playerBoard]);

  console.log('collision: ', isThereCollision);
  return (
    <>
      {placement.placementBoard.map((cellValue, index) => {
        return (
          <div
            className={`${style.cell}`}
            key={'cell-' + index}
            style={{ ...gameEngine.getCellStyle('player', cellValue, isThereCollision) }}
          ></div>
        );
      })}
    </>
  );
};

export default PlacementBoard;
