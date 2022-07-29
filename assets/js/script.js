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
const selectedOptionsRef = optionsRef.querySelector('.selected')

let correctAnswers = ""
const answers = {}
const config = {
    score: 0,
    questionsAsked: 0,
    totalQuestion: 10
}

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

function showQuestion(data) {
    answers.incorrectAnswers = data.incorrect_answers;
    answers.correctAnswers = data.correctAnswers
    checkAnswerRef.disabled = false;
    optionsList.splice(Math.floor(Math.random() * (answers.incorrectAnswers.length + 1)), 0, answers.correctAnswers);


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
            if (selectedOptionsRef) {
                const activeOption = selectedOptionsRef;
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        })
    })
    console.log(answers.correctAnswers);
}

//check answer
function checkAnswer() {
    checkAnswerRef.disbled = true;
    if (selectedOptionsRef) {
        let selectedAnswers = optionsRef.querySelector('.selected span').innerHTML;
        if (selectedAnswers.trim() === answers.correctAnswers) {
            config.correctScore++;
            resultsref.innerHTML = `<p> <i class = "fas fa-check">Correct Answer!</i> </p>`;
        } else {
            resultsref.innerHTML = `
            <p> 
            <i class = "fas fa-times">Incorrect Answer!
            <small><b>Correct Answer: </b>${answers.correctAnswers}</small>
            </i>
            </p>`;
        }
        checkCount();
    }
}




//increase score function
function checkCount() {
    setCount++;
    setCount();
    if (config.questionAsked === config.totalQuestion) {
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
    totalQuestionRef.textContent = loadQuestion;
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
        indexSectionRef.classList.remove("show")
    })
})

/**
 * Restarts the score and the game.
 */
function restartQuiz() {
    config.score = 0
    config.questionsAsked = 0;
    playAgainRef.style.display = "none";
    checkAnswerRef.style.display = "block";
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


//convert html entities into normal text of correct answer id there is any
// function HTMLDecode(textString) {
//     let doc = new DOMParser().parseFromString(textString, "text/html");
//     return doc.documentElement.textContent;
// }