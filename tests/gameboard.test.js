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

const mockShip = {
  hitCount: 0,
  hit: function () {
    this.hitCount++;
  },
  location: [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
};

test("hit a ship", () => {
  const newBoard = gameboardFactory();
  newBoard.placeShipsRandom();
  const shipHit = newBoard.receiveAttack(newBoard.boardArray[0][0]);
  if (shipHit !== null) {
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
    expect(newBoard.missedGuesses).toContainEqual([0.5, 1]);
    console.log("MISS");
  }
});
