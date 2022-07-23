// https://opentdb.com/api.php?amount=10

const questionRef = document.Selector('#question');
const optionsRef = document.querySelectorAll('.quiz-options');
const btnCategoryRef = Array.from(document.querySelectorAll(".btn-categories"))

async function loadQuestion() {
    const APIUrl = 'https://opentdb.com/api.php?amount=1';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    // console.log(data.results[0]);
    showQuestion(data.results[0]);
}

function showQuestion(data){
    let correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
 
    questionRef.innerHTML = `${data.question} <br> <span class = "category"> ${data.category} </span>`;
}

loadQuestion();

btnCategoryRef.forEach(btn => {
    btn.addEventListener("click", (event)=> {
        
    })
})
