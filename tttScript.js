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

    const markCell = (index, mark) => {
        // Append index to marker array
        if(mark === 'X') {
            xBoard.push(index);
        } else {
            oBoard.push(index);
        };
        console.log(xBoard);
        console.log(oBoard);
    };

    const checkWinner = (marker) => {
        const modal = document.querySelector('.modal-container');
        const overlay = document.querySelector('.overlay');
        const p = document.querySelector('#winner-p');
        for(let i = 0; i < winCon.length; i++) {
            // Need to add draw feature
            // Need to add ability to win more than 3 moves in
            if(winCon[i].join(',') === xBoard.join(',') || winCon[i].join(',') === oBoard.join(',')) {
                p.textContent = `${marker}'s win!`;
                modal.classList.add('active');
                overlay.classList.add('active');
            }
        };
    };

    return {
        markCell,
        checkWinner
    };
};

function renderer() {
    const displayMarker = (index, marker) => {
        const button = document.querySelector(`[data-index = '${index}']`);
        button.textContent = marker;
    };

    const renderDraw = () => {
        const modal = document.querySelector('.modal-container');
        const p = document.querySelector('#winner-p');
        const overlay = document.querySelector('.overlay');
        p.textContent = "Draw!";
        modal.classList.add('active');
        overlay.classList.add('active');
    };

    return {
        displayMarker,
        renderDraw
    };
};

function screenController() {
    const cells = document.querySelectorAll('.cell');
    const logic = gameLogic();
    const render = renderer();

    const marks = [
        {marker: 'X'},
        {marker: 'O'}
    ];

    let activeMark = marks[0];
    const getActiveMark = () => activeMark;
    const switchMark = () => {
        activeMark = activeMark === marks[0] ? marks[1] : marks[0]; 
    };

    const clickCell = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                logic.markCell(cell.dataset.index, getActiveMark().marker);
                logic.checkWinner(getActiveMark().marker);
                render.displayMarker(cell.dataset.index, getActiveMark().marker);
                switchMark();
            }, {once: true});
        });
    };

    const restart = () => {
        location.reload();
    }

    return {
        clickCell,
        restart
    };
};

const screen = screenController();
screen.clickCell();