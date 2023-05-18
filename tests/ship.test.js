import { ship } from "../src/ship.js";

test("Battleship Test", () => {
  const battleship = ship("Battleship");
  const result = {
    length: battleship.length,
    hitCount: battleship.hitCount,
    sunk: battleship.sunk,
  };
  expect(result).toEqual({ length: 4, hitCount: 0, sunk: false });
});

test("hit Battleship Test", () => {
  const battleship = ship("Battleship");
  battleship.hit();
  battleship.hit();
  const result = {
    length: battleship.length,
    hitCount: battleship.hitCount,
    sunk: battleship.sunk,
  };
  expect(result).toEqual({ length: 4, hitCount: 2, sunk: false });
});

test("Sink Battleship Test", () => {
  const battleship = ship("Battleship");
  battleship.hit();
  battleship.hit();
  battleship.hit();
  battleship.hit();
  const result = {
    length: battleship.length,
    hitCount: battleship.hitCount,
    sunk: battleship.sunk,
  };
  expect(result).toEqual({ length: 4, hitCount: 4, sunk: true });
});

test("Patrol Boat Test", () => {
  const boat = ship("Patrol Boat");
  const result = {
    length: boat.length,
    hitCount: boat.hitCount,
    sunk: boat.sunk,
  };
  expect(result).toEqual({ length: 2, hitCount: 0, sunk: false });
});

test("Submarine Test", () => {
  const submarine = ship("Submarine");
  const result = {
    length: submarine.length,
    hitCount: submarine.hitCount,
    sunk: submarine.sunk,
  };
  expect(result).toEqual({ length: 3, hitCount: 0, sunk: false });
});

test("submarine sink Test", () => {
  const submarine = ship("Submarine");
  submarine.hit();
  submarine.hit();
  submarine.hit();
  const result = {
    length: submarine.length,
    hitCount: submarine.hitCount,
    sunk: submarine.sunk,
  };
  expect(result).toEqual({ length: 3, hitCount: 3, sunk: true });
});

test("Carrier Test", () => {
  const carrier = ship("Carrier");
  const result = {
    length: carrier.length,
    hitCount: carrier.hitCount,
    sunk: carrier.sunk,
  };
  expect(result).toEqual({ length: 5, hitCount: 0, sunk: false });
});
