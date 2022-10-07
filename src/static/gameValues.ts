const playerBoardValues = {
  empty: 0,
  ship: 1,
};
const opponentBoardValues = {
  unknown: 0,
  missed: -1,
  hit: 1,
};
const ships = {
  aircraftCarrier: 5,
  battleship: 4,
  cruiser: 3,
  destoryer: 2,
  submarine: 1,
};

export { playerBoardValues, opponentBoardValues, ships };
