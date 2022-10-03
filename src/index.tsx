import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { io } from 'socket.io-client';
import { ServerContextProvider } from './context/ServerContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const socket = io('http://localhost:8080');

root.render(
  <ServerContextProvider socket={socket}>
    <App />
  </ServerContextProvider>
);
