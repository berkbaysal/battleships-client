import { playerBoardValues } from '../../static/gameValues';
import style from '../../styles/Board.module.scss';
import { useState, useEffect } from 'react';
import { useGameContext } from '../../context/GameContext';
import gameEngine from '../../static/gameEngine';
import { spritesHorizontal, spritesVertical } from '../../static/gameValues';

const ships = playerBoardValues.placingShip;

interface PlacementData {
  originCell: number;
  shipCells: number[];
  orientation: 'vertical' | 'horizontal';
  colliding: boolean;
  currentShipIndex: number;
}

const INIT_STATE: PlacementData = {
  originCell: 0,
  shipCells: [],
  orientation: 'vertical',
  colliding: false,
  currentShipIndex: 0,
};

const PlacementLayer = () => {
  const [placement, setPlacement] = useState<PlacementData>(INIT_STATE);
  const game = useGameContext();
  const boardSize = Math.sqrt(game.data.playerBoard.length);

  //HANDLE MOVEMENT
  function handleKeydown(e: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const shipCells = gameEngine.calculatePlacementShift(
        e.key,
        placement.orientation,
        boardSize,
        placement.originCell,
        ships[placement.currentShipIndex].values.length
      );
      if (shipCells) {
        setPlacement((oldData) => ({
          ...oldData,
          originCell: shipCells[0],
          shipCells: shipCells,
          colliding: gameEngine.checkCollision(game.data.playerBoard, shipCells),
        }));
      }
    } else if (e.key === 'r') {
      const shipCells = gameEngine.swapOrientationOfShipCells(placement.shipCells, boardSize, placement.orientation);
      setPlacement((oldData) => ({
        ...oldData,
        originCell: shipCells[0],
        orientation: oldData.orientation === 'vertical' ? 'horizontal' : 'vertical',
        shipCells: shipCells,
        colliding: gameEngine.checkCollision(game.data.playerBoard, shipCells),
      }));
    } else if (e.key === 'Enter') {
      if (!placement.colliding) {
        placeShip();
      }
    }
  }

  //HANDLE CONFIRMING PLACEMENT
  function placeShip() {
    const updatedBoard = gameEngine.placeShips(game.data.playerBoard, placement.shipCells, placement.currentShipIndex);
    game.updateData({
      playerBoard: updatedBoard,
      placedShips: [
        ...game.data.placedShips,
        {
          orientation: placement.orientation,
          placementStyle: gameEngine.calculateSpriteGridPosition(placement.shipCells, placement.orientation, boardSize),
        },
      ],
    });
    advancePlacement(updatedBoard);
  }

  //HANDLE ADVANCING PLACEMENT OR GAME STAGE
  function advancePlacement(updatedBoard: number[]) {
    if (placement.currentShipIndex + 1 === ships.length) {
      game.completePlacement();
    } else {
      let shipCells: number[] = [];
      for (let i = 0; i < ships[placement.currentShipIndex + 1].values.length; i++) {
        shipCells.push(i * boardSize);
      }
      setPlacement((oldData) => ({
        ...oldData,
        originCell: 0,
        shipCells: shipCells,
        orientation: 'vertical',
        currentShipIndex: oldData.currentShipIndex + 1,
        colliding: gameEngine.checkCollision(updatedBoard, shipCells),
      }));
    }
  }

  //INITIALIZE
  useEffect(() => {
    let shipCells: number[] = [];
    for (let i = 0; i < ships[placement.currentShipIndex].values.length; i++) {
      shipCells.push(i * boardSize);
    }
    const colliding = gameEngine.checkCollision(game.data.playerBoard, shipCells);
    setPlacement((oldData) => ({ ...oldData, shipCells: shipCells, colliding: colliding }));
  }, []);

  //ADD AND MANAGE EVENT LISTENERS
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [placement.orientation, placement.currentShipIndex, placement.shipCells, game.data.playerBoard]);

  return (
    <div className={style.boardLayer}>
      {placement.orientation === 'horizontal' && (
        <img
          src={spritesHorizontal[placement.currentShipIndex]}
          style={gameEngine.calculateSpriteGridPosition(placement.shipCells, placement.orientation, boardSize)}
          className={`${style.placingShipSprite} ${placement.colliding ? style.placementCollides : ''}`}
        />
      )}
      {placement.orientation === 'vertical' && (
        <img
          src={spritesVertical[placement.currentShipIndex]}
          style={gameEngine.calculateSpriteGridPosition(placement.shipCells, placement.orientation, boardSize)}
          className={`${style.placingShipSprite} ${placement.colliding ? style.placementCollides : ''}`}
        />
      )}
    </div>
  );
};

export default PlacementLayer;
