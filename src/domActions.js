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
          }
        });
      });
    }
  }
}

// import { playerFactory } from "./player";

// export function newGameLoop() {
//   const bodyTitle = document.querySelector(".body-title");
//   const startGame = document.querySelector(".start-game");
//   const allGridSq = document.querySelectorAll(".grid-square");
//   const pGridSquares = document.querySelectorAll(".p-grid");
//   const cGridSquares = document.querySelectorAll(".c-grid");
//   const pMoveResult = document.querySelector(".p-move-result");
//   const cMoveResult = document.querySelector(".c-move-result");

//   //Game Initiation (with random ship placement)
//   startGame.addEventListener("click", (e) => {
//     allGridSq.forEach((sq) => {
//       sq.style.backgroundColor = "transparent";
//     });

//     const userPlayer = playerFactory(document.querySelector("#name").value);
//     const cpuPlayer = playerFactory("CPU");
//     userPlayer.oponentGameboard.placeShipsRandom();
//     cpuPlayer.oponentGameboard.placeShipsRandom();

//     cpuPlayer.oponentGameboard.boardArray.forEach((ship) => {
//       ship.forEach((shipCoordinate) => {
//         for (let i = 0; i < pGridSquares.length; i++) {
//           const square = JSON.parse(pGridSquares[i].id);
//           if (
//             shipCoordinate[0] === square[0] &&
//             shipCoordinate[1] === square[1]
//           ) {
//             pGridSquares[i].style.backgroundColor = "#7faec9";
//           }
//         }
//       });
//     });

//     //updating header to name active player's turn
//     bodyTitle.textContent = `Awaiting ${userPlayer.name}'s attack.`;

//     let activePlayerAttack;
//     let gameInProgress = true;

//     //attack loop
//     cGridSquares.forEach((square) => {
//       square.addEventListener("click", (e) => {
//         bodyTitle.textContent = `Awaiting ${cpuPlayer.name}'s attack.`;
//         activePlayerAttack = userPlayer.submitAttack(JSON.parse(e.target.id));

//         if (activePlayerAttack === "invalid guess") {
//           return activePlayerAttack;
//         }
//         if (activePlayerAttack === 5) {
//           square.style.backgroundColor = "red";
//           console.log("Game Over");
//           gameInProgress = false;
//         }
//         if (Array.isArray(activePlayerAttack)) {
//           square.style.backgroundColor = "#b3b3cc";
//           cMoveResult.textContent = "You Missed! ❌";
//           console.log("MISS");
//         }
//         if (!Array.isArray(activePlayerAttack) && activePlayerAttack !== 5) {
//           square.style.backgroundColor = "red";
//           console.log(activePlayerAttack);
//           if (activePlayerAttack.sunk) {
//             cMoveResult.textContent = `You sunk their ${activePlayerAttack.name}!`;
//           } else {
//             cMoveResult.textContent = "You hit a ship! 🫡";
//           }
//         }

//         if (!gameInProgress) {
//           bodyTitle.textContent = userPlayer.announceAsWinner();
//           cMoveResult.textContent = "(CPU = LOSER)";
//           pMoveResult.textContent = "(You = WINNER!)";
//           return;
//         }

//         setTimeout(function () {
//           activePlayerAttack = cpuPlayer.submitAttack();

//           if (activePlayerAttack === "invalid guess") {
//             return activePlayerAttack;
//           }
//           if (activePlayerAttack === 5) {
//             let attackCoor = cpuPlayer.attackHistory.slice(-1);

//             pGridSquares.forEach((loc) => {
//               let gridSquare = JSON.parse(loc.id);
//               if (
//                 gridSquare[0] === attackCoor[0][0] &&
//                 gridSquare[1] === attackCoor[0][1]
//               ) {
//                 loc.style.backgroundColor = "red";
//               }
//             });
//             console.log("Game Over");
//             bodyTitle.textContent = cpuPlayer.announceAsWinner();
//             pMoveResult.textContent = "(You = LOSER)";
//             cMoveResult.textContent = "(CPU = WINNER!)";
//             gameInProgress = false;
//             return;
//           }
//           if (Array.isArray(activePlayerAttack)) {
//             pGridSquares.forEach((coor) => {
//               let gridCoor = JSON.parse(coor.id);
//               if (
//                 activePlayerAttack[0] === gridCoor[0] &&
//                 activePlayerAttack[1] === gridCoor[1]
//               ) {
//                 coor.style.backgroundColor = "#b3b3cc";
//               }
//             });
//             pMoveResult.textContent = "CPU Missed! ❌";
//             console.log("MISS");
//           }
//           if (!Array.isArray(activePlayerAttack) && activePlayerAttack !== 5) {
//             let attackCoor = cpuPlayer.attackHistory.slice(-1);

//             pGridSquares.forEach((loc) => {
//               let gridSquare = JSON.parse(loc.id);
//               if (
//                 gridSquare[0] === attackCoor[0][0] &&
//                 gridSquare[1] === attackCoor[0][1]
//               ) {
//                 loc.style.backgroundColor = "red";
//               }
//             });

//             console.log(activePlayerAttack);
//             if (activePlayerAttack.sunk) {
//               pMoveResult.textContent = `CPU has sunk your ${activePlayerAttack.name}! 🥲🪦`;
//             } else {
//               pMoveResult.textContent = "CPU has hit a ship! 😬";
//             }
//           }
//           bodyTitle.textContent = `Awaiting ${userPlayer.name}'s attack.`;
//         }, 500);
//       });
//       return;
//     });
//     //end
//   });
// }
