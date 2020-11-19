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

/******* Single or Multi players *******************/
const choosePlayersAndGame = document.querySelector('.choosePlayersAndGame')
const choosePlayersAndGameBtn = document.querySelector('#startGame')
choosePlayersAndGameBtn.addEventListener('click', playersAndGameChosen)
function askPlayerNum() {
    choosePlayersAndGame.classList.add('show')
}

function playersAndGameChosen() {
    choosePlayersAndGame.classList.remove('show')
    findUserSelectedQuestions()
    askQuestion()
}

/******   Run Game    **********/
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
    choosePlayersAndGame.classList.add('show')

}
startGame()

/********   PLAY against COMPUTER *********/ 
function computersMove() {    
    const thinkingText = document.querySelector('.thinking')
    const squares = [...cellElements];
    const numToMove =  Math.floor(Math.random()*9)
    const move = squares[numToMove]

        if (move.classList.contains('x') || move.classList.contains('circle')) {
        computersMove(circleTurn)
    } else {
        const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))
        thinkingText.classList.add('show')

       async function play(move) {
           const thinking = (Math.random()*1000) +500;
            await wait(thinking)
            move.classList.add('circle')
            if (checkWin(circleClass)) {
                endGame(false)
                thinkingText.classList.remove('show')

            } else if (checkWin(xClass)) {
                endGame(false)
                thinkingText.classList.remove('show')

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
    }
    questionPopUp.classList.add('show')

}
function handleClick(e) {
    const selectPlayers = document.querySelector('#players').value
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass;

    if (selectPlayers === 'multi') {
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
    } else if (selectPlayers === 'single' && currentClass == 'x') {
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
            questionPopUp.classList.remove('show')
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
let playerText = document.querySelector('.whosTurn')
const questionPopUp = document.querySelector('.questionPopUp')
const questionText = document.querySelector('.questionText')
const tryAgain = document.querySelector('.tryAgain');
let questionIndex = 0;
let wrongAnswerCount = 0;
const chooseGameAndPlayers = document.querySelector('.choosePlayersAndGame')
/*******    SELECT QUESTIONS FOR GAME *****/
const selectQuestions = document.querySelector('#questionsToAsk');
let userSelectedQuestions = '';

function findUserSelectedQuestions() {
return userSelectedQuestions  = selectQuestions.value;
}
choosePlayersAndGameBtn.addEventListener('change', findUserSelectedQuestions)
const inputBoxType = {
    emotion: 'dropDown',
    subtraction: 'number',
    addition: 'dropDown',
}
const questions = {
    subtraction: [
        { answer: 0, question: '1 - 1', hint: 'Think about 0 and why',},
        { answer: 1, question: '2 - 1', hint: 'Think about 1',},
        { answer: 0, question: '2 - 2', hint: 'Think about 0 and why.',},
        { answer: 1, question: '3 - 2', hint: 'Think about 1 and why.',},
        { answer: 3, question: '5 - 2', hint: 'Think about 3 and why.',},
        { answer: 4, question: '6 - 2', hint: 'Think about 4 and why.',},
        { answer: 3, question: '6 - 3', hint: 'Think about 3 and why.',},
        { answer: 1, question: '5 - 4', hint: 'Think about 1 and why.',},
        { answer: 4, question: '5 - 1', hint: 'Think about 4 and why.',},
        ], 
   addition: [
        { answer: 2, question: '1 + 1', hint: 'Think about 2 and why.',},
        { answer: 3, question: '2 + 1' , hint: 'Think about 3 and why.',},
        { answer: 4, question: '2 + 2', hint: 'Think about 4 and why.',},
        { answer: 5, question: '2 + 3' , hint: 'Think about 5 and why.',},
        { answer: 6, question: '3 + 3', hint: 'Think about 6 and why.',},
        { answer: 7, question: '3 + 4', hint: 'Think about 7 and why.',},
        { answer: 8, question: '4 + 4', hint: 'Think about 8 and why.',},
        { answer: 9, question: '5 + 4', hint: 'Think about 9 and why.',},
        { answer: 10, question: '5 + 5', hint: 'Think about 1 and why.0',},
       ],
 emotion: [
        { answer: 'Perspective', question:  `This is a positive statement you use to get through struggles (Perspective)`, hint: 'think about .... Perspective'},
        {answer:'Emotions',question: `This is a positive statement you use... Emotions`, hint: 'think about .... Emotions'}, 
        {answer:'Agency',question:  `This is a positive statement you use... Agency`, hint: 'think about .... Agency'},                        
        {answer:'Growth mindset',question:  `This a really long one for testing purposes is a positive statement you use... Growth mindset`, hint: 'think about .... Growth mindset'},
        {answer:'Teamwork',question:  `This is a positive statement you use... Teamwork`, hint: 'think about .... Teamwork' },                      
        {answer:'Goals',question: `This is a positive statement you use... Goals`, hint: 'think about .... Goals'},
        {answer:'Values',question:  `This is a positive statement you use... Values`, hint: 'think about .... Values' },                                                   
        {answer:'Critical Thinking',question:  `This is a positive statement you use... Critical Thinking`, hint: 'think about .... Critical Thinking'},
        {answer:'Purpose',question:  `This is a positive statement you use...Purpose`, hint: 'think about .... Purpose'},
     ],
}
/*********  CREATING ANSWER DROP DOWN TEXT ******** */
function generateAnswerDropdown() {
    const answerDropDownText = document.querySelector('.generateAnswerDropDown');
 if (inputBoxType[userSelectedQuestions] === 'number') {
   return answerDropDownText.innerHTML = `<input type="number" name="" class="answerDropDown" max="99" id="numberInput"/>`
 } else if (inputBoxType[userSelectedQuestions] === 'dropDown'){
    let optionArray = []
    questions[userSelectedQuestions].forEach(el =>  {
    optionArray.push(` <option value='${el.answer}'>${el.answer}</option>`)
   });
   optionArray.unshift(`<select class="answerDropDown" name="answer" id="">`)
   optionArray.push(`</select>`)
      return answerDropDownText.innerHTML = optionArray;
     }
}

function pickQuestion() {
    const questionI = Math.floor(Math.random() * questions[userSelectedQuestions].length)
    if ((pickedQuestions.includes(questionI))) {
       return pickQuestion()
    } else{
        pickedQuestions.push(questionI)
        return questionIndex = questionI
    }
}

function askQuestion() {
    pickQuestion() 
    generateAnswerDropdown()
    questionText.innerText = questions[userSelectedQuestions][questionIndex].question
    questionPopUp.classList.add('show')
    wrongAnswerCount = 0;
    tryAgain.textContent = ''
    circleTurn ? playerText.innerText = `Player: O's` :  playerText.innerText = `player: X's`
}

function checkAnswer() {
    const answerDropDown = document.querySelector('.answerDropDown').value;

    if (questions[userSelectedQuestions][questionIndex].answer == answerDropDown) {
        questionPopUp.classList.remove('show')
 } else {
        if (wrongAnswerCount <= 1) {
            wrongAnswerCount += 1;
             tryAgain.textContent = 'Not quite, try again.'
        }else if (wrongAnswerCount <= 2) {
            wrongAnswerCount += 1;
             tryAgain.textContent = 'Close, try again.'
    }  else if (wrongAnswerCount <= 3) {

        wrongAnswerCount += 1;
         tryAgain.textContent = questions[userSelectedQuestions][questionIndex].hint
        }
    }
}

answerBtn.addEventListener('click',checkAnswer)
restartButton.addEventListener('click', askPlayerNum)

/*******  CSS  TRANSITION ANIMATION HELPER function ************ */

// var display = function (elem) {

// 	// Get the natural height of the element
// 	var getHeight = function () {
// 		elem.style.display = 'block'; // Make it visible
// 		var height = elem.scrollHeight + 'px'; // Get it's height
// 		elem.style.display = ''; //  Hide it again
// 		return height;
// 	};

// 	var height = getHeight(); // Get the natural height
// 	elem.classList.add('is-visible'); // Make the element visible
// 	elem.style.height = height; // Update the max-height

// 	// Once the transition is complete, remove the inline max-height so the content can scale responsively
// 	window.setTimeout(function () {
// 		elem.style.height = '';
// 	}, 350);

// };