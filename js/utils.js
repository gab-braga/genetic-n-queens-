function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function bubbleSort(population) {
  let size = population.length;
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size - i - 1; j++) {
      const a = population[j].fitness;
      const b = population[j + 1].fitness;
      if (a > b) {
        let temp = population[j];
        population[j] = population[j + 1];
        population[j + 1] = temp;
      }
    }
}

function generateQueens(size) {
  const queens = [];
  const maxIndex = size - 1;
  for (let x = 0; x < size; x++) {
    const y = randInt(0, maxIndex);
    queens.push({ x, y });
  }
  return queens;
}

function copyQueens(queens) {
  const copy = [];
  const size = queens.length;
  for (let i = 0; i < size; i++) {
    const q = queens[i];
    copy.push({ ...q });
  }
  return copy;
}

function choice(list) {
  let size = list.length;
  let index = randInt(0, size - 1);
  return list[index];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

function formatHTML(population) {
  let content = "";
  population.forEach((individual) => {
    content += formatHTMLBoard(individual);
  });
  return content;
}

function formatHTMLBoard({ queens, fitness }) {
  let html = `<table class="board">`;
  const size = queens.length;
  html += `<thead><tr><th colspan='${size}'> Collisions: ${fitness}</th></tr></thead>`;
  const board = generateBoardMap(queens);
  html += "<tbody>";
  for (let y = 0; y < size; y++) {
    html += "<tr>";
    for (let x = 0; x < size; x++) {
      if (board[y][x]) html += "<td class='queen'>";
      else html += "<td>";
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
  for (let i = 0; i < size; i++) {
    const { y, x } = queens[i];
    board[y][x] = true;
  }
  return board;
}

function generateEmptyBoardMap(size) {
  let board = [];
  for (let y = 0; y < size; y++) {
    let row = [];
    for (let x = 0; x < size; x++) row.push(false);
    board.push(row);
  }
  return board;
}

export {
  sleep,
  bubbleSort,
  generateQueens,
  copyQueens,
  randInt,
  choice,
  formatHTML,
};
