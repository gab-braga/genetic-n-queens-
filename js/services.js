import { generateQueens, randInt } from "./utils.js";

function debug() {
    const queens = generateQueens(8);
    const fitness = calculateFitness(queens, 8);
    console.log(queens);
    console.log(fitness);
}

function generatePopulation(populationSize, boardSize) {
    let population = [];
    for(let i = 0; i < populationSize; i++) {
        let queens = generateQueens(boardSize);
        let fitness = calculateFitness(queens, boardSize);
        population.push({ queens, fitness });
    }
    return population;
}

function getSolution(population) {
    let size = population.length;
    for(let i = 0; i < size; i++) {
        const { queens, fitness } = population[i];
        if(fitness <= 0) {
            return [{ queens, fitness }];
        }
    }
}

function calculateFitness(queens, size) {
    let collisions = 0;
    for(let i = 0; i < size; i++) {
        const q1 = queens[i];
        for(let j = 0; j < size; j++) {
            const q2 = queens[j];
            if(i == j) continue;
            const dif_x = Math.abs(q1.x - q2.x);
            const dif_y = Math.abs(q1.y - q2.y);
            const diagonal = dif_x === dif_y;
            const vertical = q1.x === q2.x;
            const horizontal = q1.y === q2.y;
            if(diagonal || vertical || horizontal)
                collisions++
        }
    }
  return collisions;
}

function select(population, boardSize) {
    const selection = [];
    const size = population.length;
    const roulette = [];
    const maxFitness = boardSize * (boardSize - 1);
    let maxFactor = 0;
    
    for(let i = 0; i < size; i++) {
        const { queens, fitness } = population[i];
        const factor = maxFitness - fitness;
        maxFactor += factor;
        roulette.push({ queens, fitness, factor });
    };

    for(let i = 0; i < size; i++) {
        let choice = randInt(1, maxFactor);
        for(let j = 0; j < size; j++) {
            const { queens, fitness, factor } = roulette[j];
            if(choice <= factor) {
                selection.push({ queens, fitness });
                break;
            }
            choice -= factor;
        }
    }
    return selection;
}

function crossover(population, boardSize) {
    const children = [];
    const size = population.length;
    const cut = randInt(0, boardSize-1);

    for(let i = 0; (i+1) < size; i += 2) {
        const father = population[i];
        const mother = population[i+1];

        const genes1 = father.queens.slice(0, cut);
        const genes2 = father.queens.slice(cut);
        const genes3 = mother.queens.slice(0, cut);
        const genes4 = mother.queens.slice(cut);

        const child1 = [...genes1, ...genes4];
        const child2 = [...genes3, ...genes2];
        
        const fit1 = calculateFitness(child1, boardSize);
        const fit2 = calculateFitness(child2, boardSize);
        
        children.push({ queens: child1, fitness: fit1 });
        children.push({ queens: child2, fitness: fit2 });
    }
    return children;
}

function mutate(population, boardSize) {
    const geration = [];
    const size = population.length;
    for(let i = 0; i < size; i++) {
        
        const { queens } = population[i];
        for(let j = 0; j < boardSize; j++) {
            const gene = queens[j];
            const test = randInt(0, 100);
            if(test <= 5) {
                const y = randInt(0, boardSize-1);
                gene.y = y;
            }
        };
        
        const fitness = calculateFitness(queens, boardSize);
        geration.push({ queens, fitness });
    };
    return geration;
}

export {
    generatePopulation,
    getSolution,
    select,
    crossover,
    mutate
};

