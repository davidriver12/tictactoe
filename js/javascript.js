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
    
    let currentChar = 'x';

    const printBoard = (arr) => {
        let indexCounter = 0;
        for (let x=0; x<3; x++){
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            for (let y=0; y<3; y++){
                let div = document.createElement('div');
                div.setAttribute('index', indexCounter)
                div.textContent = gameBoard.gameboard[indexCounter];
                div.classList.add('grid-item');
                div.addEventListener('click', function(){
                    if (!div.textContent){
                        gameBoard.addToArray(div.getAttribute('index'), currentChar)
                        addContent(this, currentChar);
                        toggleChar();
                    }
                });
                rowDiv.appendChild(div);
                indexCounter++;
            }
            boardContainer.appendChild(rowDiv);
        }
    };

    const toggleChar  = () => {
        if (currentChar == 'x'){
            currentChar = 'o';
        } else {
            currentChar = 'x';
        }
    }

    const addContent = (div, content) => {
        div.textContent = content;
    }

    return {printBoard, addContent, toggleChar};
})();

//Factory for player objects
const playerFactory = (name) => {
    return {name};
}

boardContainer = document.querySelector('#board-container');

displayController.printBoard(gameBoard.gameboard);