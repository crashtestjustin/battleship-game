//DOM functionality below here
const bodyTitle = document.querySelector(".body-title");
const startGame = document.querySelector(".start-game");
const allGridSq = document.querySelectorAll(".grid-square");
const pGridSquares = document.querySelectorAll(".p-grid");
const cGridSquares = document.querySelectorAll(".c-grid");

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
