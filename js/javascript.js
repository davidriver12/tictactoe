const playerFactory = (name, char) => {
    let rowsContainer = [0, 0, 0];
    let columnsContainer = [0, 0, 0];
    let diagonalContainer = [0, 0, 0];
    let oppositeDiagonalContainer = [0, 0, 0];

    const resetContainers = () => {
        rowsContainer = [0, 0, 0];
        columnsContainer = [0, 0, 0];
        diagonalContainer  = [0, 0, 0];
        oppositeDiagonalContainer = [0, 0, 0];
    }

    const updateContainers = (row, column) => {
        rowsContainer[row]++;
        columnsContainer[column]+= 1;
        if (row == column){
            diagonalContainer[row]++;
            if (row == 1){
                oppositeDiagonalContainer[1]++;
            }
        } else if (row == 0 && column ==2){
            oppositeDiagonalContainer[0]++;
        } else if  (row== 2 && column ==0){
            oppositeDiagonalContainer[2]++;
        }
    }

    const checkWin = () => {
        if ((rowsContainer.includes(3)) || (columnsContainer.includes(3)) || ((diagonalContainer[0] + diagonalContainer[1] + diagonalContainer[2]) == 3) ||
        ((oppositeDiagonalContainer[0] + oppositeDiagonalContainer[1] + oppositeDiagonalContainer[2]) === 3)){
            return alert(`${name} Wins!`);
        }else {
            return false;
        }
    }

    return {name, char, rowsContainer, columnsContainer, diagonalContainer, oppositeDiagonalContainer, 
        updateContainers, checkWin, resetContainers };
}

//Module for gameboard object
const gameBoard = (() => {

    const gameboard = [];

    const addToArray = (index, char) => {
        gameboard[index] = char;
    }
    //'x','o', 'x', 'x','o', 'x', 'x','o', 'x'
    return {gameboard, addToArray};
})();

//Module for modalController object
let modalController = (() =>{
    const modal = document.querySelector('.modal-bg');
    const startBtn = document.querySelector('#start-btn');
    const p1Input = document.querySelector('#p1');
    const p2Input = document.querySelector('#p2');
    startBtn.addEventListener('click', function(){
        startGame();
        removeModal();
    });

    const getNames = () => {
        let p1Name = p1Input.value;   
        let p2Name = p2Input.valu;
        return [p1Name, p2Name]
    }

    const removeModal = () => {
        modal.classList.add('hidden');
    }

    const startGame = () => {
        names = getNames();
        p1 = playerFactory(names[0], 'O');
        p2 = playerFactory(names[1], 'X');
        currentPlayer = p1;  
        displayController.printBoard(gameBoard.gameboard);
    }

    return {modal, getNames, removeModal, startGame, startBtn}
})();

//Module for displayController object  
let displayController = (() => {

    const printBoard = (arr) => {
        let indexCounter = 0;
        let rowCounter = 0;
        let columnCounter = 0;
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
                        gameBoard.addToArray(div.getAttribute('index'), currentPlayer.char);
                        currentPlayer.updateContainers(div.getAttribute('row'), div.getAttribute('column'));
                        addContent(this, currentPlayer.char);
                        currentPlayer.checkWin();
                        togglePlayer();
                    }
                });
                rowDiv.appendChild(div);
                indexCounter++;
            }
            columnCounter = 0;
            boardContainer.appendChild(rowDiv);
            rowCounter++;
        }
    };

    const togglePlayer  = () => {
        if (currentPlayer == p1){
            currentPlayer = p2;
        } else {
            currentPlayer = p1;
        }
    }

    const addContent = (div, content) => {
        div.textContent = content;
    }

    const restart = () => {
        boardContainer.innerHTML = '';
        p1.resetContainers();
        p2.resetContainers();
        gameBoard.gameboard = [];
        printBoard();
    }

    const restartBtn = document.querySelector('#restart-btn');
    restartBtn.addEventListener('click', function(){
        restart();
    });

    return {printBoard, addContent, togglePlayer, restart};
})();

//Initiate player objects

boardContainer = document.querySelector('#board-container');

