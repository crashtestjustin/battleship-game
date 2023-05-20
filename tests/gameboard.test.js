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
