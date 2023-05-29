import { playerFactory } from "./player";

export function newGameLoop() {
  const startGame = document.querySelector(".start-game");
  startGame.addEventListener("click", (e) => {
    const userPlayer = playerFactory(document.querySelector("#name").value);
    const cpuPlayer = playerFactory();
    userPlayer.oponentGameboard.placeShipsRandom();
    cpuPlayer.oponentGameboard.placeShipsRandom();
    // while (
    //   userPlayer.oponentGameboard.shipsSunk < 5 ||
    //   cpuPlayer.oponentGameboard.shipsSunk < 5
    // ) {}
  });
}

//using while loop to run through plaer guess and cpu random guess
// need to associate each grid-square with a coordinate somehow??
//once one of the board's shipsSunk is 5 => run a determination for a winner
