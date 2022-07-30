// https://opentdb.com/api.php?amount=10

const questionRef = document.querySelector('#question');
const optionsRef = document.querySelector('#options');
const btnCategoryRef = Array.from(document.querySelectorAll(".btn-categories"))
const btnCheckAnswer = document.querySelector('#check-answer');
const btnPlayAgain = document.querySelector('#play-again');
const correctScoreRef = document.querySelector('#correct-score');
const totalQuestionRef = document.querySelector('#total-question');
const resultsref = document.querySelector('#result');

const gameSectionRef = document.querySelector('#game')
const indexSectionRef = document.querySelector('#index')
// const selectedOptionsRef = optionsRef.querySelector('.selected')

let correctAnswer = "", correctScore = questionCount = 0, totalQuestion = 10;

// let correctAnswers = ""
// const answers = {}
// const config = {
//     score: 0,
//     questionsAsked: 0,
//     totalQuestion: 10
// }


function eventListeners() {
    btnCheckAnswer.addEventListener('click', checkAnswer);
    btnPlayAgain.addEventListener('click', restartQuiz);
}

async function loadQuestion(categoryID) {
    const APIUrl = `https://opentdb.com/api.php?amount=1&category=${categoryID}`;
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    resultsref.innerHTML = "";
    showQuestion(data.results[0]);
}




//start here test

document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    eventListeners();
    totalQuestionRef.textContent = totalQuestion;
    totalQuestionRef.textContent = correctScore;
});

//test ok
function showQuestion(data){
    btnCheckAnswer.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // console.log(correctAnswer);

    
    questionRef.innerHTML = `${data.question} <br> <span class = ".btn-categories"> ${data.category} </span>`;
    optionsRef.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}

// options selection - test ok
function selectOption(){
    optionsRef.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(optionsRef.querySelector('.selected')){
                const activeOption = optionsRef.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function checkAnswer(){
    btnCheckAnswer.disabled = true;
    if(optionsRef.querySelector('.selected')){
        let selectedAnswer = optionsRef.querySelector('.selected span').textContent;
        if(selectedAnswer == HTMLDecode(correctAnswer)){
            correctScore++;
            resultsref.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
        } else {
            resultsref.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        resultsref.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        btnCheckAnswer.disabled = false;
    }
}

// to convert html entities into normal text of correct answer if there is any
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount() {
    questionCount++;
    setCount();
    if(questionCount == totalQuestion){
        alert("hello");
        setTimeout(function(){
            console.log("");
        }, 5000);


        resultsref.innerHTML += `<p>Your score is ${correctScore}.</p>`;
        btnCheckAnswer.style.display = "none";
    } else {
        setTimeout(function(){
            loadQuestion();
        }, 300);
    }
}

function setCount(){
    totalQuestionRef.textContent = totalQuestion;
    correctScoreRef.textContent = correctScore;
}


// function restartQuiz(){
//     correctScore = questionCount = 0;
//     btnPlayAgain.style.display = "none";
//     btnCheckAnswer.style.display = "block";
//     btnCheckAnswer.disabled = false;
//     setCount();
//     loadQuestion();
    
//     gameSectionRef.classList.add("hidden")
//     gameSectionRef.classList.remove("show")
//     indexSectionRef.classList.remove("hidden")
// }








//finish here

/**
 * Function to display the questions and answers
**/
// function showQuestion(data) {
//     correctAnswer = data.correct_answer;
//     let incorrectAnswer = data.incorrect_answers;
//     // checkAnswerRef.disabled = false;
//     let optionsList = incorrectAnswer;
//     optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
//     console.log(optionsList);
//     console.log(correctAnswer);
//     questionRef.innerHTML = `${data.question} <br> <span class = ".btn-categories"> ${data.category} </span>`;
//     optionsRef.innerHTML = `${optionsList.map((option, index) => `
//              <li> ${index + 1}. <span> ${option} </span> </li>
//         `).join('')}
//        `;
//      selectOption()
// }

// document.addEventListener('DOMContentLoaded', function(){
//     loadQuestion();
//     eventListeners();
//     _totalQuestion.textContent = totalQuestion;
//     _correctScore.textContent = correctScore;
// });


// //Function to select answer
// function selectOption() {
//     optionsRef.querySelectorAll('li').forEach((option) => {
//         option.addEventListener('click', () => {
//             if (selectedOptionsRef) {
//                 const activeOption = selectedOptionsRef;
//                 activeOption.classList.remove('selected');
//             }
//             option.classList.add('selected');
//         })
//     })
//     console.log(answers.correctAnswers);
// }

/**
 * Function to check the answer
 */
// function checkAnswer() {
//     checkAnswerRef.disbled = true;
//     if (selectedOptionsRef) {
//         let selectedAnswers = optionsRef.querySelector('.selected span').innerHTML;
//         if (selectedAnswers.trim() === correct_answer) {
//             config.correctScore++;
//             resultsref.innerHTML = `<p> <i class = "fas fa-check">Correct Answer!</i> </p>`;
//         } else {
//             resultsref.innerHTML = `
//             <p> 
//             <i class = "fas fa-times">Incorrect Answer!
//             <small><b>Correct Answer: </b>${correctAnswers}</small>
//             </i>
//             </p>`;
//         }
//         checkCount();
//     }
// }




//increase score function
// function checkCount() {
//     setCount++;
//     setCount();
//     if (config.questionAsked === config.totalQuestion) {
//         resultsref.innerHTML += `<p> Your score is ${correctScore}. </p>`
//         playAgainRef.style.display = "block";
//         checkAnswerRef.style.display = "none";

//     } else {
//         setTimeout(() => {
//             loadQuestion();
//         }, 300);
//     }
// }

// function setCount() {
//     totalQuestionRef.textContent = loadQuestion;
//     correctScoreRef.textContent = config.score;
// }

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
// function restartQuiz() {
//     config.score = 0
//     config.questionsAsked = 0;
//     playAgainRef.style.display = "none";
//     checkAnswerRef.style.display = "block";
//     checkAnswerRef.disabled = false;
//     setCount();
//     loadQuestion();
//     gameSectionRef.classList.add("hidden")
//     gameSectionRef.classList.remove("show")
//     indexSectionRef.classList.remove("hidden")
// }

// restartQuiz()

// document.addEventListener('DOMContentLoaded', () => {
//     loadQuestion();
//     eventListeners();
// //    totalQuestionRef.innerHTML = config.totalQuestion;
// //     correctScoreRef.innerHTML = config.score;

// });


