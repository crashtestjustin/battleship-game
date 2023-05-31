import { gameboardFactory } from "../src/gameboard.js";

test("gameboard factory randomly palces ships to gameboard array", () => {
  const newBoard = gameboardFactory();
  newBoard.placeShipsRandom();
  expect(newBoard.boardArray.length).toBeGreaterThan(0);
});

test("gameboard factory randomly places 5 ships to boardArray", () => {
  const newBoard = gameboardFactory();
  newBoard.placeShipsRandom();
  expect(newBoard.boardArray.length).toEqual(5);
});

test("hit a ship", () => {
  const newBoard = gameboardFactory();
  newBoard.placeShipsRandom();
  const shipHit = newBoard.receiveAttack(newBoard.boardArray[0][0]);
  if (shipHit !== null) {
    // console.log("HIT");
    expect(shipHit.hitCount).toBe(1);
  } else {
    expect(newBoard.missedGuesses).toContainEqual(newBoard.boardArray[0][0]);
  }
});

test("miss a ship", () => {
  const newBoard = gameboardFactory();
  newBoard.placeShipsRandom();
  const shipHit = newBoard.receiveAttack([0.5, 1]);
  if (shipHit !== null) {
    expect(shipHit.hitCount).toBe(1);
  } else {
    // console.log("MISS");
    expect(newBoard.missedGuesses).toContainEqual([0.5, 1]);
  }
});

const mockShip = {
  name: "Mock Ship",
  length: 3,
  hitCount: 0,
  sunk: false,
  hit: function () {
    this.hitCount += 1;
    this.isSunk();
  },
  isSunk: function () {
    if (this.hitCount >= this.length) {
      this.sunk = true;
    }
  },
  location: [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
};

test("sink a ships and increment shipsSunk", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShipsRandom();
  gameboard.receiveAttack(gameboard.shipObjects[4].location[0]);
  gameboard.receiveAttack(gameboard.shipObjects[4].location[1]);
  const shipsSunk = gameboard.shipsSunk;
  expect(shipsSunk).toBe(1);
});

test("sink all ships and get shipsSunk value of 5", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShipsRandom();

  // Sink all ships
  for (let i = 0; i < 5; i++) {
    const ship = gameboard.shipObjects[i];
    const shipCoordinates = ship.location;
    for (let j = 0; j < shipCoordinates.length; j++) {
      gameboard.receiveAttack(shipCoordinates[j]);
    }
  }

  const shipsSunk = gameboard.shipsSunk;
  expect(shipsSunk).toBe(5);
  expect(gameboard.shipsLeft.length).toBe(0);
});

test("No duplicate coordinate pairs in boardArray", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShipsRandom();

  const boardArray = gameboard.boardArray;

  const allCoordinates = boardArray.reduce((acc, coordinates) => {
    return acc.concat(coordinates);
  }, []);

  const duplicateCoordinates = allCoordinates.filter((coord, index) => {
    return (
      allCoordinates.findIndex(
        (c) => c[0] === coord[0] && c[1] === coord[1]
      ) !== index
    );
  });

  expect(duplicateCoordinates).toEqual([]);
});
