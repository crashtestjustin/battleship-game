import { gameboardFactory, getRandomCoordinates } from "./gameboard";

export const playerFactory = (name) => {
  const player = {
    name: name,
    CPU: name !== "CPU" ? false : true,
    oponentGameboard: gameboardFactory(),
    attackHistory: [],

    checkAttackHist: function (attack) {
      if (
        this.oponentGameboard.compareArrays(
          this.oponentGameboard.hitGuesses,
          attack
        ) ||
        this.oponentGameboard.compareArrays(
          this.oponentGameboard.missedGuesses,
          attack
        )
      ) {
        return false;
      } else {
        return true;
      }
    },

    submitAttack: function (attackCoordinate) {
      if (attackCoordinate === undefined) {
        let attack = getRandomCoordinates();
        let validAttack = this.checkAttackHist(attack);
        if (validAttack) {
          attackCoordinate = attack;
        } else {
          this.submitAttack();
        }
      }
      const attack = this.oponentGameboard.receiveAttack(attackCoordinate);
      this.attackHistory.push(attackCoordinate);
      return attack;
    },
  };
  return player;
};

// Define the Player Object:

// Start by creating a Player object that will represent both the user and the CPU player.
// The Player object should have properties such as name, isCPU (a boolean flag to identify if it's a CPU player), and any other necessary properties.
// Additionally, you can include methods like attack to handle attacking the enemy Gameboard.

// Implement the User Player:
// Create a user player instance by instantiating the Player object with the necessary properties.
// Implement the attack method for the user player, allowing them to input coordinates and attack the enemy Gameboard.

// Implement the CPU Player:
// Create a CPU player instance by instantiating the Player object with the necessary properties, specifically setting isCPU to true.
// Implement the attack method for the CPU player, which will make random attacks on the enemy Gameboard.
// Ensure the CPU player avoids attacking the same coordinate twice by keeping track of the already attacked coordinates.

// Game Logic:
// Implement the game logic to handle turns between the user player and the CPU player.
// Use a loop or recursive function to alternate turns until the game is over.
// Inside each turn, invoke the attack method of the respective player and check if the game has been won or lost.
