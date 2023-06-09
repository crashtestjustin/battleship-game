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

    bodyTitle.textContent = `Awaiting ${userPlayer.name}'s attack.`;

    //console logging ship locations

    for (let s = 0; s < cpuPlayer.oponentGameboard.shipObjects.length; s++) {
      console.log(cpuPlayer.oponentGameboard.shipObjects[s]);
      console.log(cpuPlayer.oponentGameboard.shipObjects[s].location);
    }
    console.log(userPlayer.oponentGameboard.shipsSunk); //0

    //attack loop
  });
}
