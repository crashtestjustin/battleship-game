import { ship } from "../src/ship.js";

test("Create Battleship Test", () => {
  const battleship = ship("Battleship");
  const result = {
    name: battleship.name,
    length: battleship.length,
    hitCount: battleship.hitCount,
    sunk: battleship.sunk,
  };
  expect(result).toEqual({
    name: "Battleship",
    length: 4,
    hitCount: 0,
    sunk: false,
  });
});

test("Hit Count Increment Battleship Test", () => {
  const battleship = ship("Battleship");
  battleship.hit();
  battleship.hit();
  const result = {
    name: battleship.name,
    length: battleship.length,
    hitCount: battleship.hitCount,
    sunk: battleship.sunk,
  };
  expect(result).toEqual({
    name: "Battleship",
    length: 4,
    hitCount: 2,
    sunk: false,
  });
});

test("Battleship Sunk should be TRUE", () => {
  const battleship = ship("Battleship");
  battleship.hit();
  battleship.hit();
  battleship.hit();
  battleship.hit();
  const result = {
    name: battleship.name,
    length: battleship.length,
    hitCount: battleship.hitCount,
    sunk: battleship.sunk,
  };
  expect(result).toEqual({
    name: "Battleship",
    length: 4,
    hitCount: 4,
    sunk: true,
  });
});

test("Generate Patrol Boat Test", () => {
  const boat = ship("Patrol Boat");
  const result = {
    name: boat.name,
    length: boat.length,
    hitCount: boat.hitCount,
    sunk: boat.sunk,
  };
  expect(result).toEqual({
    name: "Patrol Boat",
    length: 2,
    hitCount: 0,
    sunk: false,
  });
});

test("Generate Submarine Test", () => {
  const submarine = ship("Submarine");
  const result = {
    name: submarine.name,
    length: submarine.length,
    hitCount: submarine.hitCount,
    sunk: submarine.sunk,
  };
  expect(result).toEqual({
    name: "Submarine",
    length: 3,
    hitCount: 0,
    sunk: false,
  });
});

test("Submarine Sink Test", () => {
  const submarine = ship("Submarine");
  submarine.hit();
  submarine.hit();
  submarine.hit();
  const result = {
    name: submarine.name,
    length: submarine.length,
    hitCount: submarine.hitCount,
    sunk: submarine.sunk,
  };
  expect(result).toEqual({
    name: "Submarine",
    length: 3,
    hitCount: 3,
    sunk: true,
  });
});

test("Generate Carrier Test", () => {
  const carrier = ship("Carrier");
  const result = {
    name: carrier.name,
    length: carrier.length,
    hitCount: carrier.hitCount,
    sunk: carrier.sunk,
  };
  expect(result).toEqual({
    name: "Carrier",
    length: 5,
    hitCount: 0,
    sunk: false,
  });
});
