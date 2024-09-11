import { bubbleSort, formatHTML, sleep } from "./utils.js";

const area = document.querySelector("#area");
const subtitle = document.querySelector("#subtitle");

const SPEED = 100;

export async function show(population, count, speed = SPEED) {
  bubbleSort(population);
  subtitle.innerHTML = `${count}° Geração`;
  area.innerHTML = formatHTML(population);
  await sleep(SPEED);
}
