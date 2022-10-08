import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { io } from 'socket.io-client';
import { GameContextProvider } from './context/GameContext';
import ServerListener from './components/ServerListener';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const socket = io('http://localhost:8080');
//const socket = io('http://battleships-364108.ew.r.appspot.com/');

root.render(
  <GameContextProvider socket={socket}>
    <ServerListener socket={socket}>
      <App />
    </ServerListener>
  </GameContextProvider>
);
