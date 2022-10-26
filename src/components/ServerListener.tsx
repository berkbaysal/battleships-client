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
      game.updateData(payload);
    });
    socket.on('start-game', () => {
      game.startGame(false);
    });
  }, [socket]);
  useEffect(() => {
    socket.on('attack-cell', (cell) => {
      game.handleAttack(cell, socket);
    });
    return function removeListener() {
      socket.off('attack-cell');
    };
  }, [socket, game.data.playerBoard]);
  useEffect(() => {
    socket.on('game-over', () => {
      game.updateData({ gameState: 'game-over', winner: game.data.clientId, activeGame: false });
    });
  }, [game.data.clientId]);
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
  useEffect(() => {
    socket.on('opponent-left', () => {
      game.handleOpponentLeaving();
    });
    return function removeListener() {
      socket.off('opponent-left');
    };
  }, [socket, game.data.clientIsHost, game.data.activeGame, game.data.roomName]);
  return <>{children}</>;
};

export default ServerListener;
