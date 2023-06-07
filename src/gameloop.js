import { playerFactory } from "./player";

export function newGameLoop() {
  const bodyTitle = document.querySelector(".body-title");
  const startGame = document.querySelector(".start-game");
  const allGridSq = document.querySelectorAll(".grid-square");
  const pGridSquares = document.querySelectorAll(".p-grid");
  const cGridSquares = document.querySelectorAll(".c-grid");

  //function to remove click event listener from c-grid
  function removeClickListener(square) {
    square.removeEventListener("click", clickHandler);
    square.textContent = "";
  }

  function clickHandler(e) {
    const playerTurn = cpuPlayer.submitAttack(JSON.parse(e.target.id));
    console.log(playerTurn);
    if (playerTurn === null) {
      e.target.style.backgroundColor = "#1515d4";
      e.target.textContent = "·";
    } else {
      e.target.style.backgroundColor = "#d47974";
      e.target.textContent = "X";
    }
    if (playerTurn === 5) {
      return playerTurn;
    }
  }

  let cpuPlayer;

  //Game Initiation (with random ship placement)
  startGame.addEventListener("click", (e) => {
    allGridSq.forEach((sq) => {
      sq.style.backgroundColor = "transparent";
    });

    cGridSquares.forEach((square) => {
      removeClickListener(square);
    });

    const userPlayer = playerFactory(document.querySelector("#name").value);
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
    //   });

    //console logging ship locations

    for (let s = 0; s < cpuPlayer.oponentGameboard.shipObjects.length; s++) {
      console.log(cpuPlayer.oponentGameboard.shipObjects[s]);
      console.log(cpuPlayer.oponentGameboard.shipObjects[s].location);
    }

    //attack loop
    let activePlayer = "user";
    if (
      userPlayer.oponentGameboard.shipsSunk < 5 ||
      cpuPlayer.oponentGameboard.shipsSunk < 5
    ) {
      if (activePlayer === "user") {
        bodyTitle.textContent = `Awaiting ${userPlayer.name}'s Attack`;

        cGridSquares.forEach((square) => {
          removeClickListener(square);

          square.addEventListener("click", clickHandler);
          activePlayer = "CPU";
        });
      } else {
        userPlayer.submitAttack();
        activePlayer = "user";
      }
    }
    console.log("GAME OVER");
  });
}

//using while loop to run through player guess and cpu random guess
//once one of the board's shipsSunk is 5 => run a determination for a winner

// import { playerFactory } from "./player";

// export function newGameLoop() {
//   const bodyTitle = document.querySelector(".body-title");
//   const startGame = document.querySelector(".start-game");
//   const allGridSq = document.querySelectorAll(".grid-square");
//   const pGridSquares = document.querySelectorAll(".p-grid");
//   const cGridSquares = document.querySelectorAll(".c-grid");

//   //function to remove click event listener from c-grid
//   function removeClickListener(square) {
//     if (square) {
//       const clone = square.cloneNode(true);
//       square.parentNode.replaceChild(clone, square);
//     }
//   }

//   //Game Initiation (with random ship placement)
//   startGame.addEventListener("click", (e) => {
//     allGridSq.forEach((sq) => {
//       sq.style.backgroundColor = "transparent";
//     });

//     cGridSquares.forEach((square) => {
//       removeClickListener(square);
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

//     //console logging ship locations

//     for (let s = 0; s < cpuPlayer.oponentGameboard.shipObjects.length; s++) {
//       console.log(cpuPlayer.oponentGameboard.shipObjects[s]);
//       console.log(cpuPlayer.oponentGameboard.shipObjects[s].location);
//     }

//     //attack loop

//     if (
//       userPlayer.oponentGameboard.shipsSunk < 5 ||
//       cpuPlayer.oponentGameboard.shipsSunk < 5
//     ) {
//       bodyTitle.textContent = `Awaiting ${userPlayer.name}'s Attack`;

//       cGridSquares.forEach((square) => {
//         removeClickListener(square);

//         square.addEventListener("click", (e) => {
//           const playerTurn = cpuPlayer.submitAttack(JSON.parse(e.target.id));
//           console.log(playerTurn);
//           if (playerTurn === null) {
//             square.style.backgroundColor = "#1515d4";
//             square.textContent = "·";
//           } else {
//             square.style.backgroundColor = "#d47974";
//             square.textContent = "X";
//           }
//         });
//       });
//     } else {
//       console.log("GAME OVER");
//     }
//   });
// }
