// https://opentdb.com/api.php?amount=10

const questionRef = document.querySelector('#question');
const optionsRef = document.querySelector('#options');
const btnCategoryRef = Array.from(document.querySelectorAll(".btn-categories"))
const correctScoreRef = document.getElementById('correct-score');
const totalQuestionRef = document.getElementById('total-question');
const checkAnswerRef = document.getElementById('check-answer');
const playAgainRef = document.getElementById('play-again');
const resultsref = document.getElementById('result');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

function eventListeners() {
    checkAnswerRef.addEventListener('click', checkAnswer);
    playAgainRef.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    eventListeners();
    totalQuestionRef.textContent = totalQuestion;
    correctScoreRef.textContent = correctScore;

});

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
          if(optionsRef.querySelector('.selected')) {
            const activeOption = optionsRef.querySelector('.selected');
            activeOption.classList.remove('selected');
          }
          option.classList.add('selected');
        })
    })
console.log(correctAnswer);
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
    if(askedCount == totalQuestion) {
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
    correctScoreRef.textContent = correctScore;
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
    })
})

function restartQuiz() {
    correctScore = askedCount = 0;
    playAgainRef.style.display = "none";
    checkAnswer.style.display = "block";
    checkAnswer.disabled = false;
    setCount();
    loadQuestion();
}