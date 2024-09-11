import {
  generatePopulation,
  getSolution,
  select,
  crossover,
  mutate,
} from "./services.js";
import { show } from "./render.js";

let count = 0;

function init(size, boardSize) {
  const population = generatePopulation(size, boardSize);
  return genetic(population, boardSize);
}

async function genetic(population, boardSize) {
  let solution;
  count++;

  await show(population, count);

  solution = getSolution(population);
  if (!!solution) {
    show(solution, count);
    return;
  }

  const selection = select(population, boardSize);
  const children = crossover(selection, boardSize);

  solution = getSolution(children);
  if (!!solution) {
    show(solution, count);
    return;
  }

  const geration = mutate(children, boardSize);

  await genetic(geration, boardSize);
}

export { init, genetic };
