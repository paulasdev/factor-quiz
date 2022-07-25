// https://opentdb.com/api.php?amount=10

const questionRef = document.querySelector('#question');
const optionsRef = document.querySelector('#options');
const btnCategoryRef = Array.from(document.querySelectorAll(".btn-categories"))
const correctScoreRef = document.getElementById('correct-score');
const totalQuestionRef = document.getElementById('total-question');
const checkRef = document.getElementById('check-answer');
const resultref = document.getElementById('result');
const playAgainRef = document.getElementById('play-again');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

function addEventListener(){
    optionsRef.addEventListener('click', checkAnswer);
}

document.addEventListener('DOMContentLoaded', () => {
    // loadQuestion();
    totalQuestionRef.textContent = totalQuestion;
    correctScoreRef.textContent = correctScore;
});

async function loadQuestion(categoryID) {
    const APIUrl = `https://opentdb.com/api.php?amount=1&category=${categoryID}`;
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
   
    showQuestion(data.results[0]);
}

//Function to display the questions

function showQuestion(data){
    const question = {
        correctAnswer: data.correct_answer,
        incorrectAnswer: data.incorrectAnswer,
    }
    let correctAnswer = data.correct_answer;
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
}

function checkAnswer() {
    if(optionsRef.querySelector('.selected')) {
        let selectedAnswer = optionsRef.querySelector('.selected span').
        textContent;
        if(selectedAnswer == correctAnswer) {
            correctScore++;
            resultref.innerhtml = `<p> <i class = "fas fa-check"></i>Correct Answer!</p>`;
        } else {
            resultref.innerHTML = `<p> <i class = "fas fa-check"></i>Incorrect Answer! <small><b>Correct Answer: </b> ${correctAnswer}</small></p>`;
        }
    }
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

