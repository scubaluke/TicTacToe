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

let pickedQuestions;

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
    pickedQuestions = [];
    //  askQuestion()
}
startGame()

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass;
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
    return askQuestion()
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
    background.style.backgroundColor = `#${randomColor}`;
  }

  restartButton.addEventListener('click', startGame)
  restartButton.addEventListener("click", setBackground);
  setBackground();

/******** PRE GAME QUESTIONS ************************************************/
const answerBtn = document.querySelector('.answerBtn')
let playerText = document.querySelector('.player')
const questionPopUp = document.querySelector('.questionPopUp')
const questionText = document.querySelector('.questionText')
const tryAgain = document.querySelector('.tryAgain');
let questionIndex = 0;
let wrongAnswerCount = 0;

const questions = [
 { answer: 'Perspective', question:  `This is a positive statement you use to get through struggles (Perspective)`, hint: 'think about .... Perspective'},
   {answer:'Emotions',question: `This is a positive statement you use... Emotions`, hint: 'think about .... Emotions'}, 
   {answer:'Agency',question:  `This is a positive statement you use... Agency`, hint: 'think about .... Agency'},                        
   {answer:'Growth mindset',question:  `This is a positive statement you use... Growth mindset`, hint: 'think about .... Growth mindset'},
    {answer:'Teamwork',question:  `This is a positive statement you use... Teamwork`, hint: 'think about .... Teamwork' },                      
     {answer:'Goals',question: `This is a positive statement you use... Goals`, hint: 'think about .... Goals'},
   {answer:'Values',question:  `This is a positive statement you use... Values`, hint: 'think about .... Values' },                                                   
    {answer:'Critical Thinking',question:  `This is a positive statement you use... Critical Thinking`, hint: 'think about .... Critical Thinking'},
   {answer:'Purpose',question:  `This is a positive statement you use...Purpose`, hint: 'think about .... Purpose'},
];
function pickQuestion() {
    const questionI = Math.floor(Math.random() * questions.length)
    if ((pickedQuestions.includes(questionI))) {
        console.log('prev picked', questions[questionIndex].question);
       return pickQuestion()
    } else{
        console.log(questionI ,questions[questionI].question);
        pickedQuestions.push(questionI)
        return questionIndex = questionI
    }
}

function askQuestion() {
    pickQuestion() 
    questionText.innerText = questions[questionIndex].question
    questionPopUp.classList.add('show')
    wrongAnswerCount = 0;
    tryAgain.textContent = ''
    circleTurn ? playerText.innerText = `Player: O's` :  playerText.innerText = `player: X's`
}

function checkAnswer() {
    const answerDropDown = document.querySelector('.answerDropDown').value;
    console.log('checkAnswer start', wrongAnswerCount);

    if (questions[questionIndex].answer == answerDropDown) {
        questionPopUp.classList.remove('show')
    } else {
                //    tryAgain.textContent = 'Not quite, try again.'}

        if (wrongAnswerCount <= 1) {
            wrongAnswerCount += 1;
             tryAgain.textContent = 'Not quite, try again.'
        }else if (wrongAnswerCount <= 2) {
            console.log(wrongAnswerCount);
             tryAgain.textContent = 'Close, try again.'
    }  else if (wrongAnswerCount <= 3) {
        wrongAnswerCount += 1;
        console.log('questionIndex', questionIndex);
         tryAgain.textContent = questions[questionIndex].hint
        }
    }
}

askQuestion()

answerBtn.addEventListener('click',checkAnswer)
restartButton.addEventListener('click', askQuestion)
