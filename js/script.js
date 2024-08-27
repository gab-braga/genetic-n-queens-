import { generateInitialPopulation } from "/js/service.js";

const btn = document.querySelector("#btn");
const root = document.querySelector("#root");

btn.addEventListener("click", () => {
    const size = document.querySelector("#size").value || 0;
    const population  = generateInitialPopulation(size);
    console.log(population)
})