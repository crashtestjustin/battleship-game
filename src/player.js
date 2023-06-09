import { gameboardFactory, getRandomCoordinates } from "./gameboard";

export const playerFactory = (name) => {
  const player = {
    name: name,
    CPU: name !== "CPU" ? false : true,
    oponentGameboard: gameboardFactory(),
    attackHistory: [],

    checkAttackHist: function (attack) {
      let attackList = this.attackHistory;
      for (let subAttack of attackList) {
        if (subAttack[0] === attack[0] && subAttack[1] === attack[1]) {
          return true;
        }
      }
      return false;
    },

    submitAttack: function (attackCoordinate) {
      if (
        attackCoordinate !== undefined &&
        this.checkAttackHist(attackCoordinate)
      ) {
        console.log("invalid guess");
        return "invalid guess";
      }
      if (attackCoordinate === undefined) {
        let newAttack;
        do {
          newAttack = getRandomCoordinates();
        } while (this.checkAttackHist(newAttack));
        attackCoordinate = newAttack;
      }
      const attack = this.oponentGameboard.receiveAttack(attackCoordinate);
      this.attackHistory.push(attackCoordinate);
      return attack;
    },

    announceAsWinner: function () {
      const announcement = `${this.name} has won the game!`;
      console.log(announcement);
      return announcement;
    },
  };
  return player;
};
