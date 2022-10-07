import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useGameContext } from '../context/GameContext';
import gameEngine from '../static/gameEngine';
import { opponentBoardValues } from '../static/gameValues';

interface ContextProps {
  children: JSX.Element;
  socket: Socket;
}

const ServerListener = ({ socket, children }: ContextProps) => {
  const game = useGameContext();
  useEffect(() => {
    socket.on('connect', () => {});
    socket.on('client-update', (payload) => {
      console.log('client update: ', payload);
      game.updateData(payload);
    });
    socket.on('start-game', () => {
      console.log('game starting...');
      game.startGame(false);
    });
  }, [socket]);
  useEffect(() => {
    socket.on('attack-cell', (cell) => {
      console.log('incoming attack on cell ' + cell);
      game.handleAttack(cell, socket);
    });
    return function removeListener() {
      socket.off('attack-cell');
    };
  }, [socket, game.data.playerBoard]);
  useEffect(() => {
    socket.on('attack-result', ({ cell, outcome }) => {
      if (game.data.opponentBoard) {
        game.updateOpponentBoard(
          outcome
            ? gameEngine.changeCellValue(game.data.opponentBoard, cell, opponentBoardValues.hit)
            : gameEngine.changeCellValue(game.data.opponentBoard, cell, opponentBoardValues.missed)
        );
      }
    });
  }, [game.data.opponentBoard]);
  return <>{children}</>;
};

export default ServerListener;
