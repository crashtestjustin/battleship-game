import { gameloop } from "./gameloop";
import {
  createDiv,
  createButton,
  createInput,
  createImg,
} from "./helperfunctions";

export function header() {
  const section = createDiv("header");

  const title = createDiv("title");
  title.textContent = "Battleship Game";

  section.appendChild(title);

  return section;
}

export function body() {
  const section = createDiv("body");

  const title = createDiv("body-title");
  title.textContent = "Provide your name to start the game.";

  const gameInputs = createDiv("game-inputs");
  const inputTitle = createDiv("player-name-title");
  inputTitle.textContent = "Your Name:";
  const playerName = createInput(
    "text",
    "name",
    "name",
    "Enter your name captain!"
  );
  const startGameButton = createButton("start-game", "Start Game");
  gameInputs.append(inputTitle, playerName, startGameButton);

  const boardDiv = createDiv("board-div");
  boardDiv.classList.add("player-board");
  for (let i = 0; i < 100; i++) {
    const boardSquare = createDiv("grid-square");
    boardDiv.appendChild(boardSquare);
  }

  const cpuBoardDiv = createDiv("board-div");
  cpuBoardDiv.classList.add("cpu-board");
  for (let i = 0; i < 100; i++) {
    const boardSquare = createDiv("grid-square");
    cpuBoardDiv.appendChild(boardSquare);
  }

  section.appendChild(title);
  section.append(gameInputs, boardDiv, cpuBoardDiv);

  return section;
}

export function footer() {
  const section = createDiv("footer");

  const title = createDiv("title");
  title.textContent = "Footer";

  section.appendChild(title);

  return section;
}
