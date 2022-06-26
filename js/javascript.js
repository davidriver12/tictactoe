//Factory for player objects
const playerFactory = (char) => {
    rowsContainer = [];
    columnsContainer = [];
    diagonalContainer = [];
    oppositeDiagonalContainer = [];
    return {char, rowsContainer, columnsContainer, diagonalContainer, oppositeDiagonalContainer};
}

//Initiate player objects
const player1 = playerFactory('o');
const player2 = playerFactory('x');

//Module for gameboard object
const gameBoard = (() => {

    const gameboard = [];

    const addToArray = (index, char) => {
        gameboard[index] = char;
    }
    //'x','o', 'x', 'x','o', 'x', 'x','o', 'x'
    return {gameboard, addToArray};
})();

//Module for displayController object
const displayController = (() => {
    
    let currentPlayer = player1;

    const printBoard = (arr) => {
        let indexCounter = 0;
        let rowCounter = 1;
        let columnCounter = 1;
        for (let x=0; x<3; x++){
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            for (let y=0; y<3; y++){
                let div = document.createElement('div');
                div.setAttribute('index', indexCounter);
                div.setAttribute('row', rowCounter);
                div.setAttribute('column', columnCounter);
                columnCounter++;
                div.textContent = gameBoard.gameboard[indexCounter];
                div.classList.add('grid-item');
                div.addEventListener('click', function(){
                    if (!div.textContent){
                        gameBoard.addToArray(div.getAttribute('index'), currentPlayer.char)
                        addContent(this, currentPlayer.char);
                        togglePlayer();
                    }
                });
                rowDiv.appendChild(div);
                indexCounter++;
            }
            columnCounter = 1;
            boardContainer.appendChild(rowDiv);
            rowCounter++;
        }
    };

    const togglePlayer  = () => {
        if (currentPlayer == player1){
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    const addContent = (div, content) => {
        div.textContent = content;
    }

    return {printBoard, addContent, togglePlayer};
})();

boardContainer = document.querySelector('#board-container');

displayController.printBoard(gameBoard.gameboard);