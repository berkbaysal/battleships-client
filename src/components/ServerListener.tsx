import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useGameContext } from '../context/GameContext';

interface ContextProps {
  children: JSX.Element;
  socket: Socket;
}

const ServerListener = ({ socket, children }: ContextProps) => {
  const game = useGameContext();
  useEffect(() => {
    socket.on('connect', () => {});
    socket.on('client-update', (payload) => {
      game.updateGame(payload);
    });
    socket.on('start-game', () => {
      console.log('game starting...');
      game.startGame(false);
    });
    socket.on('attack-cell', (cell) => {
      console.log('incoming attack on cell ' + cell);
      game.handleAttack(cell);
    });
  }, [socket]);
  return <>{children}</>;
};

export default ServerListener;
