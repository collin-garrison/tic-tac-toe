/*
When start game is pressed, change scoreboard text to those names
Display player 1's turn in status
When player 1 clicks a square, change the text to X
Display player 2's turn in status
When player 2 clicks a square, change the text to 0
*/

const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const setCell = (index, value) => {
        if (index >= 0 && index < board.length) {
            board[index] = value;
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    }

    return {setCell, resetBoard}
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (() => {
    const startButton = document.getElementById('startGame');
    const resetButton = document.getElementById('resetGame');

    const setupControls = document.querySelectorAll('.setupControl');
    const gameControls = document.querySelectorAll('.gameControl');

    let player1Name = 'Player 1';
    let player2Name = 'Player 2';

    let currentPlayer;

    let gameStarted = false;

    const updateStatus = (message) => {
        const statusDisplay = document.getElementById('statusDisplay');
        statusDisplay.textContent = message;
    }

    const displayTurn = () => {
        updateStatus(`${currentPlayer.name}'s turn`);
    }

    startButton.addEventListener('click', () => {
        const player1NameInput = document.getElementById('player1NameInput');
        const player2NameInput = document.getElementById('player2NameInput');

        if (player1NameInput.value) {
            player1Name = player1NameInput.value;
        }
        if (player2NameInput.value) {
            player2Name = player2NameInput.value;
        }

        setupControls.forEach(control => control.classList.add('hidden'));
        gameControls.forEach(control => control.classList.remove('hidden'));

        const player1NameDisplay = document.getElementById('player1NameDisplay');
        const player2NameDisplay = document.getElementById('player2NameDisplay');
        player1NameDisplay.textContent = player1Name;
        player2NameDisplay.textContent = player2Name;

        const player1 = Player(player1Name, 'X');
        const player2 = Player(player2Name, 'O');
        currentPlayer = player1;
        displayTurn();
    })

})();