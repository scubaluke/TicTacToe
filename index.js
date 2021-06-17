const xClass = 'x';
const circleClass = 'circle';
let circleTurn;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const restartButton = document.querySelector('#restart');
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const winningMessageText = document.querySelector(
  '[data-winning-message-text]'
);
const winningMessageElement = document.querySelector('#winningMessage');

/** ***** Single or Multi players ****************** */
const choosePlayersAndGame = document.querySelector('.choosePlayersAndGame');
const choosePlayersAndGameBtn = document.querySelector('#startGame');
choosePlayersAndGameBtn.addEventListener('click', playersAndGameChosen);

function askPlayerNum() {
  choosePlayersAndGame.classList.add('show');
}

function playersAndGameChosen() {
  choosePlayersAndGame.classList.remove('show');
  findUserSelectedQuestions();
  askQuestion();
}

/** ****   Run Game    ********* */
let pickedQuestions;

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  // winningMessageElement.classList.remove('show')
  fadeOut(winningMessageElement);
  pickedQuestions = [];
  choosePlayersAndGame.classList.add('show');
}
startGame();

/** ******   PLAY against COMPUTER ******** */
function computersMove() {
  const thinkingText = document.querySelector('.thinking');
  const squares = [...cellElements];
  const numToMove = Math.floor(Math.random() * 9);
  const move = squares[numToMove];

  if (move.classList.contains('x') || move.classList.contains('circle')) {
    computersMove(circleTurn);
  } else {
    const wait = (amount = 0) =>
      new Promise((resolve) => setTimeout(resolve, amount));
    thinkingText.classList.add('show');
    // fadeIn(thinkingText)

    play(move);
  }
  //  questionPopUp.classList.add('show')
  // fadeIn(questionPopUp)
}
async function play(move) {
  const thinking = Math.random() * 1000 + 500;
  await wait(thinking);
  move.classList.add('circle');
  if (checkWin(circleClass)) {
    endGame(false);
    thinkingText.classList.remove('show');
    // fadeOut(thinkingText)
  } else if (checkWin(xClass)) {
    endGame(false);
    thinkingText.classList.remove('show');
    // fadeOut(thinkingText)

    // check for draw
  } else if (isDraw()) {
    endGame(true);
  } else {
    // switch turns
    //   fadeOut(thinkingText)
    thinkingText.classList.remove('show');
    swapTurns();
    setBoardHoverClass();
    // fadeIn(questionPopUp)
  }
}
function handleClick(e) {
  const selectPlayers = document.querySelector('#players').value;
  const cell = e.target;
  const currentClass = circleTurn ? circleClass : xClass;

  if (selectPlayers === 'multi') {
    // place mark
    placeMark(cell, currentClass);
    // check for win
    if (checkWin(currentClass)) {
      endGame(false);
      // check for draw
    } else if (isDraw()) {
      endGame(true);
    } else {
      // switch turns
      swapTurns();
      setBoardHoverClass();
    }
  } else if (selectPlayers === 'single' && currentClass === 'x') {
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
      endGame(false);
      // check for draw
    } else if (isDraw()) {
      endGame(true);
    } else {
      // switch turns
      swapTurns();
      setBoardHoverClass();
      computersMove(currentClass);
      if (selectPlayers === 'multi') {
        fadeOut(questionPopUp);
      } else {
        questionPopUp.style.opacity = '0';
        questionPopUp.classList.remove('show');
        // fadeOut(questionPopUp)
      }
      questionPopUp.style.opacity = '0';
      questionPopUp.classList.remove('show');
      // fadeOut(questionPopUp)
    }
  }
}
function isDraw() {
  return [...cellElements].every(
    (cell) =>
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
  );
}
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = `Game was a draw!`;
  } else {
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  // winningMessageElement.classList.add('show')
  fadeIn(winningMessageElement);
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
  return askQuestion();
}
function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);
  circleTurn ? board.classList.add(circleClass) : board.classList.add(xClass);
}
function checkWin(currentClass) {
  return winningCombos.some((combos) =>
    combos.every((index) =>
      cellElements[index].classList.contains(currentClass)
    )
  );
}
const selectQuestions = document.querySelector('#questionsToAsk');

function setBackground() {
  const background = document.querySelector('.fill');
  switch (selectQuestions.value) {
    case 'game1':
      background.style.backgroundColor = 'blue';
      break;
    case 'game2':
      background.style.backgroundColor = 'purple';
      break;
    case 'game3':
      background.style.backgroundColor = 'orange';
      break;
    case 'game4':
      background.style.backgroundColor = 'green';
      break;
    default:
      background.style.backgroundColor = 'yellow';
  }
  // background.style.backgroundColor = `#${randomColor}`;
  // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
}

restartButton.addEventListener('click', startGame);
selectQuestions.addEventListener('change', setBackground);
restartButton.addEventListener('click', setBackground);
setBackground();

/** ****** PRE GAME QUESTIONS *********************************************** */
const answerBtn = document.querySelector('.answerBtn');
const playerText = document.querySelector('.whosTurn');
const questionPopUp = document.querySelector('.questionPopUp');
const questionText = document.querySelector('.questionText');
const tryAgain = document.querySelector('.tryAgain');
let questionIndex = 0;
let wrongAnswerCount = 0;
const chooseGameAndPlayers = document.querySelector('.choosePlayersAndGame');
/** *****    SELECT QUESTIONS FOR GAME **** */
let userSelectedQuestions = '';

function findUserSelectedQuestions() {
  return (userSelectedQuestions = selectQuestions.value);
}
choosePlayersAndGameBtn.addEventListener('change', findUserSelectedQuestions);
const inputBoxType = {
  emotion: 'dropDown',
  subtraction: 'number',
  addition: 'dropDown',
};
const questions = {
  game1: [
    { question: 'What is another word for feelings?', answer: 'Emotions.' },
    {
      question: 'What is a positive sentence you say to yourself?',
      answer: 'Self-Talk sentence.',
    },
    { question: 'What do you call WHO you are?', answer: 'Your identity.' },
    {
      question: 'What is the space around your body that you get to control?',
      answer: 'Your personal bubble.',
    },
    {
      question: 'What is something you can do to calm your emotions?',
      answer: 'Deep breathing.',
    },
    {
      question: 'How can you know how you are feeling?',
      answer: 'Listen to your body.',
    },
    {
      question:
        'When you are feeling emotions that are too much for you to handle on your own, what can you do?',
      answer: 'Get help from a trusted adult.',
    },
    {
      question:
        'What is something you write down that you want to accomplish and work hard to do?',
      answer: 'A goal.',
    },
    {
      question: 'When you need something, what can you do?',
      answer: 'Ask for what you need.',
    },
  ],
  game2: [
    {
      question: 'What is it called when you listen with your whole body?',
      answer: 'Active Listening.',
    },
    {
      question: 'When you have a problem, what can you do?',
      answer: 'Get help from an adult.',
    },
    {
      question: 'When you need to regulate your emotions, what can you do?',
      answer: 'Do belly breathing',
    },
    {
      question: 'What is it called when you know you are worthy of love?',
      answer: 'Self-worth.',
    },
    {
      question:
        'When you have a problem or conflict with another person, what can you say?',
      answer: '“I feel ___ when ___”',
    },
    {
      question: 'Who is the person who cares about you and is kind to you?',
      answer: 'A friend.',
    },
    {
      question: 'What can you do if you feel uncomfortable with someone?',
      answer: 'Walk away.',
    },
    {
      question:
        'What is it called when you understand how another person is feeling?',
      answer: 'Empathy.',
    },
    {
      question: 'If you speak up and are courageous, what are you?',
      answer: 'An upstander.',
    },
  ],
  game3: [
    {
      question: 'Who should you show kindness to when you are kind?',
      answer: 'All people, places, and animals.',
    },
    {
      question:
        'What is it called when you are friends with people who are different from you?',
      answer: 'Diversity.',
    },
    {
      question:
        'When we read a book that is similar to our own experience, is that book a window or a mirror?',
      answer: 'A mirror.',
    },
    {
      question:
        'When we read a book that is different from our own experience, is that book a window or a mirror?',
      answer: 'A window.',
    },
    {
      question:
        'When we label a person based on what we think they are like, what are we doing?',
      answer: 'Using stereotypes.',
    },
    {
      question:
        'If you change who you are when you’re with a group of friends, are you fitting in or belonging?',
      answer: 'Fitting in.',
    },
    {
      question:
        'If you are true to who you are when you’re with a group of friends, even if you are different from them, are you fitting in or belonging?',
      answer: 'Belonging.',
    },
    {
      question: 'What is it called when everyone feels like they belong?',
      answer: 'Inclusion.',
    },
    {
      question:
        'Is it okay to be yourself, even though you are different from other people?',
      answer: 'Yes!',
    },
  ],
  game4: [
    {
      question:
        'What part of your brain is responsible for making your heartbeat?',
      answer: 'Downstairs brain.',
    },
    {
      question:
        'What part of your brain is responsible for making good decisions?',
      answer: 'Upstairs brain.',
    },
    {
      question:
        'How can you connect your downstairs and upstairs brain when you are feeling big emotions?',
      answer: 'Breathe.',
    },
    {
      question: 'What does it mean to have balance in our life?',
      answer: 'To have not too little or not too much of one thing.',
    },
    {
      question: 'What are the benefits of making mistakes?',
      answer: 'Our brain grows and we learn from them.',
    },
    {
      question:
        'What is it called when you find joy and happiness in something?',
      answer: 'Joy.',
    },
    {
      question: 'What is it called when you want to change the world?',
      answer: 'Activism.',
    },
    {
      question:
        'What is it called when your actions and words affect other people around you?',
      answer: 'The ripple effect.',
    },
    {
      question: 'Who is someone who stands tall for what they believe in?',
      answer: 'Leaders.',
    },
  ],
};

/** *******  CREATING ANSWER DROP DOWN TEXT ******** */
function generateAnswerDropdown() {
  const answerDropDownText = document.querySelector('.generateAnswerDropDown');
  if (inputBoxType[userSelectedQuestions] === 'number') {
    return (answerDropDownText.innerHTML = `<input type="number" name="" class="answerDropDown" max="99" id="numberInput"/>`);
  }
  const optionArray = [];
  questions[userSelectedQuestions].forEach((el) => {
    optionArray.push(` <option value='${el.answer}'>${el.answer}</option>`);
  });
  optionArray.unshift(`<select class="answerDropDown" name="answer" id="">`);
  optionArray.push(`</select>`);
  return (answerDropDownText.innerHTML = optionArray);
}

function pickQuestion() {
  const questionI = Math.floor(
    Math.random() * questions[userSelectedQuestions].length
  );
  if (pickedQuestions.includes(questionI)) {
    return pickQuestion();
  }
  pickedQuestions.push(questionI);
  return (questionIndex = questionI);
}

function askQuestion() {
  pickQuestion();
  generateAnswerDropdown();
  questionText.innerText =
    questions[userSelectedQuestions][questionIndex].question;
  // questionPopUp.classList.add('show')
  fadeIn(questionPopUp);

  wrongAnswerCount = 0;
  tryAgain.textContent = '';
  circleTurn
    ? (playerText.innerText = `Player: O's`)
    : (playerText.innerText = `player: X's`);
}

function checkAnswer() {
  const answerDropDown = document.querySelector('.answerDropDown').value;
  const correctText = document.querySelector('.correct');
  if (
    questions[userSelectedQuestions][questionIndex].answer == answerDropDown
  ) {
    questionPopUp.style.opacity = '0';
    correctText.style.display = 'flex';
    questionPopUp.classList.remove('show');
    console.log(questionPopUp);
    setTimeout(() => {
      correctText.style.opacity = '1';
      console.log(questionPopUp);
    }, 20);

    setTimeout(() => {
      console.log(questionPopUp);

      correctText.style.opacity = '0';
      console.log(questionPopUp);

      setTimeout(() => {
        correctText.style.setProperty('display', 'none');
      }, 500);
    }, 1500);
  } else {
    // if (wrongAnswerCount <= 1) {
    //     wrongAnswerCount += 1;
    //      tryAgain.textContent = `Sorry, that's not right.`
    // }else if (wrongAnswerCount <= 2) {
    //     wrongAnswerCount += 1;
    tryAgain.textContent = 'Sorry, that’s not right';
    // }  else if (wrongAnswerCount <= 3) {

    //     wrongAnswerCount += 1;
    //  tryAgain.textContent = questions[userSelectedQuestions][questionIndex].hint
    // }
  }
}

answerBtn.addEventListener('click', checkAnswer);
restartButton.addEventListener('click', askPlayerNum);

/** *****  CSS  TRANSITION ANIMATION HELPER function ************ */
function fadeIn(element) {
  element.classList.add('show');
  console.log(element);
  setTimeout(() => {
    element.style.opacity = '1';
  }, 20);
}

function fadeOut(element) {
  element.style.opacity = '0';

  setTimeout(() => {
    element.classList.remove('show');
  }, 500);
}
