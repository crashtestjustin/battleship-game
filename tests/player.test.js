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
    newCPU.submitAttack();
  }
  const arrayCheck = checkDuplicateAttacks(newCPU.attackHistory);
  expect(arrayCheck).toBe(false);
});

function checkDuplicateAttacks(array) {
  const set = new Set();
  for (let subarray of array) {
    const key = JSON.stringify(subarray);
    if (set.has(key)) {
      return true;
    }
    set.add(key);
  }
  return false;
}
