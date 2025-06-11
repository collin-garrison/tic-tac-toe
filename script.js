/*
When start game is pressed, change scoreboard text to those names
Display player 1's turn in status
When player 1 clicks a square, change the text to X
Display player 2's turn in status
When player 2 clicks a square, change the text to 0
*/

const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => {
        return board;
    }

    const setCell = (index, value) => {
        if (index >= 0 && index < board.length) {
            board[index] = value;
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    }

    return { getBoard, setCell, resetBoard }
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (() => {
    const startButton = document.getElementById('startGame');
    const resetButton = document.getElementById('resetGame');
    const cells = document.querySelectorAll('.cell');
    const setupControls = document.querySelectorAll('.setupControl');
    const gameControls = document.querySelectorAll('.gameControl');
    const player1NameInput = document.getElementById('player1NameInput');
    const player2NameInput = document.getElementById('player2NameInput');
    const player1NameDisplay = document.getElementById('player1NameDisplay');
    const player2NameDisplay = document.getElementById('player2NameDisplay');
    let player1 = null;
    let player2 = null;
    let player1Name = 'Player 1';
    let player2Name = 'Player 2';
    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = null;
    let gameStarted = false;

    const updateStatus = (message) => {
        const statusDisplay = document.getElementById('statusDisplay');
        statusDisplay.textContent = message;
    }

    const displayTurn = () => {
        updateStatus(`${currentPlayer.name}'s turn`);
    }

    startButton.addEventListener('click', () => {
        if (player1NameInput.value) {
            player1Name = player1NameInput.value;
        }
        if (player2NameInput.value) {
            player2Name = player2NameInput.value;
        }

        setupControls.forEach(control => control.classList.add('hidden'));
        gameControls.forEach(control => control.classList.remove('hidden'));

        player1NameDisplay.textContent = player1Name;
        player2NameDisplay.textContent = player2Name;

        player1 = Player(player1Name, 'X');
        player2 = Player(player2Name, 'O');
        currentPlayer = player1;

        gameStarted = true;

        displayTurn();
    })

    resetButton.addEventListener('click', () => {
        Gameboard.resetBoard();

        player1Name = 'Player 1';
        player2Name = 'Player 2';
        player1Score = 0;
        player2Score = 0;
        player1NameInput.value = '';
        player2NameInput.value = '';
        player1NameDisplay.textContent = 'Player 1';
        player2NameDisplay.textContent = 'Player 2';
        currentPlayer = null;
        gameStarted = false;

        setupControls.forEach(control => control.classList.remove('hidden'));
        gameControls.forEach(control => control.classList.add('hidden'));
        cells.forEach(cell => {
            cell.textContent = '';
            cell.removeEventListener('click', handleCellClick);
        })

        updateStatus('Game reset. Please enter player names.');
    });

    const handleCellClick = (event) => {
        if (gameStarted && event.target.textContent === '') {
            const cellIndex = event.target.dataset.index;
            Gameboard.setCell(cellIndex, currentPlayer.marker);
            event.target.textContent = currentPlayer.marker;
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            displayTurn();
        }
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
})();