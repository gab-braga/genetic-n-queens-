import {
    generateInitialPopulation,
    bubbleSort,
    formatHTML,
    selectIndividuals,
    getSolution,
    crossover,
    mutation
} from "/js/service.js";

const BOARD_SIZE = 8;
const POPULATION_SIZE = 100;
const SPEED = 500;
const root = document.querySelector("#root");

function init() {
    const population  = generateInitialPopulation(POPULATION_SIZE, BOARD_SIZE);
    genetic(population);
}

async function genetic(population) {
    let solution;
    await show(population);


    solution = getSolution(population);
    if(!!solution) {
        show(solution);
        return;
    }
    
    const selection = selectIndividuals(population, BOARD_SIZE, 0.8);
    const children = crossover(selection, BOARD_SIZE);

    await show(children);

    solution = getSolution(children);
    if(!!solution) {
        show(solution);
        return;
    }

    const geration = mutation(children, BOARD_SIZE);

    await genetic(geration);
}

async function show(population) {
    bubbleSort(population);
    root.innerHTML = formatHTML(population);
    await sleep(SPEED);
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

init();