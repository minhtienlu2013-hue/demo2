const questions = [
    {
    question: "Last Sunday, Maria didn’t _________ up late.",
       image: "image/1.jpg",
        answers: [
            { text: "A. waked", correct: true},
            { text: "B. wakes", correct: false},
            { text: "C. was walking", correct: false},
            { text: "D. were walking", correct: false},
        ]
    },
    {
        question: "I am keen on ____________. But my dad is interested in ______________ coins.",
        answers: [
            { text: "A. Antartica", correct: false},
            { text: "B. singing / collected", correct: false},
            { text: "C. sang / collection", correct: false},
            { text: "D. singing / collecting", correct: true},
        ]
    },
    {
       question: "Which is the biggest continent in the world?",
        answers: [
            { text: "A. Asia", correct: true},
            { text: "B. America", correct: false},
            { text: "C. Africa", correct: false},
            { text: "D. Antartica", correct: false},
        ]}
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    homeButton.style.display = "none";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
    const imgElement = document.getElementById("question-image"); 
    if(currentQuestion.image){
        imgElement.src = currentQuestion.image;
        imgElement.style.display = "block"; // Hiện ảnh
    } else {
        imgElement.style.display = "none"; // Ẩn ảnh nếu câu đó không có
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++; 
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
    length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    homeButton.innerHTML = "Homepage";
    homeButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

homeButton.addEventListener("click", ()=>{
    window.location.href = "index.html";
})

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

