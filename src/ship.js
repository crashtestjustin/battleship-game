export const ship = (type) => {
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
      default:
        return 0;
    }
  };

  const obj = {
    name: type,
    length: length(),
    hitCount: 0,
    sunk: sunk,
    hit: function () {
      this.hitCount++;
      this.isSunk();
    },
    isSunk: function () {
      if (this.hitCount >= this.length) {
        this.sunk = true;
      }
    },
  };
  return obj;
};
