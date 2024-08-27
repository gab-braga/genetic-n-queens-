import {
    generateInitialPopulation,
    formatHtmlForBoard
} from "/js/service.js";

const SIZE_BOARD = 8

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
    const root = document.querySelector("#root");
    const size = document.querySelector("#size").value || 0;
    const population  = generateInitialPopulation(size, SIZE_BOARD);
    let contentRoot = "";
    population.forEach(queens => {
        contentRoot += formatHtmlForBoard(queens);
    })
    root.innerHTML = contentRoot;

})

