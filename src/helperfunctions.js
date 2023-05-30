export function createDiv(className, idName) {
  const div = document.createElement("div");
  div.className = className;
  div.id = idName;
  div.id === "undefined" ? (div.id = className) : "";
  return div;
}

export function createImg(className, idName) {
  const img = new Image();
  img.className = className;
  img.id = idName;
  img.id === "undefined" ? (img.id = className) : "";
  return img;
}

export function createInput(inputType, inputId, inputName, inputPlaceholder) {
  const input = document.createElement("input");
  input.type = inputType;
  input.id = inputId;
  inputName = inputName;
  input.placeholder = inputPlaceholder;
  return input;
}

export function createButton(btnClass, btnTextContent) {
  const button = document.createElement("button");
  button.className = btnClass;
  button.textContent = btnTextContent;
  return button;
}

export function generateCoor(i) {
  const boardSize = 10;
  const board = [];

  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      let coor = [r, c];
      board.push(coor);
    }
  }
  return board[i];
}
