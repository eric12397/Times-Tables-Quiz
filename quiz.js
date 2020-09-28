let highScore = 0;
let numberCorrect = 0;
let numberIncorrect = 0;

const result_div = document.querySelector('.result')
const highScore_div = document.querySelector('.high-score')
const lives = document.querySelectorAll('.life')

const choice1_div = document.getElementById('choice-1')
const choice2_div = document.getElementById('choice-2')
const choice3_div = document.getElementById('choice-3')
const choice4_div = document.getElementById('choice-4')
const choices = document.querySelectorAll('.choice')

const factor1_span = document.getElementById('factor-1')
const factor2_span = document.getElementById('factor-2')
const answer_span = document.getElementById('answer')
const correctValue_span = document.getElementById('correct-value')
const incorrectValue_span = document.getElementById('incorrect-value')

const runTimer = () => {
  setInterval(() => {
    const width = parseInt($('.timer-bar')[0].style.width) - 1;
    $(".timer-bar").width(width + '%');
  }, 300)
}

const addTimer = () => {
  const currentWidth = parseInt($('.timer-bar')[0].style.width)
  if (currentWidth <= 90) {
    const newWidth = currentWidth + 10
    $(".timer-bar").width(newWidth + '%');
  } else {
    $(".timer-bar").width(100 + '%');
  }
}

const updateStats = result => {
  if (result === 'correct') {
    correctValue_span.innerHTML = numberCorrect += 1;
    highScore_div.innerHTML = highScore += 10;
  } if (result === 'incorrect') {
    incorrectValue_span.innerHTML = numberIncorrect += 1;
  }
} 

const handleCorrectAnswer = answer => {
  //result_div.innerHTML = "Correct!!"
  answer_span.innerHTML = answer
  setTimeout(getNewProblem, 1200)
  addTimer()
  updateStats('correct')
}

const handleIncorrectAnswer = answer => {
  //result_div.innerHTML = `Incorrect! The correct answer is ${answer}.`
  answer_span.innerHTML = answer
  setTimeout(getNewProblem, 1200)
  updateStats('incorrect')
}

const evaluateAnswer = userInput => {
  const answer = factor1_span.innerHTML * factor2_span.innerHTML
  if (userInput == answer) {
    handleCorrectAnswer(answer)
  } else {
    handleIncorrectAnswer(answer)
  }
}

const generateIncorrectAnswers = answer => {
  const min = answer - 4 > 0 ? answer - 4 : 0 // ensures that min is not a negative integer
  const max = answer + 4
  const incorrectAnswersArray = Array.from({length: max - min + 1},(v,k)=>k + min)
  return incorrectAnswersArray.filter(e => e !== answer)
}

const getNewProblem = () => {
  const randomFactor1 = Math.floor(Math.random() * 12) + 1; 
  const randomFactor2 = Math.floor(Math.random() * 12) + 1; 
  const correctAnswer = randomFactor1 * randomFactor2
  factor1_span.innerHTML = randomFactor1
  factor2_span.innerHTML = randomFactor2
  answer_span.innerHTML = '';
  result_div.innerHTML = '';

  const getNewChoices = () => { // closure can access correctAnswer from outer function's scope
    choices[Math.floor(Math.random() * choices.length)].innerText = correctAnswer 
    let incorrectAnswers = generateIncorrectAnswers(correctAnswer)
    choices.forEach(choice => {
      if (choice.innerText != correctAnswer) {
        console.log('incorrectAnswers before', incorrectAnswers)
        const index = Math.floor(Math.random() * incorrectAnswers.length)
        const incorrectAnswer = incorrectAnswers[index] // chooses random answer from array
        choice.innerText = incorrectAnswer
        incorrectAnswers.splice(index, 1) // remove from array to avoid duplicate choices
        console.log('incorrectAnswers after', incorrectAnswers)
      }
    })
  }
  getNewChoices()
}

const main = () => {
  getNewProblem()
  runTimer()
  choice1_div.addEventListener('click', () => evaluateAnswer(choice1_div.innerText))
  choice2_div.addEventListener('click', () => evaluateAnswer(choice2_div.innerText))
  choice3_div.addEventListener('click', () => evaluateAnswer(choice3_div.innerText))
  choice4_div.addEventListener('click', () => evaluateAnswer(choice4_div.innerText))
}

main()
