const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset-button');


let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameWon = false;

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return !gameBoard.includes('');
}

function handleCellClick(cell, index) {
    if (!cell.textContent && !gameWon) {
        cell.textContent = currentPlayer;
        gameBoard[index] = currentPlayer;

        if (checkWin()) {
            result.textContent = `Player ${currentPlayer} wins!`;
            gameWon = true;
        } else if (checkDraw()) {
            result.textContent = "It's a draw!";
            gameWon = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            result.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function handleReset() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameWon = false;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    result.textContent = `Player ${currentPlayer}'s Turn`;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(cell, index);
    });
});

resetButton.addEventListener('click', handleReset);