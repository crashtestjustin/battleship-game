import { playerFactory } from "./player";

export function newGameLoop() {
  const bodyTitle = document.querySelector(".body-title");
  const startGame = document.querySelector(".start-game");
  const allGridSq = document.querySelectorAll(".grid-square");
  const pGridSquares = document.querySelectorAll(".p-grid");
  const cGridSquares = document.querySelectorAll(".c-grid");

  //Game Initiation (with random ship placement)
  startGame.addEventListener("click", (e) => {
    if (attackListener) {
      cGridSquares.forEach((square) => {
        square.removeEventListener("click", attackListener);
      });
    }
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
    //console logging ship locations
    for (let s = 0; s < cpuPlayer.oponentGameboard.shipObjects.length; s++) {
      console.log(cpuPlayer.oponentGameboard.shipObjects[s]);
      console.log(cpuPlayer.oponentGameboard.shipObjects[s].location);
    }
    //attack loop
    if (
      userPlayer.oponentGameboard.shipsSunk < 5 ||
      cpuPlayer.oponentGameboard.shipsSunk < 5
    ) {
      bodyTitle.textContent = `Awaiting ${userPlayer.name}'s Attack`;

      attackListener = true;
      cGridSquares.forEach((square) => {
        square.addEventListener("click", (e) => {
          const playerTurn = cpuPlayer.submitAttack(JSON.parse(e.target.id));
          console.log(playerTurn);
          if (playerTurn === null) {
            square.style.backgroundColor = "#1515d4";
            square.textContent = "·";
          } else {
            square.style.backgroundColor = "#d47974";
            square.textContent = "X";
          }
        });
      });
    } else {
      console.log("GAME OVER");
    }
  });
}

//need to remove error where previous event listener is still active even when a new game is started
//using while loop to run through player guess and cpu random guess
//once one of the board's shipsSunk is 5 => run a determination for a winner
