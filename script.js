const questions = [
    {
        question: "which is the largest animal in the world ?",
        answers: [
            {text: "shark", correct: false},
            {text: "blue whale", correct: true},
            {text: "elephant", correct: false},
            {text: "giraffe", correct: false},
        ]
    },

    {
        question: "which is the smallest country in the world ?",
        answers: [
            { text: "italy", correct: true},
            { text: "bhutan", correct: false},
            { text: "nepal", correct: false},
            { text: "shri lanka", correct: false},
        ]
    },

    {
        question: "which is the largest desert in the world ?",
        answers: [
            {text: "kalahari", correct: false},
            {text: "gobi", correct: false},
            {text: "sahara", correct: false},
            {text: "antarctica", correct: true},
        ]
    },

    {
        question: "which is the smallest continent in the world ?",
        answers: [
            {text: "asia", correct: false},
            {text: "australia", correct: true},
            {text: "arctic", correct: false},
            {text: "africa", correct: false},
        ]
    }
];

const question_element = document.getElementById("question");
const answer_buttons = document.getElementById("answer_buttons");
const next_btn = document.getElementById("next_btn");

let current_question_index = 0;
let score = 0;

function startQuiz(){
    current_question_index = 0;
    score = 0;
    next_btn.innerHTML = "next";
    showquestion();
}

function showquestion(){
    resetState();
    let current_question = questions[current_question_index];
    let question_number = current_question_index + 1 ;
    question_element.innerHTML = question_number + ". " + current_question.question;

    current_question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answer_buttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    next_btn.style.display = "none";
    while(answer_buttons.firstChild){
        answer_buttons.removeChild(answer_buttons.firstChild);
    }
}

function selectAnswer(e){
    const select_btn = e.target;
    const is_correct = select_btn.dataset.correct == "true";
    if(is_correct){
        select_btn.classList.add('correct');
        score++;
    }else{
        select_btn.classList.add('in_correct')
    }
    Array.from(answer_buttons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = "true";
    });
    next_btn.style.display = "block";
}

function showscore(){
    resetState();
    question_element.innerHTML = `you scored ${score} out of ${questions.length}!`;
    next_btn.innerHTML = "play again";
    next_btn.style.display = "block"; 
}

function handle_next_button(){
    current_question_index++;
    if(current_question_index < questions.length){
        showquestion();
    }else{
        showscore();
    }
}

next_btn.addEventListener("click", ()=>{
    if(current_question_index < questions.length){
        handle_next_button();
    }else{
        startQuiz();
    }
})

startQuiz();