import { ship } from "./ship.js";

export const gameboardFactory = () => {
  const gameboard = {
    boardArray: [],
    missedGuesses: [],
    hitGuesses: [],
    shipsLeft: [
      "Carrier",
      "Battleship",
      "Submarine",
      "Destroyer",
      "Patrol Boat",
    ],
    shipsSunk: 0,
    shipObjects: [],

    placeShipsRandom: function () {
      for (let i = 0; i < this.shipsLeft.length; i++) {
        let isVertical = randomVert();
        let shipObj = ship(this.shipsLeft[i]);
        let shipCoordinates = this.placeShipRecursive(shipObj, isVertical);
        this.boardArray.push(shipCoordinates);
        this.shipObjects.push(shipObj);
        shipObj.location = shipCoordinates;
      }
    },

    placeShipRecursive: function (shipObj, isVertical) {
      let startingCoordinates = getRandomCoordinates();
      let shipCoordinates = this.checkValidPlacement(
        shipObj,
        startingCoordinates,
        isVertical
      );

      if (shipCoordinates) {
        return shipCoordinates;
      } else {
        return this.placeShipRecursive(shipObj, isVertical);
      }
    },

    checkValidPlacement: function (shipObj, startingCoordinates, isVertical) {
      let coorindates = [];
      coorindates.push(startingCoordinates);
      if (isVertical && startingCoordinates[0] + shipObj.length > 10) {
        return false;
      }
      if (!isVertical && startingCoordinates[1] + shipObj.length > 10) {
        return false;
      }
      for (let i = 1; i < shipObj.length; i++) {
        let spotLocation;
        if (isVertical) {
          spotLocation = [startingCoordinates[0] + i, startingCoordinates[1]];
        } else {
          spotLocation = [startingCoordinates[0], startingCoordinates[1] + i];
        }
        if (this.compareArrays(spotLocation)) {
          return false;
        }
        coorindates.push(spotLocation);
      }
      return coorindates;
    },

    compareArrays: function (a) {
      let overlap = false;
      for (let i = 0; i < this.boardArray.length; i++) {
        if (
          this.boardArray[i].some(
            (coord) => coord[0] === a[0] && coord[1] === a[1]
          )
        ) {
          overlap = true;
          break;
        }
      }
      return overlap;
    },

    checkForAllSunk: function () {
      let sunkCounter = 0;
      for (let i = 0; i < this.shipObjects.length; i++) {
        if (this.shipObjects[i].sunk) {
          sunkCounter++;
          this.shipsSunk++;
        }
      }
      if (sunkCounter === 5) {
        return 5;
      }
    },

    receiveAttack: function (coordinates) {
      for (let i = 0; i < this.shipObjects.length; i++) {
        if (this.compareArrays(coordinates)) {
          this.shipObjects[i].hit();
          this.hitGuesses.push(coordinates);
          const checkAllSunk = this.checkForAllSunk();
          if (checkAllSunk === 5) {
            return checkAllSunk;
          } else {
            return this.shipObjects[i];
          }
        }
      }
      this.missedGuesses.push(coordinates);
      return null;
    },
  };
  return gameboard;
};

function getRandomCoordinates() {
  return [parseInt(Math.random() * 10), parseInt(Math.random() * 10)];
}

function randomVert() {
  let val = Math.random();
  return val >= 0.5 ? true : false;
}
