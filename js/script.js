import {
    generateInitialPopulation,
    bubbleSort,
    formatHTML,
    selectIndividuals,
    getSolution,
    crossover,
    mutation,
    sleep
} from "./service.js";

const SPEED = 100;
const MIN_SELECT = 30;
const form = document.querySelector("#form");
const modal = document.querySelector("#modal");
const btnZoomIn = document.querySelector(".zoom #in");
const btnZoomOut = document.querySelector(".zoom #out");
const area = document.querySelector("#area");
const subtitle = document.querySelector("#subtitle");

let zoom = 6;
let generation_number = 0;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const size = data.get("size");
    const boardSize = data.get("board");

    modal.classList.add("hidden");
    init(size, boardSize);
});

btnZoomIn.addEventListener("click", () => {
    zoom += 2;
    zoom = (zoom > 20) ? 20 : zoom;
    area.style.fontSize = `${zoom}px`;
});

btnZoomOut.addEventListener("click", () => {
    zoom -= 2;
    zoom = (zoom < 2) ? 2 : zoom;
    area.style.fontSize = `${zoom}px`;
});

function init(size, boardSize) {
    const population  = generateInitialPopulation(size, boardSize);
    genetic(population, boardSize);
}

async function genetic(population, boardSize) {
    generation_number++;

    let solution;
    await show(population);

    solution = getSolution(population);
    if(!!solution) {
        show(solution);
        return;
    }
    
    const selection = selectIndividuals(population, boardSize,MIN_SELECT, 0.8);
    const size = selection.length;
    
    const children = crossover(selection, boardSize);

    solution = getSolution(children);
    if(!!solution) {
        show(solution);
        return;
    }

    const geration = mutation(children, boardSize);

    await genetic(geration, boardSize);
}

async function show(population) {
    bubbleSort(population);
    subtitle.innerHTML = `${generation_number}° Geração`
    area.innerHTML = formatHTML(population);
    await sleep(SPEED);
}