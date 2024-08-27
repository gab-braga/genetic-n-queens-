function generateInitialPopulation(populationSize, boardSize) {
    let population = [];
    for(let i = 0; i < populationSize; i++) {
        let individual = generateQueens(boardSize)
        population.push(individual)
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

function formatHtmlForBoard(queens) {
    let html = "<table class='board'>";
    const board = generateBoardMap(queens);
    const size = queens.length;
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

export { generateInitialPopulation, formatHtmlForBoard }