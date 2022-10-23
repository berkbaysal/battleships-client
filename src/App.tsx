import './styles/App.scss';
import ControlUI from './components/ControlUI';
import { useGameContext } from './context/GameContext';
import GameUI from './components/GameUI';

function App() {
  const game = useGameContext();
  const isItClientsTurn = game.data.clientId === game.data.turn;
  console.log(game.data);
  return (
    <div className="app-container">
      {!game.data.activeGame && <ControlUI />}
      {game.data.activeGame && <GameUI />}
    </div>
  );
}

export default App;
