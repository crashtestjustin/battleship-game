export const ship = (type) => {
  let hitCount = 0;
  let sunk = false;

  const length = () => {
    switch (type) {
      case "Carrier":
        return 5;
      case "Battleship":
        return 4;
      case "Destroyer":
        return 3;
      case "Submarine":
        return 3;
      case "Patrol Boat":
        return 2;
    }
  };

  const obj = {
    length: length(type),
    hitCount: hitCount,
    sunk: sunk,
    hit: function () {
      this.hitCount += 1;
    },
    isSunk: function () {
      if (this.hitCount >= this.length) {
        this.sunk = true;
      }
    },
  };
  return obj;
};
