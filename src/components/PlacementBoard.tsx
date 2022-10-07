import { useEffect, useState } from 'react';
import gameEngine from '../static/gameEngine';
import style from '../styles/Board.module.css';

interface PlacementBoardProps {
  boardData: number[];
}

interface PlacementInterface {
  orientation: 'vertical' | 'horizontal';
  originCell: number;
  size: number;
  colliding: boolean;
}

const INITIAL_PLACEMENT_STATE: PlacementInterface = { orientation: 'vertical', originCell: 0, size: 2, colliding: false };

const PlacementBoard = ({ boardData }: PlacementBoardProps) => {
  const [placement, setPlacement] = useState<PlacementInterface>(INITIAL_PLACEMENT_STATE);

  function handleKeydown(e: KeyboardEvent) {
    console.log(gameEngine.calculatePlacementShift(e.key, placement.orientation, boardData, placement.originCell, placement.size));
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <>
      {boardData.map((cellValue, index) => {
        return <div className={`${style.cell}`} key={'cell-' + index} style={gameEngine.getCellStyle('player', cellValue)}></div>;
      })}
    </>
  );
};

export default PlacementBoard;
