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
    const nextButton = document.getElementById('nextRound')
    const cells = document.querySelectorAll('.cell');
    const setupControls = document.querySelectorAll('.setupControl');
    const gameControls = document.querySelectorAll('.gameControl');
    const player1NameInput = document.getElementById('player1NameInput');
    const player2NameInput = document.getElementById('player2NameInput');
    const player1NameDisplay = document.getElementById('player1NameDisplay');
    const player2NameDisplay = document.getElementById('player2NameDisplay');
    const player1ScoreDisplay = document.getElementById('score1');
    const player2ScoreDisplay = document.getElementById('score2');
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
        resetButton.classList.remove('hidden');

        player1NameDisplay.textContent = player1Name;
        player2NameDisplay.textContent = player2Name;

        player1 = Player(player1Name, 'X');
        player2 = Player(player2Name, 'O');
        currentPlayer = player1;

        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        gameStarted = true;

        displayTurn();
    })

    resetButton.addEventListener('click', () => {
        Gameboard.resetBoard();

        player1Name = 'Player 1';
        player2Name = 'Player 2';
        player1Score = 0;
        player2Score = 0;
        player1ScoreDisplay.innerText = player1Score;
        player2ScoreDisplay.innerText = player2Score;
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
    })

    nextButton.addEventListener('click', () => {
        Gameboard.resetBoard();

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        displayTurn();

        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleCellClick);
        })

        nextButton.classList.add('hidden');
    })

    const checkWinner = () => {
        const board = Gameboard.getBoard();

        if (board[0] === board[1] && board[1] === board[2] && board[2] !== '') {
            return true;
        }
        if (board[3] === board[4] && board[4] === board[5] && board[5] !== '') {
            return true;
        }
        if (board[6] === board[7] && board[7] === board[8] && board[8] !== '') {
            return true;
        }

        if (board[0] === board[3] && board[3] === board[6] && board[6] !== '') {
            return true;
        }
        if (board[1] === board[4] && board[4] === board[7] && board[7] !== '') {
            return true;
        }
        if (board[2] === board[5] && board[5] === board[8] && board[8] !== '') {
            return true;
        }

        if (board[0] === board[4] && board[4] === board[8] && board[8] !== '') {
            return true;
        }
        if (board[2] === board[4] && board[4] === board[6] && board[6] !== '') {
            return true;
        }
    }


    const handleCellClick = (event) => {
        if (gameStarted && event.target.textContent === '') {
            const cellIndex = event.target.dataset.index;
            Gameboard.setCell(cellIndex, currentPlayer.marker);
            event.target.textContent = currentPlayer.marker;

            if (checkWinner()) {
                updateStatus(`${currentPlayer.name} wins!`);
                cells.forEach(cell => {
                    cell.removeEventListener('click', handleCellClick);
                })

                nextButton.classList.remove('hidden')

                if (currentPlayer === player1) {
                    player1Score++;
                    player1ScoreDisplay.innerText = player1Score;
                }
                else {
                    player2Score++;
                    player2ScoreDisplay.innerText = player2Score;
                }
            }

            else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                displayTurn();
            }
        }
    }
})();