import { useGameContext } from '../context/GameContext';
import style from '../styles/Board.module.scss';
import BackgroundLayer from './BoardLayers/BackgroundLayer';
import PlacementLayer from './BoardLayers/PlacementLayer';
import ShipsLayer from './BoardLayers/ShipsLayer';
import GameBoard from './GameBoard';
import PlacementBoard from './PlacementBoard';

interface BoardProps {
  boardType: 'player' | 'opponent' | 'placement';
  subTextTop?: string;
  subTextBottom?: string;
  className?: string;
}

const Board = ({ boardType, subTextTop, subTextBottom, className = '' }: BoardProps) => {
  return (
    <div className={className}>
      <div className={style.boardContainer}>
        <div className={style.board}>
          {boardType === 'placement' && (
            <>
              <BackgroundLayer />
              <ShipsLayer />
              <PlacementLayer />
            </>
          )}
          {boardType === 'player' && (
            <>
              <BackgroundLayer />
              <ShipsLayer />
              <PlacementLayer />
            </>
          )}
        </div>
      </div>
      {subTextTop && <div className={style.subTextTop}>{subTextTop}</div>}
      {subTextBottom && <div className={style.subTextBottom}>{subTextBottom}</div>}
    </div>
  );
};

export default Board;
