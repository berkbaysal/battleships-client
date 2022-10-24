import ReactDOM from 'react-dom/client';
import App from './App';
import { io } from 'socket.io-client';
import { GameContextProvider } from './context/GameContext';
import ServerListener from './components/ServerListener';
import { server } from './static/gameValues';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const socket = io(server, { secure: true });

root.render(
  <GameContextProvider socket={socket}>
    <ServerListener socket={socket}>
      <App />
    </ServerListener>
  </GameContextProvider>
);
