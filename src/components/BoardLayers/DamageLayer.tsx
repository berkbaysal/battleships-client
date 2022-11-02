import { useGameContext } from '../../context/GameContext';
import style from '../../styles/Board.module.scss';
import { opponentBoardValues, playerBoardValues, targetingSprites } from '../../static/gameValues';

interface DamageLayerProps {
  boardType: 'player' | 'opponent';
}

const DamageLayer = ({ boardType }: DamageLayerProps) => {
  const game = useGameContext();
  const boardSize = Math.sqrt(game.data.playerBoard.length);

  return (
    <div className={style.boardLayer}>
      {boardType === 'player' && (
        <>
          {game.data.playerBoard.map((cell, index) => {
            if (cell === playerBoardValues.shipWreck) {
              return (
                <div className={style.cell}>
                  <img className={style.damageSprite} src={targetingSprites.damage} />
                </div>
              );
            } else if (cell === playerBoardValues.missedShot) {
              return (
                <div className={style.cell}>
                  <img className={style.damageSprite} src={targetingSprites.miss} />
                </div>
              );
            } else {
              return <div className={style.cell}></div>;
            }
          })}
        </>
      )}
      {boardType === 'opponent' && (
        <>
          {game.data.opponentBoard.map((cell, index) => {
            const styleOverride: React.CSSProperties = {};
            if (cell === opponentBoardValues.hit) {
              return (
                <div className={style.cell}>
                  <img className={style.damageSprite} src={targetingSprites.damage} />{' '}
                </div>
              );
            } else if (cell === opponentBoardValues.missed) {
              return (
                <div className={style.cell}>
                  <img className={style.damageSprite} src={targetingSprites.miss} />
                </div>
              );
            } else {
              return <div className={style.cell}></div>;
            }
          })}
        </>
      )}
    </div>
  );
};

export default DamageLayer;
