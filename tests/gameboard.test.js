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

test("sink all ships", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShipsRandom();
  for (let i = 0; i < gameboard.boardArray.length; i++) {
    for (let j = 0; j < gameboard.boardArray[i].length; j++) {
      gameboard.receiveAttack(gameboard.boardArray[i][j]);
      console.log(gameboard.boardArray[i][j]);
    }
    console.log(
      gameboard.shipObjects[i].name,
      gameboard.shipObjects[i].location,
      gameboard.shipObjects[i].sunk
    );
    console.log(gameboard.shipsSunk);
  }
  const shipsSunk = gameboard.shipsSunk;
  expect(shipsSunk).toBe(5);
});
