import Board from './components/Board';
import ControlUI from './components/ControlUI';
import { useGameContext } from './context/GameContext';

function App() {
  const game = useGameContext();

  console.log(game.data);
  return (
    <div className="App">
      <ControlUI />
      <div style={{ display: 'flex' }}>
        {game.data.gameState === 'placement' && (
          <>
            <Board boardData={game.data.playerBoard} boardType="placement" />
          </>
        )}
        {game.data.gameState === 'waiting' && (
          <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}> Waiting for opponent...</div>
        )}
        {game.data.gameState === 'active' && (
          <>
            <Board boardData={game.data.playerBoard} boardType="player" />
            <Board boardData={game.data.opponentBoard} boardType="opponent" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
