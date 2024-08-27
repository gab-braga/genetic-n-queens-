import { generateInitialPopulation } from "/js/service.js";

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
    const root = document.querySelector("#root");
    const size = document.querySelector("#size").value || 0;
    const population  = generateInitialPopulation(size);
    let contentRoot = "";
    population.forEach(popu => {
        contentRoot += genereateHtmlForBoard(popu);
    })
    root.innerHTML = contentRoot;

})

function genereateHtmlForBoard(queens) {
    let html = "<table class='board'>";
    const board = generateBoardMap(queens);
    let size = queens.length;
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

function generateEmptyBoardMap(size) {
    let board = [];
    for(let y = 0; y < size; y++) {
        let row = [];
        for(let x = 0; x < size; x++) {
            row.push(false);
        }
        board.push(row);
    }
    return board;
}

function generateBoardMap(queens) {
    let size = queens.length;
    const board = generateEmptyBoardMap(size);
    queens.forEach(qn => {
        board[qn.y][qn.x] = true;
    })
    return board;
}