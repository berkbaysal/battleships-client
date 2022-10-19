import './styles/App.scss';
import Board from './components/Board';
import ControlUI from './components/ControlUI';
import { useGameContext } from './context/GameContext';
import MenuButton from './components/MenuButton';

function App() {
  const game = useGameContext();
  const isItClientsTurn = game.data.clientId === game.data.turn;
  console.log(game.data);
  return (
    <div className="app-container">
      {!game.data.activeGame && <ControlUI />}
      {game.data.activeGame && (
        <div style={{ display: 'flex' }}>
          {game.data.gameState === 'placement' && (
            <>
              <Board boardData={game.data.playerBoard} boardType="placement" />
            </>
          )}
          {game.data.gameState === 'waiting' && (
            <div
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: '1.5rem',
              }}
            >
              Waiting for opponent...
            </div>
          )}
          {game.data.gameState === 'active' && (
            <>
              <Board boardData={game.data.opponentBoard} boardType="opponent" />
              <Board boardData={game.data.playerBoard} boardType="player" />
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
    </div>
  );
}

export default App;
