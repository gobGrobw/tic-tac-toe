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
        console.log(boardWithValues);
    }

    const checkWinner = (move) => {
        switch(true) {
            case board[0][0].getValue() + board[0][1].getValue() + board[0][2].getValue() == 3:
                console.log('X win');
                break;
            
            case board[1][0].getValue() + board[1][1].getValue() + board[1][2].getValue() == 3:
                console.log('X win');
                break;

            case board[2][0].getValue() + board[2][1].getValue() + board[2][2].getValue() == 3:
                console.log('X win');
                break;
            
            case board[0][0].getValue() + board[1][1].getValue() + board[2][2].getValue() == 3:
                console.log('X win');
                break;

            case board[0][2].getValue() + board[1][1].getValue() + board[2][0].getValue() == 3:
                console.log('X win');
                break;

            case board[0][0].getValue() + board[0][1].getValue() + board[0][2].getValue() == -3:
                console.log('O win');
                break;
            
            case board[1][0].getValue() + board[1][1].getValue() + board[1][2].getValue() == -3:
                console.log('O win');
                break;

            case board[2][0].getValue() + board[2][1].getValue() + board[2][2].getValue() == -3:
                console.log('O win');
                break;
            
            case board[0][0].getValue() + board[1][1].getValue() + board[2][2].getValue() == -3:
                console.log('O win');
                break;

            case board[0][2].getValue() + board[1][1].getValue() + board[2][0].getValue() == -3:
                console.log('O win');
                break;

            case move == 9:
                console.log('draw');
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

    newBoard();

    return {
        addMarkToCell,
        restartGame
    }
}

const screen = screenController();
screen.addMarkToCell();
screen.restartGame();