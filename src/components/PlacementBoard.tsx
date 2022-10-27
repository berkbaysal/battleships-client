import { useEffect, useState } from 'react';
import gameEngine from '../static/gameEngine';
import style from '../styles/Board.module.scss';
import { ships } from '../static/gameValues';
import { playerBoardValues } from '../static/gameValues';
import { useGameContext } from '../context/GameContext';
import { PlacementInterface } from '../static/interfaces';

const INITIAL_PLACEMENT_STATE: PlacementInterface = {
  orientation: 'vertical',
  originCell: 0,
  size: ships[0].size,
  colliding: false,
  currentShipIndex: 0,
  shipCells: [],
  placementBoard: [],
};

const PlacementBoard = () => {
  const game = useGameContext();
  const [placement, setPlacement] = useState<PlacementInterface>({
    ...INITIAL_PLACEMENT_STATE,
    placementBoard: game.data.playerBoard,
  });

  const isThereCollision = gameEngine.checkCollision(game.data.playerBoard, placement.shipCells);

  function handleKeydown(e: KeyboardEvent) {
    //HANDLE MOVEMENT
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const newShipCells = gameEngine.calculatePlacementShift(
        e.key,
        placement.orientation,
        placement.placementBoard.length,
        placement.originCell,
        placement.size
      );
      if (newShipCells) {
        setPlacement((oldData) => ({ ...oldData, originCell: newShipCells[0], shipCells: newShipCells }));
        updatePlacementBoard(newShipCells);
      }
    }

    //HANDLE ROTATION
    else if (e.key === 'r') {
      const newShipCells = gameEngine.swapOrientationOfShipCells(
        placement.shipCells,
        placement.placementBoard.length,
        placement.orientation
      );
      setPlacement((oldData) => ({
        ...oldData,
        originCell: newShipCells[0],
        orientation: oldData.orientation === 'vertical' ? 'horizontal' : 'vertical',
        shipCells: newShipCells,
      }));
      updatePlacementBoard(newShipCells);
    }

    //HANDLE SELECTION
    else if (e.key === 'Enter') {
      if (isThereCollision) return;
      const updatedBoard = gameEngine.placeShips(placement.placementBoard, placement.shipCells, placement.currentShipIndex);
      if (placement.currentShipIndex + 1 === ships.length) {
        //CHECK IF ITS LAST SHIP BEING PLACED, START GAME IF IT IS
        game.updateData({ playerBoard: [...updatedBoard] });
        game.completePlacement();
      } else {
        game.updateData({ playerBoard: [...updatedBoard] });
        advancePlacement(updatedBoard);
      }
    }
  }

  //USE NEW SHIPCELLS DATA TO UPDATE LOCAL STATE
  function updatePlacementBoard(shipCells: number[]) {
    let currentShipPart = 0;
    const shipCodes = playerBoardValues.placingShip[placement.currentShipIndex].values;
    const newBoard = placement.placementBoard.map((cell, index) => {
      //if index cell is currently being placed
      if (shipCells.includes(index)) {
        return shipCodes[currentShipPart++];
      } else if (!shipCells.includes(index) && gameEngine.getValidPlacingShipValues().includes(cell)) {
        return game.data.playerBoard[index];
      } else {
        return cell;
      }
    });

    setPlacement((oldData) => ({
      ...oldData,
      placementBoard: newBoard,
    }));
  }

  //MOVE ON TO NEXT SHIP PLACEMENT
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

  //INITIALIZE SHIP PLACEMENT
  useEffect(() => {
    let shipCells: number[] = [];
    const boardSize = Math.sqrt(placement.placementBoard.length);
    for (let i = 0; i < placement.size; i++) {
      shipCells.push(i * boardSize);
    }
    updatePlacementBoard(shipCells);
    setPlacement((oldData) => ({ ...oldData, shipCells: shipCells }));
  }, []);

  //SET AND CLEAN UP KEYDOWN EVENT LISTENERS ON RELEVANT UPDATES
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [placement.orientation, placement.currentShipIndex, placement.placementBoard, placement.shipCells, game.data.playerBoard]);

  console.log(placement.placementBoard);
  return (
    <>
      {placement.placementBoard.map((cellValue, index) => {
        return (
          <div
            className={`${style.cell}`}
            key={'cell-' + index}
            style={{ ...gameEngine.getCellStyle('player', cellValue, isThereCollision, placement.orientation) }}
          ></div>
        );
      })}
    </>
  );
};

export default PlacementBoard;
