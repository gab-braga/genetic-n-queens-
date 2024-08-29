import {
    generateInitialPopulation,
    bubbleSort,
    formatHTML,
    selectIndividuals
} from "/js/service.js";

const BOARD_SIZE = 8;
const POPULATION_SIZE = 10;
const root = document.querySelector("#root");

function init() {
    const population  = generateInitialPopulation(POPULATION_SIZE, BOARD_SIZE);
    bubbleSort(population);
    genetic(population);
}

function genetic(population) {
    root.innerHTML = formatHTML(population);
    const selection = selectIndividuals(population, BOARD_SIZE, 0.8);
    // root.innerHTML = formatHTML(selection);
}

init();