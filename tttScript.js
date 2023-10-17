function game() {
    let board = [];
    let rows = 3;
    let columns = 3;
    
    for(let i = 0; i <= rows - 1; i++) {
        board[i] = [];
        for(let j = 0; j <= columns - 1; j++) {
            board[i].push(Cell());
        }
    }

    const markCell = (row, column, index, player) => {
        const button = document.querySelector(`[data-index='${index}']`);
        button.textContent = player;

        board[row][column].addValue(player);
    }

    const makeBoard = () => {
        const boardWithValues = board.map(row => row.map(cell => cell.getValue()));
    }

    const checkWinner = (move) => {
        const winText = document.querySelector('#winner-p');
        const modal = document.querySelector('.modal-container');
        const overlay = document.querySelector('.overlay');
        switch(true) {
            case move == 9:
                winText.textContent = "Draw!";
                modal.classList.add('active');
                overlay.classList.add('active');
                break;
        }
    }


    return {
        makeBoard,
        markCell,
        checkWinner
    }   
}

function Cell() {
    let value = ' ';
    const getValue = () => value;


    const addValue = (player) => {
        value = player === 'X' ? 1 : -1;
    }

    return {
        getValue,
        addValue
    }
}

function screenController() {
    const board = game();
    const cells = document.querySelectorAll('.cell');
    let move = 0;
    let players = [
        {
            mark: 'X'
        }, 
        {
            mark: 'O'
        }
    ]

    let activePlayer = players[0];
    
    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        const announcement = document.querySelector('#announcement');
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        announcement.textContent = `${getActivePlayer().mark}'s Turn`;
    }
    
    const addMarkToCell = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                move++;
                board.markCell(
                    cell.dataset.row,
                    cell.dataset.column, 
                    cell.dataset.index, 
                    getActivePlayer().mark
                    );
                board.checkWinner(move);
                switchPlayer();
                newBoard();
            });
        })
    }

    const newBoard = () => {
        board.makeBoard();
    }

    const restartGame = () => {
        const restartBtn = document.querySelector('#restart-btn');
        const playAgainBtn = document.querySelector('#play-again-btn');
        restartBtn.addEventListener('click', () => location.reload());
        playAgainBtn.addEventListener('click', () => location.reload());
    }

    newBoard();

    return {
        addMarkToCell,
        restartGame
    }
}

const screen = screenController();
screen.addMarkToCell();
screen.restartGame();