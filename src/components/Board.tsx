import style from '../styles/Board.module.scss';
import BackgroundLayer from './BoardLayers/BackgroundLayer';
import DamageLayer from './BoardLayers/DamageLayer';
import GridLayer from './BoardLayers/GridLayer';
import PlacementLayer from './BoardLayers/PlacementLayer';
import ShipsLayer from './BoardLayers/ShipsLayer';
import TargetingLayer from './BoardLayers/TargetingLayer';

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
              <GridLayer />
              <ShipsLayer />
              <PlacementLayer />
            </>
          )}
          {boardType === 'player' && (
            <>
              <BackgroundLayer />
              <GridLayer />
              <ShipsLayer />
              <DamageLayer boardType="player" />
            </>
          )}
          {boardType === 'opponent' && (
            <>
              <BackgroundLayer />
              <DamageLayer boardType="opponent" />
              <GridLayer />
              <TargetingLayer />
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
