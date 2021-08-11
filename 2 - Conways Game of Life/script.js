"use strict";

const WIDTH = 23;
const HEIGHT = 13;

let isMouseHeldDown = false;

function setFutureCellState(cellNumber) {
    const cell = document.getElementById('cell' + cellNumber);
    const neighborsAlive = getCellNeighbourAmount(cellNumber);
    if (neighborsAlive < 2 || neighborsAlive > 3) {
        cell.classList += ' quantum-dead';
    } else if (neighborsAlive === 3 || (neighborsAlive === 2 && isCellAlive(cellNumber))) {
        cell.classList += ' quantum-alive';
    }
}

function getCellNeighbourAmount(cellNumber) {
    let neighborsAlive = 0;
    const upperBorder = cellNumber < WIDTH;
    const lowerBorder = cellNumber >= WIDTH * HEIGHT - WIDTH;
    const leftBorder = cellNumber % WIDTH === 0;
    const rightBorder = cellNumber % WIDTH === (WIDTH - 1);

    if (!upperBorder) {
        // check upper row neigbors
        if (isCellAlive(cellNumber - 1 - WIDTH) && !leftBorder) neighborsAlive++;
        if (isCellAlive(cellNumber - WIDTH)) neighborsAlive++;
        if (isCellAlive(cellNumber + 1 - WIDTH) && !rightBorder) neighborsAlive++;
    }

    // check same row neigbors
    if (isCellAlive(cellNumber - 1) && !leftBorder) neighborsAlive++;
    if (isCellAlive(cellNumber + 1) && !rightBorder) neighborsAlive++;

    if (!lowerBorder) {
        // check low row neigbors
        if (isCellAlive(cellNumber - 1 + WIDTH) && !leftBorder) neighborsAlive++;
        if (isCellAlive(cellNumber + WIDTH)) neighborsAlive++;
        if (isCellAlive(cellNumber + 1 + WIDTH) && !rightBorder) neighborsAlive++;
    }
    return neighborsAlive;
}

function isCellAlive(cellNumber) {
    const cell = document.getElementById('cell' + cellNumber);
    return cell && cell.classList.contains('alive');
}

function createGameField(gameFieldId, width, height) {
    for (let y = 0; y < height * width; y++) {
        addGameCell(gameFieldId, y);
        if ((y + 1) % width == 0) {
            document.getElementById(gameFieldId).innerHTML += '<br>';
        }
    }
    addCellListeners();
}

function addGameCell(gameFieldId, cellNumber) {
    const cell = document.createElement('div');
    cell.id = 'cell' + cellNumber;
    cell.classList = 'cell dead';
    document.getElementById(gameFieldId).appendChild(cell);
}

function addCellListeners() {
    document.addEventListener("mousedown", (e) => isMouseHeldDown = true);
    document.addEventListener("mouseup", (e) => isMouseHeldDown = false);
    Array.from(document.querySelectorAll('.cell')).forEach(cell => {
        cell.addEventListener("click", (e) => toggleCellState(e.target.id));
        cell.addEventListener("mouseover", (e) => {
            if (isMouseHeldDown) {
                toggleCellState(e.target.id)
            }
        });
    });
}

function toggleCellState(cellId) {
    if (document.getElementById(cellId).classList.contains('alive')) {
        document.getElementById(cellId).classList = 'cell dead';
    } else {
        document.getElementById(cellId).classList = 'cell alive';
    }
}