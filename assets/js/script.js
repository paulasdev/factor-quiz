// https://opentdb.com/api.php?amount=10

const questionRef = document.querySelector('#question');
const optionsRef = document.querySelector('#options');
const btnCategoryRef = Array.from(document.querySelectorAll(".btn-categories"))
const correctScoreRef = document.querySelector('#correct-score');
const totalQuestionRef = document.querySelector('#total-question');
const checkAnswerRef = document.querySelector('#check-answer');
const playAgainRef = document.querySelector('#play-again');
const resultsref = document.querySelector('#result');
const gameSectionRef = document.querySelector('#game')
const indexSectionRef = document.querySelector('#index')

let correctAnswer = ""
let correctScore = "" 
let askedCount = 0;
let totalQuestion = 10;

function eventListeners() {
    checkAnswerRef.addEventListener('click', checkAnswer);
    playAgainRef.addEventListener('click', restartQuiz);
}



async function loadQuestion(categoryID) {
    const APIUrl = `https://opentdb.com/api.php?amount=1&category=${categoryID}`;
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    resultsref.innerHTML = "";
    showQuestion(data.results[0]);
}

//Function to display the questions and answers

function showQuestion(data){
    checkAnswerRef.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
  

    questionRef.innerHTML = `${data.question} <br> <span class = "category"> ${data.category} </span>`;
    optionsRef.innerHTML = `${optionsList.map((option, index) => `
             <li> ${index + 1}. <span> ${option} </span> </li>
         `).join('')}
      `;
      selectOption()
}
//Function to select answer
function selectOption() {
    optionsRef.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
          if(selectedOptionsRef) {
            const activeOption = selectedOptionsRef;
            activeOption.classList.remove('selected');
          }
          option.classList.add('selected');
        })
    })
console.log(answer.correctAnswer);
}

//check answer
function checkAnswer() {
    checkAnswerRef.disbled = true;
    if(optionsRef.querySelector('.selected')) {
        let selectedAnswer = optionsRef.querySelector('.selected span').
        textContent;
        if(selectedAnswer.trim() == HTMLDecode(correctAnswer)) {
            correctScore++;
            resultsref.innerHTML = `<p> <i class = "fas fa-check">Correct Answer!</i> </p>`;
        } else {
            resultsref.innerHTML = `<p> <i class = "fas fa-times">Incorrect Answer!</p> <p><small><b>Correct Answer: </b>${correctAnswer}</small></i></p>`;
        }
        checkCount();
    }
}

//convert html entities into normal text of correct answer id there is any
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}


//increase score function
function checkCount() {
    askedCount++;
    setCount();
    if(config.questionAsked === config.totalQuestion) {
        resultsref.innerHTML += `<p> Your score is ${correctScore}. </p>`
        playAgainRef.style.display = "block";
        checkAnswerRef.style.display = "none";

    } else {
        setTimeout(() => {
            loadQuestion();
        }, 300);
    }
}

function setCount() {
    totalQuestionRef.textContent = totalQuestion;
    correctScoreRef.textContent = config.score;
}

//Function to select the question by categories

btnCategoryRef.forEach(btn => {
    btn.addEventListener("click", (event) => {
        switch (event.target.id) {
            case "films":
                loadQuestion(11)
                break;
            case "animals":
                loadQuestion(27)
                break;
            case "cars":
                loadQuestion(28)
                break;
            case "sports":
                loadQuestion(21)
                break;

            default:
                break;
        }
        gameSectionRef.classList.add("show")
        gameSectionRef.classList.remove("hidden")
        indexSectionRef.classList.add("hidden")
    })
})

/**
 * Restarts the score and the game.
 */
function restartQuiz() {
    config.score = 0
    config.questionsAsked = 0;
    playAgainRef.style.display = "none";
    checkAnsweRef.style.display = "block";
    checkAnswerRef.disabled = false;
    setCount();
    loadQuestion();
    gameSectionRef.classList.add("hidden")
    gameSectionRef.classList.remove("show")
    indexSectionRef.classList.remove("hidden")
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    eventListeners();
    totalQuestionRef.innerHTML = config.totalQuestion;
    correctScoreRef.innerHTML = config.score;

});

restartQuiz()