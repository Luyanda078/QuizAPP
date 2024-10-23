const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Quiz questions and answers
const questions = [
    { question: "What is the capital of France?", answers: ['a. Paris', 'b. Berlin', 'c. Madrid', 'd. Rome'], correct: 'a' },
    { question: "Which language runs in a web browser?", answers: ['a. Java', 'b. C', 'c. Python', 'd. JavaScript'], correct: 'd' },
    { question: "What does CSS stand for?", answers: ['a. Central Style Sheets', 'b. Cascading Style Sheets', 'c. Control Style Sheets', 'd. Compact Style Sheets'], correct: 'b' },
    { question: "What is the capital of Spain?", answers: ['a. Lisbon', 'b. Madrid', 'c. Barcelona', 'd. Seville'], correct: 'b' },
    { question: "Which is not a programming language?", answers: ['a. Java', 'b. Python', 'c. HTML', 'd. Ruby'], correct: 'c' },
    { question: "Which is the most popular backend framework?", answers: ['a. Express.js', 'b. Django', 'c. Spring', 'd. Laravel'], correct: 'a' },
    { question: "Which company developed React?", answers: ['a. Google', 'b. Facebook', 'c. Microsoft', 'd. Apple'], correct: 'b' },
    { question: "What does HTML stand for?", answers: ['a. Hypertext Markup Language', 'b. Hyperlink Text Language', 'c. Hypertext Marking Language', 'd. Hyper Transfer Markup Language'], correct: 'a' },
    { question: "Which company developed Node.js?", answers: ['a. Facebook', 'b. Microsoft', 'c. Joyent', 'd. Google'], correct: 'c' },
    { question: "What is the output of 2 + '2' in JavaScript?", answers: ['a. 22', 'b. 4', 'c. NaN', 'd. undefined'], correct: 'a' }
];

let score = 0;
let currentQuestion = 0;
let quizTime = 100; // Total quiz time in seconds
let questionTime = 30; // Time for each question in seconds

// Start quiz countdown
function startQuiz() {
    console.log("Quiz has started! You have 100 seconds to complete 10 questions.\n");
    askQuestion();

    // Global quiz timer
    const quizTimer = setInterval(() => {
        quizTime--;
        if (quizTime <= 0 || currentQuestion >= questions.length) {
            clearInterval(quizTimer);
            console.log("\nTime's up for the quiz!");
            endQuiz();
        }
    }, 1000);
}

// Ask the next question
function askQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    console.log(`\nQuestion ${currentQuestion + 1}: ${questions[currentQuestion].question}`);
    questions[currentQuestion].answers.forEach(answer => {
        console.log(answer);
    });

    let timeLeft = questionTime;
    const questionTimer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(questionTimer);
            console.log("\nTime's up for this question!");
            moveToNextQuestion();
        } else {
            process.stdout.write(`Time left for this question: ${timeLeft}s \r`);
        }
        timeLeft--;
    }, 1000);

    rl.question('\nYour answer (a, b, c, d): ', (input) => {
        clearInterval(questionTimer);
        handleAnswer(input.trim().toLowerCase());
    });
}

// Handle user input for answers
function handleAnswer(answer) {
    const correctAnswer = questions[currentQuestion].correct;
    if (answer === correctAnswer) {
        console.log("Correct!");
        score++;
    } else if (["a", "b", "c", "d"].includes(answer)) {
        console.log("Wrong answer.");
    } else {
        console.log("Invalid input. Moving to the next question.");
    }
    moveToNextQuestion();
}

// Move to the next question
function moveToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length && quizTime > 0) {
        askQuestion();
    } else {
        endQuiz();
    }
}

// End quiz and display final score
function endQuiz() {
    rl.close();
    console.log(`\nQuiz over! Your final score is ${score}/${questions.length}.`);
}

// Start the quiz
startQuiz();
