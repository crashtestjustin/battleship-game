import { gameloop } from "./gameloop";
import {
  createDiv,
  createButton,
  createInput,
  createImg,
  generateCoor,
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

  const boardSection = createDiv("board-section");

  const pBoardSection = createDiv("board-titles");
  pBoardSection.classList.add("p-board-titles");

  const playerBoardTitle = createDiv("player-board-title");
  playerBoardTitle.textContent = "Your Fleet";
  pBoardSection.appendChild(playerBoardTitle);

  const playerMoveResult = createDiv("move-result");
  playerMoveResult.classList.add("p-move-result");
  playerMoveResult.textContent = "⛴️";
  pBoardSection.appendChild(playerMoveResult);

  const boardDiv = createDiv("board-div");
  boardDiv.classList.add("player-board");
  for (let i = 0; i < 100; i++) {
    const boardSquare = createDiv(
      "grid-square",
      JSON.stringify(generateCoor(i))
    );
    boardSquare.classList.add("p-grid");
    boardDiv.appendChild(boardSquare);
  }

  const cBoardSection = createDiv("board-titles");
  cBoardSection.classList.add("c-board-titles");

  const cpuBoardTitle = createDiv("cpu-board-title");
  cpuBoardTitle.textContent = "Sink Enemy Ships!";
  cBoardSection.appendChild(cpuBoardTitle);

  const cpuMoveResult = createDiv("move-result");
  cpuMoveResult.classList.add("c-move-result");
  cpuMoveResult.textContent = "⛴️";
  cBoardSection.appendChild(cpuMoveResult);

  const cpuBoardDiv = createDiv("board-div");
  cpuBoardDiv.classList.add("cpu-board");
  for (let i = 0; i < 100; i++) {
    const boardSquare = createDiv(
      "grid-square",
      JSON.stringify(generateCoor(i))
    );
    boardSquare.classList.add("c-grid");
    cpuBoardDiv.appendChild(boardSquare);
  }

  boardSection.append(pBoardSection, boardDiv, cBoardSection, cpuBoardDiv);

  section.appendChild(title);
  section.append(gameInputs, boardSection);

  return section;
}

export function footer() {
  const section = createDiv("footer");

  const title = createDiv("title");
  title.textContent = "Footer";

  section.appendChild(title);

  return section;
}
