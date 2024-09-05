function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
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

function generateQueens(size) {
    const queens = [];
    let cols = generateCols(size);
    for(let x = 0; x < size; x++) {
        let y = choice(cols);
        queens.push({ x, y });
        cols = removeElem(y, cols)
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

function choice(list) {
    let size = list.length;
    let index = randInt(0, size - 1);
    return list[index];
}

function randInt(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

function removeElem(elem, list) {
    let clone = [...list]
    let index = clone.indexOf(elem);
    clone.splice(index, 1);
    return clone;
}

function formatHTML(population) {
    let content = "";
    population.forEach(individual => {
        content += formatHTMLBoard(individual);
    })
    return content;
}

function formatHTMLBoard({ queens, fitness }) {
    let html = `<table class="board">`;
    const size = queens.length;
    html += `<thead><tr><th colspan='${size}'> Collisions: ${fitness}</th></tr></thead>`;
    const board = generateBoardMap(queens);
    html += "<tbody>";
    for(let y = 0; y < size; y++) {
        html += "<tr>";
        for(let x = 0; x < size; x++) {
            if(board[y][x])
                html += "<td class='queen'>";
            else
                html += "<td>";
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
    for(let i = 0; i < size; i++) {
        const { y, x } = queens[i];
        board[y][x] = true;
    }
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

export {
  sleep,
  bubbleSort,
  generateQueens,
  generateCols,
  randInt,
  choice,
  removeElem,
  formatHTML
};