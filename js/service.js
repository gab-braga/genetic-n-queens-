function generateInitialPopulation(populationSize, boardSize) {
    let population = [];
    for(let i = 0; i < populationSize; i++) {
        let queens = generateQueens(boardSize);
        let fitness = calculateFitness(queens);
        population.push({ queens, fitness });
    }
    return population;
}

function generateQueens(size) {
    const queens = [];
    let cols = generateCols(size);
    for(let x = 0; x < size; x++) {
        let y = choiceInList(cols);
        queens.push({ x, y });
        cols = removeInList(y, cols)
    }
    return queens;
}

function generateCols(size) {
    const cols = [];
    for(let idx = 0; idx < size; idx++) {
        cols.push(idx);
    }
    return cols;
}

function choiceInList(list) {
    let size = list.length;
    let index = getRandInt(0, size - 1);
    return list[index];
}

function getRandInt(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

function removeInList(elem, list) {
    let clone = [...list]
    let index = clone.indexOf(elem);
    clone.splice(index, 1);
    return clone;
}

function formatHTML(population) {
    let content = "";
    population.forEach(individual => {
        content += formatHTMLForBoard(individual);
    })
    return content;
}

function formatHTMLForBoard({ queens, fitness }) {
    let html = `<table class="board">`;
    const size = queens.length;
    html += `<thead><tr><th colspan='${size}'> Collisions: ${fitness}</th></tr></thead>`;
    const board = generateBoardMap(queens);
    html += "<tbody>";
    for(let y = 0; y < size; y++) {
        html += "<tr>";
        for(let x = 0; x < size; x++) {
            if(board[y][x]) {
                html += "<td class='queen'>";
            } else {
                html += "<td>";
            }
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    return html;
}

function generateBoardMap(queens) {
    let size = queens.length;
    const board = generateEmptyBoardMap(size);
    queens.forEach(({ y, x }) => {
        board[y][x] = true;
    })
    return board;
}

function generateEmptyBoardMap(size) {
    let board = [];
    for(let y = 0; y < size; y++) {
        let row = [];
        for(let x = 0; x < size; x++)
            row.push(false);
        board.push(row);
    }
    return board;
}

function calculateFitness(queens) {
    let collisions = 0;
    queens.forEach(q1 => {
        queens.forEach(q2 => {
            if(q1.x != q2.x && q1.y != q2.y) {
                const dif_x = Math.abs(q1.x - q2.x);
                const dif_y = Math.abs(q1.y - q2.y);
                if(dif_x == dif_y) collisions++;
            }
        })
    })
  return collisions;
}

function bubbleSort(population) {
  let size = population.length;
  for(let i = 0; i < size; i++)
    for(let j = 0; j < (size-i-1); j++) {
        const a = population[j].fitness;
        const b = population[j+1].fitness;
        if(a > b) {
            let temp = population[j];
            population[j] = population[j+1];
            population[j+1] = temp;

        }
    }

}

function selectIndividuals(population, sizeBoard, per) {
    const selection = [];
    const roulette = [];
    const maxFitness = sizeBoard * (sizeBoard - 1);
    let maxFactor = 0;
    
    population.forEach(({ queens, fitness }) => {
        const factor = maxFitness - fitness;
        maxFactor += factor;
        roulette.push({ queens, fitness, factor });
    });

    const size = roulette.length;
    const count = size * per;
    for(let i = 0; i < count; i++) {
        let choice = getRandInt(1, maxFactor);
        for(let j = 0; j < size; j++) {
            const { queens, fitness, factor } = roulette[j];
            if(choice <= factor) {
                selection.push({ queens, fitness });
                roulette.splice(j, 1);
                maxFactor -= factor;
                break;
            }
            choice -= factor;
        }
    }
    return selection;
}

export { generateInitialPopulation, bubbleSort, formatHTML, selectIndividuals }