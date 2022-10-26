const playerBoardValues = {
  empty: 0,
  ship: [
    { shipName: 'aircraftCarrier', values: [101, 102, 103, 104, 105] },
    { shipName: 'battleship', values: [111, 112, 113, 114] },
    { shipName: 'destroyer', values: [121, 122, 123] },
    { shipName: 'submarine', values: [131, 132] },
    { shipName: 'patrolBoat', values: [141] },
  ],
  placingShip: [
    { shipName: 'aircraftCarrier', values: [1010, 1020, 1030, 1040, 1050] },
    { shipName: 'battleship', values: [1110, 1120, 1130, 1140] },
    { shipName: 'destroyer', values: [1210, 1220, 1230] },
    { shipName: 'submarine', values: [1310, 1320] },
    { shipName: 'patrolBoat', values: [1410] },
  ],
  placingShipCollides: {
    aircraftCarrier: [1015, 1025, 1035, 1045, 1055],
    battleship: [1115, 1125, 1135, 1145],
    destroyer: [1215, 1225, 1235],
    submarine: [1315, 1325],
    patrolBoat: [1415],
  },
  shipWreck: 201,
  missedShot: 301,
};
const opponentBoardValues = {
  unknown: 0,
  missed: -1,
  hit: 1,
};
const ships = [
  { name: 'Aircraft Carrier', size: 5 },
  { name: 'Battleship', size: 4 },
  { name: 'Destoryer', size: 3 },
  { name: 'Submarine', size: 2 },
  { name: 'Patrol Boat', size: 1 },
];

const server = process.env.NODE_ENV === 'development' ? 'localhost:8080/' : 'https://battleships-364108.ew.r.appspot.com/';
export { playerBoardValues, opponentBoardValues, ships, server };
