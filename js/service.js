const SIZE_BOARD = 8

function getRandInt(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

function choiceInList(list) {
    let size = list.length;
    let index = getRandInt(0, size - 1);
    return list[index];
}

function removeInList(elem, list) {
    let clone = [...list]
    let index = clone.indexOf(elem);
    clone.splice(index, 1);
    return clone;
}

function generateInitialPopulation(size) {
    let population = [];
    for(let i = 0; i < size; i++) {
        let individuo = generateQueens()
        population.push(individuo)
    }
    return population;
}

function generateQueens() {
    const queens = [];
    let cols = generateCols();
    for(let x = 0; x < SIZE_BOARD; x++) {
        let y = choiceInList(cols);
        queens.push({ x, y });
        cols = removeInList(y, cols)
    }
    return queens;
}

function generateCols() {
    const cols = [];
    for(let idx = 0; idx < SIZE_BOARD; idx++) {
        cols.push(idx);
    }
    return cols;
}

export { generateInitialPopulation }