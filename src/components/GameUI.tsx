import { useGameContext } from '../context/GameContext';
import style from '../styles/Game.module.scss';
import Board from './Board';
import MenuButton from './MenuButton';
const GameUI = () => {
  const game = useGameContext();
  const isClientsTurn = game.data.clientId === game.data.turn;

  return (
    <div className={style.gameContainer}>
      {game.data.activeGame && (
        <div className={style.gameBoards}>
          {game.data.gameState === 'placement' && (
            <Board
              boardData={game.data.playerBoard}
              boardType="placement"
              subTextTop="Place your ships."
              subTextBottom="Use arrow keys to move, R to rotate, Enter to place."
            />
          )}
          {game.data.gameState === 'waiting' && <div className={style.waitingScreen}>Waiting for opponent...</div>}
          {game.data.gameState === 'active' && (
            <>
              <Board boardData={game.data.opponentBoard} boardType="opponent" subTextTop="Opponents Board" />
              <Board boardData={game.data.playerBoard} boardType="player" subTextTop="Your Board" />
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

      <MenuButton
        label={isClientsTurn ? 'Attack' : 'Opponents Turn'}
        action={() => {
          if (game.data.selectedCell !== null) game.attackCell(game.data.selectedCell);
        }}
        styleOverride={{ width: '15rem', marginTop: '3rem' }}
        disabled={!isClientsTurn}
      />
    </div>
  );
};

export default GameUI;
