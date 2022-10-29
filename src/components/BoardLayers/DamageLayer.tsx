import { useGameContext } from '../../context/GameContext';
import style from '../../styles/Board.module.scss';
import { playerBoardValues } from '../../static/gameValues';

interface DamageLayerProps {
  boardType: 'player' | 'opponent';
}

const DamageLayer = ({ boardType }: DamageLayerProps) => {
  const game = useGameContext();
  const boardSize = Math.sqrt(game.data.playerBoard.length);

  return (
    <div className={style.damageLayer}>
      {boardType === 'player' && (
        <>
          {game.data.playerBoard.map((cell, index) => {
            const styleOverride: React.CSSProperties = {};
            if (cell === playerBoardValues.shipWreck) styleOverride.backgroundColor = 'red';
            else if (cell === playerBoardValues.missedShot) styleOverride.backgroundColor = 'yellow';
            return <div className={style.cell} style={styleOverride}></div>;
          })}
        </>
      )}
    </div>
  );
};

export default DamageLayer;
