const xClass = 'x';
const circleClass = 'circle';
let circleTurn

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]
const restartButton = document.querySelector('#restart')
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('#board')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.querySelector('#winningMessage')


function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
startGame()


function computersMove() {
    const thinkingText = document.querySelector('.thinking')
    const squares = [...cellElements];
    const numToMove =  Math.floor(Math.random()*9)
    console.log('place to move',squares[numToMove]);
    const move = squares[numToMove]

        if (move.classList.contains('x') || move.classList.contains('circle')) {
        console.log('re compute comps move');
        computersMove(circleTurn)
    } else {
        const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))
        thinkingText.classList.add('show')

       async function play(move) {
           const thinking = (Math.random()*1000) +500;
           console.log(thinking);
            await wait(thinking)
            move.classList.add('circle')
            if (checkWin(circleClass)) {
                endGame(false)
            } else if (checkWin(xClass)) {
                endGame(false)
             // check for draw
            } else if (isDraw()) {
                       endGame(true)
                   } else {
            //switch turns
                    swapTurns()
                    setBoardHoverClass()
                    thinkingText.classList.remove('show')
     }
       }
       play(move)
    //    move.classList.add('circle')

        // async  function  checkComputerWin() {
          
    }
}
function handleClick(e) {
    const selectPlayers = document.querySelector('.players').value;
     const currentClass = circleTurn ? circleClass : xClass;

    const cell = e.target;
    if (selectPlayers === 'single') {
        console.log(selectPlayers);
        // place mark
     placeMark(cell, currentClass)
        //check for win
        if (checkWin(currentClass)) {
             endGame(false)
              // check for draw
            } else if (isDraw()) {
                endGame(true)
            } else {
     //switch turns
             swapTurns()
             setBoardHoverClass()
            }
    } else if (selectPlayers === 'multi' && currentClass == xClass) {
        console.log(currentClass);
        placeMark(cell, currentClass)

        if (checkWin(currentClass)) {
            endGame(false)
             // check for draw
           } else if (isDraw()) {
               endGame(true)
           } else {
    //switch turns
            swapTurns()
            setBoardHoverClass()
            computersMove(currentClass)

           }

    }
  
}

function isDraw() {
    return [...cellElements].every(cell => { 
        return cell.classList.contains(xClass) || 
        cell.classList.contains(circleClass)
    })
}

function endGame(draw) {
    if(draw){
        winningMessageText.innerText = `Game was a draw!`
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurns(){
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(circleClass)
     circleTurn ? board.classList.add(circleClass) : board.classList.add(xClass)
}
function checkWin(currentClass) {
    return winningCombos.some(combos => {return combos.every(index => {
        return cellElements[index].classList.contains(currentClass)
    })})
}
restartButton.addEventListener('click', startGame)
