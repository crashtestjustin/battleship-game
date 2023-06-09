//DOM functionality below here

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
