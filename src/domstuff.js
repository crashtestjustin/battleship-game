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

  const title = createDiv("title");
  title.textContent = "Body";

  const gameInputs = createDiv("game-inputs");
  const playerName = createInput("text", "name", "name", "Enter your name.");
  gameInputs.appendChild(playerName);

  const boardDiv = createDiv("board-div");

  section.appendChild(title);
  section.append(gameInputs, boardDiv);

  return section;
}

export function footer() {
  const section = createDiv("footer");

  const title = createDiv("title");
  title.textContent = "Footer";

  section.appendChild(title);

  return section;
}
