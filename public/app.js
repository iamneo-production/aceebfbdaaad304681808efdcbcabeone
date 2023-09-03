// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player moves
const ticTacToe = (element, index) => {
    // Check if the cell is empty and the game is ongoing
    if (cells[index] === '' && !isGameWon()) {
        cells[index] = currentPlayer;
        element.innerText = currentPlayer;

        // Check for a win
        if (isGameWon()) {
            result.innerText = `Player ${currentPlayer} wins!`;
            disableAllButtons();
        } else if (cells.every(cell => cell !== '')) {
            result.innerText = "It's a draw!";
        } else {
            // Switch to the other player's turn
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            result.innerText = `Player ${currentPlayer}'s Turn`;
        }
    }
};

// Function to check for a win
const isGameWon = () => {
    for (const condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return true;
        }
    }
    return false;
};

// Function to disable all buttons
const disableAllButtons = () => {
    btns.forEach(btn => (btn.disabled = true));
};

// Function to reset the game
const resetGame = () => {
    // Reset game state
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';

    // Clear the board
    btns.forEach(btn => {
        btn.innerText = '';
        btn.disabled = false;
    });

    // Reset result message
    result.innerText = `Player ${currentPlayer}'s Turn`;
};

// Add click event listeners to buttons
btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

// Add click event listener to the reset button
document.querySelector('#reset').addEventListener('click', resetGame);

// Initialize the game
result.innerText = `Player ${currentPlayer}'s Turn`;
