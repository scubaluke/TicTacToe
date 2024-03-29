const xClass = 'x';
const circleClass = 'circle';
let circleTurn

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]
const restartButton = document.querySelector('#restart')
const cellElements = document.querySelectorAll('[data-cell]')
// console.log(cellElements);
// console.log([...cellElements]);
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


function computersMove(currentClass) {
    const squares = [...cellElements];

    const numToMove =  Math.floor(Math.random()*9)
    console.log('place to move',squares[numToMove]);
    // if (squares[numToMove].classList.contains('cell x') || squares[numToMove].classList.contains('cell circle')) {
        if (squares[numToMove].classList.contains('x') || squares[numToMove].classList.contains('circle')) {
        console.log('re compute comps move');
        computersMove(circleTurn)
    } else {
    //     console.log(numToMove);
    //     setTimeout(() => {
    //  placeMark( squares[numToMove], circleClass)
    //     console.log('now');
    //     }, (Math.random()*300+250));
        const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))
    //    // works here  placeMark( squares[numToMove], circleClass)
    //    const thinking = (Math.random()*3000)+1000;
    //    console.log(thinking);
    //    wait(2000).then( placeMark( squares[numToMove], circleClass))
       async function play() {
            await wait(500)
            console.log('ran');
            placeMark( squares[numToMove], circleClass)
       }
       play()

    }
}

function handleClick(e) {
    const selectPlayers = document.querySelector('.players').value;
    const currentClass = circleTurn ? circleClass : xClass;
    const cell = e.target;

   // place mark single player
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

       if (selectPlayers === 'single') {
        console.log('works');
    } else {
            // computersMove(circleClass)
             //check for win
   if (checkWin(currentClass)) {
    endGame(false)
     // check for draw
   } else if (isDraw()) {
       endGame(true)
   } else {
    //    setTimeout(() => {
    //     computersMove(circleClass)

    //        console.log('ran');
    //    }, (Math.random()*2)+.4);
    computersMove(circleClass)

    if (checkWin(circleClass)) {
        endGame(false)
         // check for draw
       } else if (isDraw()) {
           endGame(true)
       } else {
    swapTurns()
    setBoardHoverClass()
       }
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
    // console.log('placemark',cell, currentClass);
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



function setBackground() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
  const background = document.querySelector('.fill')
    // document.body.style.backgroundColor = "#" + randomColor;
    // color.innerHTML = "#" + randomColor;
    background.style.backgroundColor = `#${randomColor}`;
  }
  
  restartButton.addEventListener("click", setBackground);
  setBackground();

restartButton.addEventListener('click', startGame)
