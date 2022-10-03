export default interface Game {
  activeGame: boolean;
  roomName?: string;
  opponent?: string;
  playerBoard?: number[][];
  opponentBoard?: number[][];
}
