import { playerFactory } from "../src/player";

test("initiate player", () => {
  const newPlayer = playerFactory("Justin");
  expect(newPlayer.name).toBe("Justin");
  expect(newPlayer.CPU).toBe(false);
});

test("initiate player", () => {
  const newCPU = playerFactory("CPU");
  expect(newCPU.name).toBe("CPU");
  expect(newCPU.CPU).toBe(true);
});

test("submit an attack", () => {
  const newPlayer = playerFactory("Justin");
  const newCPU = playerFactory("CPU");
  newPlayer.oponentGameboard.placeShipsRandom();
  newCPU.oponentGameboard.placeShipsRandom();
  const shipHit = newPlayer.submitAttack([0, 1]);
  if (shipHit !== null) {
    expect(shipHit.hitCount).toBe(1);
    expect(newPlayer.oponentGameboard.hitGuesses).toContainEqual([0, 1]);
  } else {
    expect(newPlayer.oponentGameboard.missedGuesses).toContainEqual([0, 1]);
  }
});

test("check attack history array logging", () => {
  const newPlayer = playerFactory("Justin");
  const newCPU = playerFactory("CPU");
  newPlayer.oponentGameboard.placeShipsRandom();
  newCPU.oponentGameboard.placeShipsRandom();
  const shipHit = newPlayer.submitAttack([0, 1]);
  expect(newPlayer.attackHistory).toContainEqual([0, 1]);
});

test("check CPU history uniqueness logging", () => {
  const newPlayer = playerFactory("Justin");
  const newCPU = playerFactory("CPU");
  newPlayer.oponentGameboard.placeShipsRandom();
  newCPU.oponentGameboard.placeShipsRandom();
  for (let i = 0; i < 100; i++) {
    const shipAttack = newCPU.submitAttack();
  }
  const array = newCPU.attackHistory;
  console.log(array);
  expect(isArrayUnique(array)).toBe(true);
});

isArrayUnique = (array) =>
  Array.isArray(array) && new Set(array).size === array.length;
