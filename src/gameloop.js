import { playerFactory } from "./player";
import { nameValidation } from "./domActions";

export function newGameLoop() {
  const bodyTitle = document.querySelector(".body-title");
  const startGame = document.querySelector(".start-game");
  const allGridSq = document.querySelectorAll(".grid-square");
  const pGridSquares = document.querySelectorAll(".p-grid");
  const cGridSquares = document.querySelectorAll(".c-grid");

  //Game Initiation (with random ship placement)
  startGame.addEventListener("click", (e) => {
    allGridSq.forEach((sq) => {
      sq.style.backgroundColor = "transparent";
    });

    const userPlayer = playerFactory(document.querySelector("#name").value);
    const cpuPlayer = playerFactory("CPU");
    userPlayer.oponentGameboard.placeShipsRandom();
    cpuPlayer.oponentGameboard.placeShipsRandom();

    cpuPlayer.oponentGameboard.boardArray.forEach((ship) => {
      ship.forEach((shipCoordinate) => {
        for (let i = 0; i < pGridSquares.length; i++) {
          const square = JSON.parse(pGridSquares[i].id);
          if (
            shipCoordinate[0] === square[0] &&
            shipCoordinate[1] === square[1]
          ) {
            pGridSquares[i].style.backgroundColor = "#7faec9";
          }
        }
      });
    });

    //updating header to name active player's turn
    bodyTitle.textContent = `Awaiting ${userPlayer.name}'s attack.`;

    console.log(userPlayer.oponentGameboard.boardArray);
    for (let i = 0; i < userPlayer.oponentGameboard.shipObjects.length; i++) {
      console.log(userPlayer.oponentGameboard.shipObjects[i].location);
    }

    let activePlayerAttack;

    //attack loop
    //this player attack and the below CPU attack need to be wrapped in a while loop until the
    //activePlayerAttack returns 5
    cGridSquares.forEach((square) => {
      square.addEventListener("click", (e) => {
        activePlayerAttack = userPlayer.submitAttack(JSON.parse(e.target.id));

        if (activePlayerAttack === "invalid guess") {
          return activePlayerAttack;
        }
        if (activePlayerAttack === 5) {
          square.style.backgroundColor = "red";
          console.log("Game Over");
        }
        if (Array.isArray(activePlayerAttack)) {
          square.style.backgroundColor = "#b3b3cc";
          console.log("MISS");
        }
        if (!Array.isArray(activePlayerAttack)) {
          square.style.backgroundColor = "red";
          console.log(activePlayerAttack.name);
          console.log(activePlayerAttack.hitCount);
          console.log(activePlayerAttack.sunk);
        }
        bodyTitle.textContent = `Awaiting ${cpuPlayer.name}'s attack.`;

        setTimeout(function () {
          activePlayerAttack = cpuPlayer.submitAttack();
          if (activePlayerAttack === "invalid guess") {
            return activePlayerAttack;
          }
          if (activePlayerAttack === 5) {
            coor.style.backgroundColor = "red";
            //need to break out to determine winner
            console.log("Game Over");
          }
          if (Array.isArray(activePlayerAttack)) {
            pGridSquares.forEach((coor) => {
              let gridCoor = JSON.parse(coor.id);
              if (
                activePlayerAttack[0] === gridCoor[0] &&
                activePlayerAttack[1] === gridCoor[1]
              ) {
                coor.style.backgroundColor = "#b3b3cc";
              }
            });
            console.log("MISS");
          }
          if (!Array.isArray(activePlayerAttack)) {
            let attackCoor = cpuPlayer.attackHistory.slice(-1);

            pGridSquares.forEach((loc) => {
              let gridSquare = JSON.parse(loc.id);
              if (
                gridSquare[0] === attackCoor[0][0] &&
                gridSquare[1] === attackCoor[0][1]
              ) {
                loc.style.backgroundColor = "red";
              }
            });

            console.log(activePlayerAttack);
          }
        }, 2000);
        bodyTitle.textContent = `Awaiting ${userPlayer.name}'s attack.`;
      });
    });
    //end
  });
}
