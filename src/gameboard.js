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
    highlightedCoordinates: [],

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

    placeShipsManual: function (callback) {
      const isVert = document.querySelector("#is-vert");
      const pGrid = document.querySelectorAll(".p-grid");
      const bodyTitle = document.querySelector(".body-title");
      const startGame = document.querySelector(".start-game");
      let shipIndex = 0;
      let shipObjM;

      startGame.addEventListener("click", (e) => {
        pGrid.forEach((grid) => {
          grid.removeEventListener("click", handleGridClick);
          grid.removeEventListener("mouseover", handleGridMouseOver);
          grid.removeEventListener("mouseout", handleGridMouseOut);
        });
      });

      const handleGridClick = (e) => {
        const grid = e.target;
        const gridLoc = JSON.parse(grid.id);
        const shipName = this.shipsLeft[shipIndex];
        shipObjM = ship(shipName);

        let shipCoordinatesM;
        if (isVert.checked) {
          shipCoordinatesM = this.checkValidManualPlacement(
            shipObjM,
            gridLoc,
            true
          );
        } else {
          shipCoordinatesM = this.checkValidManualPlacement(
            shipObjM,
            gridLoc,
            false
          );
        }

        if (!this.searchValuesAbove9(shipCoordinatesM)) {
          if (this.checkForShipOverlap(shipCoordinatesM)) {
            return;
          } else {
            // Valid placement, update gameboard
            shipObjM.location = shipCoordinatesM;

            this.shipObjects.push(shipObjM);
            this.boardArray.push(shipCoordinatesM);
            shipIndex++;
          }

          // Check if all ships are placed
          if (shipIndex === this.shipsLeft.length) {
            // All ships placed, remove event listeners
            pGrid.forEach((grid) => {
              grid.removeEventListener("click", handleGridClick);
              grid.removeEventListener("mouseover", handleGridMouseOver);
              grid.removeEventListener("mouseout", handleGridMouseOut);
            });
            callback();
            // Proceed with the game or perform any necessary actions
            // after all ships are placed
          } else {
            // Update the text content for the next ship
            bodyTitle.textContent = `Place your ${this.shipsLeft[shipIndex]}.`;
          }
        } else {
          return;
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
              cell.style.backgroundColor = "var(--placing-ship-color)";
            });
          } else {
            shipObj.location = this.checkValidManualPlacement(
              shipObj,
              gridLoc,
              true
            );
            if (!this.searchValuesAbove9(shipObj.location)) {
              const isOverlap = this.checkForShipOverlap(shipObj.location);
              if (isOverlap) {
                shipObj.location.forEach((coord) => {
                  const cell = document.getElementById(JSON.stringify(coord));
                  cell.style.backgroundColor = "var(--invalid-ship-placement)";
                });
              } else {
                shipObj.location.forEach((coord) => {
                  const cell = document.getElementById(JSON.stringify(coord));
                  cell.style.backgroundColor = "var(--placing-ship-color)";
                });
              }
            } else {
              shipObj.location.forEach((coord) => {
                const cell = document.getElementById(JSON.stringify(coord));
                cell.style.backgroundColor = "var(--invalid-ship-placement)";
              });
            }
          }
        } else {
          if (shipObj.location && shipObj.location.length > 0) {
            shipObj.location.forEach((coord) => {
              const cell = document.getElementById(JSON.stringify(coord));
              cell.style.backgroundColor = "var(--placing-ship-color)";
            });
          } else {
            shipObj.location = this.checkValidManualPlacement(
              shipObj,
              gridLoc,
              false
            );
            if (!this.searchValuesAbove9(shipObj.location)) {
              const isOverlap = this.checkForShipOverlap(shipObj.location);
              if (isOverlap) {
                shipObj.location.forEach((coord) => {
                  const cell = document.getElementById(JSON.stringify(coord));
                  cell.style.backgroundColor = "var(--invalid-ship-placement)";
                });
              } else {
                shipObj.location.forEach((coord) => {
                  const cell = document.getElementById(JSON.stringify(coord));
                  cell.style.backgroundColor = "var(--placing-ship-color)";
                });
              }
            } else {
              shipObj.location.forEach((coord) => {
                const cell = document.getElementById(JSON.stringify(coord));
                cell.style.backgroundColor = "var(--invalid-ship-placement)";
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
          shipObj.location = this.checkValidManualPlacement(
            shipObj,
            gridLoc,
            true
          );
        } else {
          shipObj.location = this.checkValidManualPlacement(
            shipObj,
            gridLoc,
            false
          );
        }

        if (shipObj.location) {
          this.boardArray.forEach((ship) => {
            ship.forEach((loc) => {
              const shipCell = document.getElementById(JSON.stringify(loc));
              shipCell.style.backgroundColor = "var(--placing-ship-color)";
            });
          });
        }
        shipObj.location.forEach((coord) => {
          const cell = document.getElementById(JSON.stringify(coord));
          cell.style.backgroundColor = "transparent";
        });
        this.shipObjects.forEach((ship) => {
          ship.location.forEach((coord) => {
            const gridCell = document.getElementById(JSON.stringify(coord));
            gridCell.style.backgroundColor = "var(--placing-ship-color)";
          });
        });
      };

      pGrid.forEach((grid) => {
        grid.addEventListener("click", handleGridClick);
        grid.addEventListener("mouseover", handleGridMouseOver);
        grid.addEventListener("mouseout", handleGridMouseOut);
      });

      // Set the initial ship title
      bodyTitle.textContent = `Place your ${this.shipsLeft[0]}.`;
    },

    checkValidManualPlacement: function (
      shipObj,
      startingCoordinates,
      isVertical
    ) {
      let coorindates = [];
      coorindates.push(startingCoordinates);
      for (let i = 1; i < shipObj.length; i++) {
        let spotLocation;
        if (isVertical) {
          spotLocation = [startingCoordinates[0] + i, startingCoordinates[1]];
        } else {
          spotLocation = [startingCoordinates[0], startingCoordinates[1] + i];
        }
        coorindates.push(spotLocation);
      }
      return coorindates;
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

    searchValuesAbove9: function (array) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          if (array[i][j] > 9) {
            return true; // Found a value above 9, return true
          }
        }
      }
      return false; // No value above 9 found
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
