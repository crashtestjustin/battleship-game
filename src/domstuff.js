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

  const radioDiv = createDiv("radio-div");

  const randomDiv = createDiv("random-div");
  const label1 = document.createElement("label");
  label1.innerHTML = "Random";
  const randomSel = createInput("radio", "radio1", "option", "random");
  randomSel.name = "option";
  randomDiv.append(label1, randomSel);

  const placeDiv = createDiv("place-div");
  const label2 = document.createElement("label");
  label2.innerHTML = "Place Ships";
  const placeSel = createInput("radio", "radio2", "option", "place");
  placeSel.name = "option";
  placeDiv.append(label2, placeSel);

  const vertDiv = createDiv("vertical-select");
  const label3 = document.createElement("label");
  label3.innerHTML = "Vertical";
  const vertical = createInput("checkbox", "is-vert", "checkbox");
  vertDiv.append(label3, vertical);

  radioDiv.append(randomDiv, placeDiv, vertDiv);

  const startGameButton = createButton("start-game", "Start Game");
  gameInputs.append(inputTitle, playerName, radioDiv, startGameButton);

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

  const allShips = [
    "Carrier",
    "Battleship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];

  const shipLists = createDiv("ship-lists");

  const playerList = createDiv("player-list");

  const pShipTitle = createDiv("ships-title");
  pShipTitle.textContent = "Your Ships Left";

  const pShipList = createDiv("p-ship-list");
  for (let p = 0; p < allShips.length; p++) {
    const pShip = createDiv(`${allShips[p]}`);
    pShip.classList.add("all-p-ships");
    pShip.textContent = `${allShips[p]}`;
    pShipList.appendChild(pShip);
  }

  const cpuList = createDiv("cpu-list");

  const cShipTitle = createDiv("ships-title");
  cShipTitle.textContent = "CPU Ships Left";

  const cShipList = createDiv("c-ship-list");
  for (let c = 0; c < allShips.length; c++) {
    const cShip = createDiv(`${allShips[c]}`);
    cShip.classList.add("all-c-ships");
    cShip.textContent = `${allShips[c]}`;
    cShipList.appendChild(cShip);
  }

  playerList.append(pShipTitle, pShipList);
  cpuList.append(cShipTitle, cShipList);
  shipLists.append(playerList, cpuList);

  section.appendChild(title);
  section.append(gameInputs, boardSection, shipLists);

  return section;
}

export function footer() {
  const section = createDiv("footer");

  const title = createDiv("title");

  const text = document.createElement("span");
  text.textContent = "Created by ";

  const hyper = document.createElement("a");
  hyper.href = "https://github.com/crashtestjustin/battleship-game";
  hyper.textContent = "Justin Elliott";

  title.append(text, hyper);

  section.appendChild(title);

  return section;
}
