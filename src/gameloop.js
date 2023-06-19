import { playerFactory } from "./player";
import { populateLists, ShipSunkFormat } from "./domActions";

export function newGameLoop() {
  const bodyTitle = document.querySelector(".body-title");
  const startGame = document.querySelector(".start-game");
  const allGridSq = document.querySelectorAll(".grid-square");
  const pGridSquares = document.querySelectorAll(".p-grid");
  const cGridSquares = document.querySelectorAll(".c-grid");
  const pMoveResult = document.querySelector(".p-move-result");
  const cMoveResult = document.querySelector(".c-move-result");

  let activePlayerAttack;
  let gameInProgress = true;
  let userPlayer;
  let cpuPlayer;

  function clickEventListener(e) {
    bodyTitle.textContent = `Awaiting ${cpuPlayer.name}'s attack.`;
    activePlayerAttack = userPlayer.submitAttack(JSON.parse(e.target.id));

    if (activePlayerAttack === "invalid guess") {
      return activePlayerAttack;
    }
    if (activePlayerAttack === 5) {
      e.target.style.backgroundColor = "red";
      console.log("Game Over");
      gameInProgress = false;
    }
    if (Array.isArray(activePlayerAttack)) {
      e.target.style.backgroundColor = "#b3b3cc";
      cMoveResult.textContent = "You Missed! ❌";
      console.log("MISS");
    }
    if (!Array.isArray(activePlayerAttack) && activePlayerAttack !== 5) {
      e.target.style.backgroundColor = "red";
      console.log(activePlayerAttack);
      if (activePlayerAttack.sunk) {
        cMoveResult.textContent = `You sunk their ${activePlayerAttack.name}!`;
        populateLists(activePlayerAttack, "user");
        ShipSunkFormat(activePlayerAttack, "user");
      } else {
        cMoveResult.textContent = "You hit a ship! 🫡";
      }
    }

    if (!gameInProgress) {
      bodyTitle.textContent = userPlayer.announceAsWinner();
      populateLists("final", "user");
      ShipSunkFormat(
        activePlayerAttack,
        "user",
        userPlayer.oponentGameboard.shipObjects
      );
      cMoveResult.textContent = "(CPU = LOSER)";
      pMoveResult.textContent = "(You = WINNER!)";
      cGridSquares.forEach((spot) => {
        spot.removeEventListener("click", clickEventListener);
      });
      return;
    }

    setTimeout(function () {
      activePlayerAttack = cpuPlayer.submitAttack();

      if (activePlayerAttack === "invalid guess") {
        return activePlayerAttack;
      }
      if (activePlayerAttack === 5) {
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
        console.log("Game Over");
        bodyTitle.textContent = cpuPlayer.announceAsWinner();
        populateLists("final", "CPU");
        ShipSunkFormat(
          activePlayerAttack,
          "CPU",
          cpuPlayer.oponentGameboard.shipObjects
        );
        pMoveResult.textContent = "(You = LOSER)";
        cMoveResult.textContent = "(CPU = WINNER!)";
        gameInProgress = false;
        cGridSquares.forEach((spot) => {
          spot.removeEventListener("click", clickEventListener);
        });
        return;
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
        pMoveResult.textContent = "CPU Missed! ❌";
        console.log("MISS");
      }
      if (!Array.isArray(activePlayerAttack) && activePlayerAttack !== 5) {
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
        if (activePlayerAttack.sunk) {
          pMoveResult.textContent = `CPU has sunk your ${activePlayerAttack.name}! 🥲🪦`;
          populateLists(activePlayerAttack, "CPU");
          ShipSunkFormat(activePlayerAttack, "CPU");
        } else {
          pMoveResult.textContent = "CPU has hit a ship! 😬";
        }
      }
      bodyTitle.textContent = `Awaiting ${userPlayer.name}'s attack.`;
    }, 500);
  }

  //Game Initiation (with random ship placement)
  startGame.addEventListener("click", (e) => {
    gameInProgress = true;

    allGridSq.forEach((sq) => {
      sq.style.backgroundColor = "transparent";
      sq.textContent = "";
    });

    populateLists();

    userPlayer = playerFactory(document.querySelector("#name").value);
    cpuPlayer = playerFactory("CPU");
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

    //Remove event listeners from cGridSquares
    cGridSquares.forEach((spot) => {
      spot.removeEventListener("click", clickEventListener);
    });

    //Add new Event Listener
    cGridSquares.forEach((square) => {
      square.addEventListener("click", clickEventListener);
    });

    //end
  });
}
