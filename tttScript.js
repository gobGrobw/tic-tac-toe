function gameBoard() {
    let board = [];
    let rows = 3;
    let columns = 3;
    
    for(let i = 0; i <= rows - 1; i++) {
        board[i] = [];
        for(let j = 0; j <= columns - 1; j++) {
            board[i].push(Cell());
        }
    }


    const markCell = (index, player) => {
        const button = document.querySelector(`[data-index='${index}']`);
        button.textContent = player;

    }

    const makeBoard = () => {
        const boardWithValues = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithValues);
    }

    const getBoard = () => board;

    return {
        getBoard,
        makeBoard,
        markCell
    }
}

function Cell() {
    let value = 0;
    const getValue = () => value;


    const addValue = (player) => {
        value = marker;
    }

    return {
        getValue,
        addValue
    }
}

function screenController() {
    const board = gameBoard();
    const cells = document.querySelectorAll('.cell');
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
                board.markCell(cell.dataset.index, getActivePlayer().mark);
                switchPlayer();
            });
        })
    }

    const clearBoard = () => {
        cells.forEach(cell => {
            cell.textContent = '';
        })

        activePlayer = players[0];
        announcement.textContent = `${getActivePlayer().mark}'s Turn`;
    }

    const restartGame = () => {
        const restartBtn = document.querySelector('#restart-btn');
        restartBtn.addEventListener('click', clearBoard);
    }

    return {
        addMarkToCell,
        getActivePlayer,
        restartGame
    }
}

const screen = screenController();
screen.addMarkToCell();
screen.restartGame();

gameBoard().makeBoard();