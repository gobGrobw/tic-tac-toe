function gameLogic() {
    let xBoard = [];
    let oBoard = [];
    let winCon = [
        // Horizontal
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        // Vertical
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        // Diagonal
        [1, 5, 9],
        [3, 5, 7]
    ];
    const render = renderer();

    const addBotMark = (value) => {
        oBoard.push(value);
        console.log(oBoard);
        checkWinner('O');
    }

    const markCell = (index, mark) => {
        // Append index to marker array
        if(mark === 'X') {
            xBoard.push(Number(index));
        } else {
            oBoard.push(Number(index));
        };

        checkWinner(mark);
    };

    const checkWinner = (marker) => {
        for(let i = 0; i < winCon.length; i++) {
            for(let j = 0; j < winCon[i].length; j++) {
                if(xBoard.includes(winCon[i][0]) && xBoard.includes(winCon[i][1]) && xBoard.includes(winCon[i][2]) && xBoard.length >= 3 ||
                oBoard.includes(winCon[i][0]) && oBoard.includes(winCon[i][1]) && oBoard.includes(winCon[i][2]) && oBoard.length >= 3) {
                    render.renderWin(marker);
                };
            };
        };
    };

    return {
        markCell,
        checkWinner,
        addBotMark
    };
};

function Bot() {
    const logic = gameLogic();
    const render = renderer();
    
    let availableCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const removeAvailableCells = (indexAt, id) => {
        let newCells = availableCells.filter(num => num !== indexAt);
        availableCells = newCells;
        console.log(newCells);
        if(id !== 'bot') return;
        logic.addBotMark(indexAt);
    }

    const botMove = () => {
        let bot = Math.floor(Math.random() * availableCells.length);
        render.displayMarker(availableCells[bot], 'O');
        render.occupiedCellByBot(availableCells[bot]);

        removeAvailableCells(availableCells[bot], 'bot');
        
    };

    return {
        botMove,
        removeAvailableCells
    }
}

function renderer() {
    const modal = document.querySelector('.modal-container');
    const modalWin = document.querySelector('.modal');
    const chooseModal = document.querySelector('.play-against-modal');
    const overlay = document.querySelector('.overlay');
    const p = document.querySelector('#winner-p');
    const announcement = document.querySelector('#announcement')
    
    const displayMarker = (index, marker) => {
        const button = document.querySelector(`[data-index = '${index}']`);
        announcement.textContent = marker === 'X' ? "O's Turn" : "X's Turn";
        button.textContent = marker;
    };

    const renderDraw = () => {
        p.textContent = "Draw!";
        modal.classList.add('active');
        overlay.classList.add('active');
        modalWin.classList.add('active');
    };

    const renderWin = (marker) => {
        p.textContent = `${marker}'s win!`;
        modalWin.classList.add('active');
        modal.classList.add('active');
        overlay.classList.add('active');
    };

    const occupiedCellByBot = (index) => {
        const occupiedCell = document.querySelector(`[data-index = '${index}']`);
        occupiedCell.classList.add('occupied');
    }

    const getVariables = () => {
        return { modal, modalWin, chooseModal, overlay, p };
    };

    return {
        displayMarker,
        renderDraw,
        renderWin,
        getVariables,
        occupiedCellByBot
    };
};

function screenController() {
    const cells = document.querySelectorAll('.cell');
    const buttons = document.querySelectorAll('.btn');
    const logic = gameLogic();
    const render = renderer();
    
    let opponent = '';
    let move = 0;

    const bot = Bot(opponent);

    const marks = [
        { marker: 'X' },
        { marker: 'O' }
    ];

    let activeMark = marks[0];
    const getActiveMark = () => activeMark;
    const switchMark = () => {
        activeMark = activeMark === marks[0] ? marks[1] : marks[0]; 
    };

    const clickCell = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                move++;
                switch(true) {
                    case move === 9:
                        render.renderDraw(); 
                        break;

                    case move === 5 && opponent === 'bot':
                        render.renderDraw(); 
                        break;
                }
                logic.markCell(cell.dataset.index, getActiveMark().marker);
                render.displayMarker(cell.dataset.index, getActiveMark().marker);
                gameEnd = logic.checkWinner(getActiveMark().marker);
                if(opponent === 'bot') {
                    bot.removeAvailableCells(Number(cell.dataset.index), 'player');
                    bot.botMove();
                } else {
                    switchMark();
                };
            }, { once: true });
        });
    };

    const selectOpponent = () => {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if(button.id === 'bot') {
                    opponent = 'bot';
                };

                render.getVariables().modal.classList.remove('active');
                render.getVariables().overlay.classList.remove('active');
                render.getVariables().chooseModal.classList.remove('active');
            });
        }, { once: true });
    };

    const restart = () => {
        location.reload();
    };

    return {
        clickCell,
        restart,
        selectOpponent
    };
};

const screen = screenController();
screen.clickCell();
screen.selectOpponent();