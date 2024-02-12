/**
 * Generates a grid of random letters with hidden words.
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @returns {Array<Array<string>>} - The generated grid.
 */
function generateGrid(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            // Generate a random letter from A-Z
            let letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            row.push(letter);
        }
        grid.push(row);
    }
     // Hide words in the grid
     for (let i = 0; i < words.length; i++) {
        let word = words[i].toUpperCase();
        let row = Math.floor(Math.random() * rows);
        let col = Math.floor(Math.random() * (cols - word.length));
        for (let j = 0; j < word.length; j++) {
            grid[row][col + j] = word[j];
        }
    }
    return grid;
}


/**
 * Displays the grid and highlights the cells that are part of hidden words.
 * 
 * @param {Array<Array<string>>} grid - The grid to be displayed.
 * @param {Array<string>} words - The hidden words to be found in the grid.
 * @returns {void}
 */
function displayGrid(grid, words) {
    let gridElement = document.getElementById('grid');
    let table = document.createElement('table');
    table.className = 'grid-table'; // Add class to the table
    let foundWords = []; // Array to store the words that have been found

    for (let i = 0; i < grid.length; i++) {
        let rowElement = document.createElement('tr');
        for (let j = 0; j < grid[i].length; j++) {
            let cellElement = document.createElement('td');
            cellElement.className = 'grid-cell'; // Add class to the cell
            cellElement.textContent = grid[i][j];

            // Check if the cell is part of a hidden word
            for (let word of words) {
                if (grid[i].join('').includes(word.toUpperCase())) {
                    let start = grid[i].join('').indexOf(word.toUpperCase());
                    let end = start + word.length;
                    if (j >= start && j < end) {
                        cellElement.classList.add('correct');
                    }
                    break;
                }
            }

            // Add an event listener to the cell
            cellElement.addEventListener('click', function() {
                // Rest of your code...
            });

            rowElement.appendChild(cellElement);
        }
        table.appendChild(rowElement);
    }
    gridElement.appendChild(table);
}

let words = ['apple', 'banana', 'pear'];
let grid = generateGrid(10, 10, words); // Generate a 10x10 grid with hidden words
displayGrid(grid, words);

let timeLeft = 60;
let timerElement = document.getElementById('timer');

/**
 * The ID of the setInterval timer.
 * @type {number}
 */
let timerId = setInterval(function() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerId);
        alert('Time is up!');
    }
}, 1000);