const playerBoardValues = {
  empty: 0,
  ship: 1,
  placingShip: 101,
  placingShipCollides: 102,
  shipWreck: 201,
  missedShot: 301,
};
const opponentBoardValues = {
  unknown: 0,
  missed: -1,
  hit: 1,
};
const ships = [
  // { name: 'Aircraft Carrier', size: 5 },
  // { name: 'Battleship', size: 4 },
  // { name: 'Cruiser', size: 3 },
  { name: 'Destoryer', size: 2 },
  { name: 'Submarine', size: 1 },
];

export { playerBoardValues, opponentBoardValues, ships };
