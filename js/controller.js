import { init } from "./main.js";

const form = document.querySelector("#form");
const modal = document.querySelector("#modal");
const btnZoomIn = document.querySelector(".zoom #in");
const btnZoomOut = document.querySelector(".zoom #out");
const area = document.querySelector("#area");

let zoom = 6;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const size = Number(data.get("size"));
  const boardSize = Number(data.get("board"));

  modal.classList.add("hidden");
  init(size, boardSize);
});

btnZoomIn.addEventListener("click", () => {
  zoom += 2;
  zoom = zoom > 20 ? 20 : zoom;
  area.style.fontSize = `${zoom}px`;
});

btnZoomOut.addEventListener("click", () => {
  zoom -= 2;
  zoom = zoom < 2 ? 2 : zoom;
  area.style.fontSize = `${zoom}px`;
});
