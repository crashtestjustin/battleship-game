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
        if (this.checkForShipOverlap(shipCoordinates)) {
          return this.placeShipRecursive(shipObj, isVertical);
        } else {
          return shipCoordinates;
        }
      } else {
        return this.placeShipRecursive(shipObj, isVertical);
      }
    },

    placeShipsManual: function () {
      const isVert = document.querySelector("#is-vert");
      const pGrid = document.querySelectorAll(".p-grid");
      const bodyTitle = document.querySelector(".body-title");
      let shipIndex = 0;
      let shipObjM;

      const handleGridClick = (e) => {
        const grid = e.target;
        const gridLoc = JSON.parse(grid.id);
        const shipName = this.shipsLeft[shipIndex];
        shipObjM = ship(shipName);

        let shipCoordinatesM;
        if (isVert.checked) {
          shipCoordinatesM = this.checkValidPlacement(shipObjM, gridLoc, true);
        } else {
          shipCoordinatesM = this.checkValidPlacement(shipObjM, gridLoc, false);
        }

        if (shipCoordinatesM) {
          console.log(shipCoordinatesM);
          // Valid placement, update gameboard
          shipObjM.location = shipCoordinatesM;
          this.shipObjects.push(shipObjM);
          this.boardArray.push(shipCoordinatesM);
          shipIndex++;

          // Check if all ships are placed
          if (shipIndex === this.shipsLeft.length) {
            // All ships placed, remove event listeners
            pGrid.forEach((grid) => {
              grid.removeEventListener("click", handleGridClick);
              grid.removeEventListener("mouseover", handleGridMouseOver);
              grid.removeEventListener("mouseout", handleGridMouseOut);
            });
            return;
            // Proceed with the game or perform any necessary actions
            // after all ships are placed
          } else {
            // Update the text content for the next ship
            bodyTitle.textContent = `Place your ${this.shipsLeft[shipIndex]}.`;
          }
        }
      };

      const handleGridMouseOver = (e) => {
        const grid = e.target;
        const gridLoc = JSON.parse(grid.id);
        const shipName = this.shipsLeft[shipIndex];
        const shipObj = ship(shipName);

        if (isVert.checked) {
          if (shipObj.location && shipObj.location.length > 0) {
            shipObj.location.forEach((coord) => {
              const cell = document.getElementById(JSON.stringify(coord));
              cell.style.backgroundColor = "orange";
            });
          } else {
            shipObj.location = this.checkValidPlacement(shipObj, gridLoc, true);
            if (shipObj.location) {
              shipObj.location.forEach((coord) => {
                const cell = document.getElementById(JSON.stringify(coord));
                cell.style.backgroundColor = "orange";
              });
            }
          }
        } else {
          if (shipObj.location && shipObj.location.length > 0) {
            shipObj.location.forEach((coord) => {
              const cell = document.getElementById(JSON.stringify(coord));
              cell.style.backgroundColor = "orange";
            });
          } else {
            shipObj.location = this.checkValidPlacement(
              shipObj,
              gridLoc,
              false
            );
            if (shipObj.location) {
              shipObj.location.forEach((coord) => {
                const cell = document.getElementById(JSON.stringify(coord));
                cell.style.backgroundColor = "orange";
              });
            }
          }
        }
      };

      const handleGridMouseOut = (e) => {
        const grid = e.target;
        const gridLoc = JSON.parse(grid.id);
        const shipName = this.shipsLeft[shipIndex];
        const shipObj = ship(shipName);

        if (isVert.checked) {
          shipObj.location = this.checkValidPlacement(shipObj, gridLoc, true);
        } else {
          shipObj.location = this.checkValidPlacement(shipObj, gridLoc, false);
        }

        if (shipObj.location) {
          shipObj.location.forEach((coord) => {
            const cell = document.getElementById(JSON.stringify(coord));
            cell.style.backgroundColor = "transparent";
          });
        }
      };

      pGrid.forEach((grid) => {
        grid.addEventListener("click", handleGridClick);
        grid.addEventListener("mouseover", handleGridMouseOver);
        grid.addEventListener("mouseout", handleGridMouseOut);
      });

      // Set the initial ship title
      bodyTitle.textContent = `Place your ${this.shipsLeft[0]}.`;
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

    checkForShipOverlap: function (newShipCoordinates) {
      for (let i = 0; i < this.shipObjects.length; i++) {
        const existingShipCoordinates = this.shipObjects[i].location;
        for (let j = 0; j < newShipCoordinates.length; j++) {
          const newCoord = newShipCoordinates[j];
          for (let k = 0; k < existingShipCoordinates.length; k++) {
            const existingCoord = existingShipCoordinates[k];
            if (
              existingCoord[0] === newCoord[0] &&
              existingCoord[1] === newCoord[1]
            ) {
              return true;
            }
          }
        }
      }
      return false;
    },

    compareArrays: function (a, b) {
      let overlap = false;
      if (b === undefined) {
        for (let i = 0; i < this.boardArray.length; i++) {
          const coordinates = this.boardArray[i];
          for (let j = 0; j < coordinates.length; j++) {
            if (coordinates[j][0] === a[0] && coordinates[j][1] === a[1]) {
              overlap = true;
              break;
            }
          }
          // if (
          //   this.boardArray[i].some(
          //     (coord) => coord[0] === a[0] && coord[1] === a[1]
          //   )
          // ) {
          //   overlap = true;
          //   break;
          // }
          if (overlap) {
            break;
          }
        }
      } else {
        for (let i = 0; i < a.length; i++) {
          if (a[i][0] === b[0] && a[i][1] === b[1]) {
            overlap = true;
            break;
          }
        }
      }
      return overlap;
    },

    checkForAllSunk: function () {
      let sunkenShips = 0;
      for (let i = 0; i < this.shipObjects.length; i++) {
        if (this.shipObjects[i].sunk) {
          sunkenShips++;
        }
      }
      this.shipsSunk = sunkenShips;
      return sunkenShips;
    },

    receiveAttack: function (coordinates) {
      let hitShip = null;
      for (let i = 0; i < this.shipObjects.length; i++) {
        const shipCoordinates = this.shipObjects[i].location;
        if (this.compareArrays(shipCoordinates, coordinates)) {
          this.shipObjects[i].hit();
          this.hitGuesses.push(coordinates);
          hitShip = this.shipObjects[i];
          if (hitShip.sunk) {
            this.shipsLeft = [];
            for (let j = 0; j < this.shipObjects.length; j++) {
              if (!this.shipObjects[j].sunk) {
                this.shipsLeft.push(this.shipObjects[j].name);
              }
            }
          }
          break;
        }
      }
      if (hitShip !== null) {
        const checkAllSunk = this.checkForAllSunk();
        if (checkAllSunk === 5) {
          return checkAllSunk;
        } else {
          return hitShip;
        }
      } else {
        this.missedGuesses.push(coordinates);
        return coordinates;
      }
    },
  };
  return gameboard;
};

export function getRandomCoordinates() {
  return [parseInt(Math.random() * 10), parseInt(Math.random() * 10)];
}

function randomVert() {
  let val = Math.random();
  return val >= 0.5 ? true : false;
}
