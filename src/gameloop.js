import { playerFactory } from "./player";

export function newGameLoop() {
  const bodyTitle = document.querySelector(".body-title");
  const startGame = document.querySelector(".start-game");
  startGame.addEventListener("click", (e) => {
    const pGridSquares = document.querySelectorAll(".p-grid");
    pGridSquares.forEach((sq) => {
      sq.style.backgroundColor = "transparent";
    });
    const userPlayer = playerFactory(document.querySelector("#name").value);
    const cpuPlayer = playerFactory();
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
    for (let s = 0; s < cpuPlayer.oponentGameboard.shipObjects.length; s++) {
      console.log(cpuPlayer.oponentGameboard.shipObjects[s].location);
    }
    // while (
    //   userPlayer.oponentGameboard.shipsSunk < 5 ||
    //   cpuPlayer.oponentGameboard.shipsSunk < 5
    // ) {
    //   bodyTitle.textContent = `Awaiting ${userPlayer.name}'s Attack`;

    // }
  });
}

//using while loop to run through plaer guess and cpu random guess
//once one of the board's shipsSunk is 5 => run a determination for a winner
