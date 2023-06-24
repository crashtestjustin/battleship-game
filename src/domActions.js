//DOM functionality below here

import { ship } from "./ship";

export function nameValidation() {
  const playerName = document.querySelector("#name");
  if (playerName.value === null || playerName.value === undefined) {
    const title = document.querySelector(".body-title");
    title.textContent = "Please enter your name";
    title.style.color = "red";
    return false;
  }
  return true;
}

export function populateLists(shipSunk, playerActive) {
  console.log(shipSunk);
  const pShipList = document.querySelectorAll(".all-p-ships");
  const cShipList = document.querySelectorAll(".all-c-ships");
  if (shipSunk === undefined && playerActive === undefined) {
    pShipList.forEach((ship) => {
      ship.style.textDecoration = "none";
      ship.style.opacity = "1";
    });
    cShipList.forEach((ship) => {
      ship.style.textDecoration = "none";
      ship.style.opacity = "1";
    });
    return;
  }
  if (playerActive === "CPU") {
    pShipList.forEach((ship) => {
      if (shipSunk === "final") {
        ship.style.textDecoration = "line-through";
        ship.style.opacity = "0.25";
      } else if (ship.textContent === shipSunk.name) {
        ship.style.textDecoration = "line-through";
        ship.style.opacity = "0.25";
      }
    });
  } else {
    cShipList.forEach((ship) => {
      if (shipSunk === "final") {
        ship.style.textDecoration = "line-through";
        ship.style.opacity = "0.25";
      } else if (ship.textContent === shipSunk.name) {
        ship.style.textDecoration = "line-through";
        ship.style.opacity = "0.25";
      }
    });
  }
}

export function ShipSunkFormat(shipSunk, playerActive, endGame) {
  const cGrid = document.querySelectorAll(".c-grid");
  const pGrid = document.querySelectorAll(".p-grid");
  if (playerActive === "user") {
    if (endGame !== undefined) {
      cGrid.forEach((grid) => {
        const loc = JSON.parse(grid.id);
        endGame.forEach((ship) => {
          ship.location.forEach((coor) => {
            if (coor[0] === loc[0] && coor[1] === loc[1]) {
              grid.textContent = "X";
              grid.style.backgroundColor = "var(--sunk-attack)";
            }
          });
        });
      });
    } else {
      cGrid.forEach((grid) => {
        const loc = JSON.parse(grid.id);
        shipSunk.location.forEach((coor) => {
          if (loc[0] === coor[0] && loc[1] === coor[1]) {
            grid.textContent = "X";
            grid.style.backgroundColor = "var(--sunk-attack)";
          }
        });
      });
    }
  } else {
    if (endGame !== undefined) {
      pGrid.forEach((grid) => {
        const loc = JSON.parse(grid.id);
        endGame.forEach((ship) => {
          ship.location.forEach((coor) => {
            if (coor[0] === loc[0] && coor[1] === loc[1]) {
              grid.textContent = "X";
              grid.style.backgroundColor = "var(--sunk-attack)";
            }
          });
        });
      });
    } else {
      pGrid.forEach((grid) => {
        const loc = JSON.parse(grid.id);
        shipSunk.location.forEach((coor) => {
          if (loc[0] === coor[0] && loc[1] === coor[1]) {
            grid.textContent = "X";
            grid.style.backgroundColor = "var(--sunk-attack)";
          }
        });
      });
    }
  }
}
