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
        audio: "2.wav",
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
let timer; // Bộ đếm
let timeValue = 15; // Mỗi câu có 15 giây
const timeLine = document.getElementById("time-line");

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
    clearInterval(timer); // Xóa bộ đếm cũ của câu trước
    timeLine.style.width = "100%"; // Trả thanh Timeline về đầy 100%
    startTimer(15); // Bắt đầu đếm ngược 15 giây mới
    const imgElement = document.getElementById("question-image"); 
    if(currentQuestion.image){
        imgElement.src = currentQuestion.image;
        imgElement.style.display = "block"; // Hiện ảnh
    } else {
        imgElement.style.display = "none"; // Ẩn ảnh nếu câu đó không có
    }
    
    const audioElement = document.getElementById("question-audio");
    if(currentQuestion.audio) {
        audioElement.src = currentQuestion.audio;
        audioElement.style.display = "block"; // Hiện trình phát nhạc
        // audioElement.play(); // Nếu muốn tự động phát khi sang câu mới
    } else {
        audioElement.style.display = "none"; // Ẩn nếu không có audio
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
    clearInterval(timer);
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
function startTimer(time) {
    timer = setInterval(timerFunction, 1000); // Cứ 1 giây chạy 1 lần

    function timerFunction() {
        time--; // Trừ đi 1 giây
        let widthValue = (time / 15) * 100; // Tính % chiều dài còn lại
        timeLine.style.width = widthValue + "%";

        if (time <= 0) { // Nếu hết giờ
            clearInterval(timer); // Dừng bộ đếm
            handleNextButton(); // Tự động chuyển câu hoặc báo hết giờ
        }
    }
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
    window.location.href = "trangchu.html";
})

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

