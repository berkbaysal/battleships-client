import { useGameContext } from '../context/GameContext';
import style from '../styles/Board.module.scss';
import GameBoard from './GameBoard';
import PlacementBoard from './PlacementBoard';

interface BoardProps {
  boardData: number[];
  boardType: 'player' | 'opponent' | 'placement';
  subTextTop?: string;
  subTextBottom?: string;
}

const Board = ({ boardData, boardType, subTextTop, subTextBottom }: BoardProps) => {
  const cellsPerRow = Math.sqrt(boardData.length);
  const game = useGameContext();

  return (
    <div className={style.boardUI}>
      <div className={style.boardContainer}>
        <div className={style.board} style={{ gridTemplateColumns: `repeat(${cellsPerRow},1fr)` }}>
          {boardType === 'placement' && <PlacementBoard />}
          {boardType !== 'placement' && <GameBoard boardData={boardData} boardType={boardType} />}
        </div>
      </div>
      {subTextTop && <div className={style.subTextTop}>{subTextTop}</div>}
      {subTextBottom && <div className={style.subTextBottom}>{subTextBottom}</div>}
    </div>
  );
};

export default Board;
