import { useGameContext } from '../context/GameContext';
import boardStyle from '../styles/Board.module.scss';
import style from '../styles/Game.module.scss';
import Board from './Board';
import MenuButton from './MenuParts/MenuButton';
const GameUI = () => {
  const game = useGameContext();
  const isClientsTurn = game.data.clientId === game.data.turn;

  return (
    <div className={style.gameContainer}>
      {game.data.activeGame && (
        <div className={style.gameBoards}>
          {game.data.gameState === 'placement' && (
            <Board
              boardType="placement"
              subTextTop="Place your ships."
              subTextBottom="Use arrow keys to move, R to rotate, Enter to place."
              className={boardStyle.centerBoard}
            />
          )}
          {game.data.gameState === 'active' && (
            <>
              <Board boardType="opponent" subTextTop="Opponents Board" className={boardStyle.leftBoard} />
              <Board boardType="player" subTextTop="Your Board" className={boardStyle.rightBoard} />
            </>
          )}
          {game.data.gameState === 'game-over' && (
            <>
              <div>
                Game Over. <br />
                {game.data.winner === game.data.clientId ? 'You won!' : 'You lost.'}
              </div>
            </>
          )}
        </div>
      )}
      {game.data.gameState === 'waiting' && <div className={style.waitingScreen}>Waiting for opponent...</div>}
      {game.data.gameState === 'active' && (
        <MenuButton
          label={isClientsTurn ? 'Attack' : 'Opponents Turn'}
          action={() => {
            if (game.data.selectedCell !== null) game.attackCell(game.data.selectedCell);
          }}
          styleOverride={{ width: '15rem', marginTop: '3rem' }}
          disabled={!isClientsTurn}
          className={style.gameButton}
        />
      )}
    </div>
  );
};

export default GameUI;
