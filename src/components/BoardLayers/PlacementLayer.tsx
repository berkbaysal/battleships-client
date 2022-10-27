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

const collidingStyleOverwrite: React.CSSProperties = { opacity: 0.8 };

const PlacementLayer = () => {
  const [placement, setPlacement] = useState<PlacementData>(INIT_STATE);
  const game = useGameContext();
  const boardSize = Math.sqrt(game.data.playerBoard.length);

  function handleKeydown(e: KeyboardEvent) {
    //HANDLE MOVEMENT
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const newShipCells = gameEngine.calculatePlacementShift(
        e.key,
        placement.orientation,
        boardSize,
        placement.originCell,
        ships.length
      );
      if (newShipCells) {
        setPlacement((oldData) => ({ ...oldData, originCell: newShipCells[0], shipCells: newShipCells }));
      }
    } else if (e.key === 'r') {
      const newShipCells = gameEngine.swapOrientationOfShipCells(placement.shipCells, boardSize, placement.orientation);
      setPlacement((oldData) => ({
        ...oldData,
        originCell: newShipCells[0],
        orientation: oldData.orientation === 'vertical' ? 'horizontal' : 'vertical',
        shipCells: newShipCells,
      }));
    }
  }
  function calculateGridPosition(): React.CSSProperties {
    const colStart = (placement.originCell % boardSize) + 1;
    const rowStart = Math.floor(placement.originCell / boardSize) + 1;
    const rowEnd = placement.orientation === 'vertical' ? rowStart + placement.shipCells.length : rowStart;
    const colEnd = placement.orientation === 'vertical' ? colStart : colStart + placement.shipCells.length;
    console.log(`${rowStart}/${colStart}/${rowEnd}/${colEnd}`);
    return {
      gridArea: `${rowStart}/${colStart}/${rowEnd}/${colEnd}`,
    };
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
  //////
  //ADD AND MANAGE EVENT LISTENERS
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [placement.orientation, placement.currentShipIndex, placement.shipCells, game.data.playerBoard]);
  /////////
  console.log(placement);
  return (
    <div className={style.placementLayer}>
      <img
        src={
          placement.orientation === 'horizontal'
            ? spritesHorizontal[placement.currentShipIndex]
            : spritesVertical[placement.currentShipIndex]
        }
        style={calculateGridPosition()}
        className={style.placementImage}
      />
    </div>
  );
};

export default PlacementLayer;
