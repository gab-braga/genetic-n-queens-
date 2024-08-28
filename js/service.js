function generateInitialPopulation(populationSize, boardSize) {
    let population = [];
    for(let i = 0; i < populationSize; i++) {
        let individual = generateQueens(boardSize)
        population.push(individual)
    }
    bubbleSort(population, calculateFitness)
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

function formatHtmlForBoard(queens) {
    let html = `<table class="board">`;
    const size = queens.length;
    const collisions = calculateFitness(queens);
    html += `<thead><tr><th colspan='${size}'> Collisions: ${collisions}</th></tr></thead>`;
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
    queens.forEach(({y, x}) => {
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

function bubbleSort(population, fitness) {
  let size = population.length;
  for(let i = 0; i < size; i++)
    for(let j = 0; j < (size-i-1); j++) {
        const a = fitness(population[j]);
        const b = fitness(population[j+1]);
        if(a > b) {
            let temp = population[j];
            population[j] = population[j+1];
            population[j+1] = temp;

        }
    }

}

export { generateInitialPopulation, formatHtmlForBoard }