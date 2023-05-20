import { gameboardFactory } from "../src/gameboard.js";

test("gameboard factory adds ships to gameboard array", () => {
  const newBoard = gameboardFactory();
  newBoard.placeShips();
  expect(newBoard.boardArray.length).toBeGreaterThan(0);
});

test("gameboard factory adds 5 ships to boardArray", () => {
  const newBoard = gameboardFactory();
  newBoard.placeShips();
  expect(newBoard.boardArray.length).toEqual(5);
});
