import { useGameContext } from '../context/GameContext';
import style from '../styles/Board.module.scss';
import GameBoard from './GameBoard';
import PlacementBoard from './PlacementBoard';

interface BoardProps {
  boardData: number[];
  boardType: 'player' | 'opponent' | 'placement';
}

const Board = ({ boardData, boardType }: BoardProps) => {
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
      {game.data.gameState === 'placement' && <div className={style.underBoardText}>Place your pieces.</div>}
    </div>
  );
};

export default Board;
