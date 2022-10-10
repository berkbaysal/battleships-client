import { useEffect, useState } from 'react';
import gameEngine from '../static/gameEngine';
import style from '../styles/Board.module.css';
import { ships } from '../static/gameValues';
import { playerBoardValues } from '../static/gameValues';

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

const PlacementBoard = ({ boardData }: PlacementBoardProps) => {
  const [placement, setPlacement] = useState<PlacementInterface>({ ...INITIAL_PLACEMENT_STATE, placementBoard: boardData });

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
      const newShipCells = gameEngine.swapOrientationOfShipCells(placement.shipCells, placement.placementBoard, placement.orientation);
      console.log(newShipCells);
      setPlacement((oldData) => ({
        ...oldData,
        originCell: newShipCells[0],
        orientation: oldData.orientation === 'vertical' ? 'horizontal' : 'vertical',
        shipCells: newShipCells,
      }));
      updatePlacementBoard(newShipCells);
    }
  }

  function updatePlacementBoard(shipCells: number[]) {
    setPlacement((oldBoard) => ({
      ...oldBoard,
      placementBoard: oldBoard.placementBoard.map((cell, index) => {
        if (shipCells.includes(index)) {
          return playerBoardValues.placingShip;
        } else if (!shipCells.includes(index) && cell === playerBoardValues.placingShip) {
          return boardData[index];
        } else {
          return cell;
        }
      }),
    }));
  }

  useEffect(() => {
    function init() {
      updatePlacementBoard(placement.shipCells);
      console.log(placement.placementBoard);
    }
    init();
    updatePlacementBoard(placement.shipCells);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [placement.originCell, placement.placementBoard, placement.orientation]);
  console.log(placement.orientation);
  return (
    <>
      {placement.placementBoard.map((cellValue, index) => {
        return <div className={`${style.cell}`} key={'cell-' + index} style={gameEngine.getCellStyle('player', cellValue)}></div>;
      })}
    </>
  );
};

export default PlacementBoard;
