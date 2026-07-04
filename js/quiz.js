/* ==========================================================
   PlaceMentor AI
   Backend Quiz Engine
   Part 1 - Initialization
========================================================== */

/* ==========================================
   CONFIG
========================================== */

const API_BASE = "http://localhost:8080/api";

/* ==========================================
   GLOBAL VARIABLES
========================================== */

let quiz = null;
let quizQuestions = [];

let currentQuestion = 0;

let userAnswers = [];

let timerInterval;
let totalTime = 30 * 60;

let bookmarkedQuestions = [];

let reviewQuestions = [];

let quizSubmitted = false;

/* ==========================================
   DOM READY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeQuiz();

});

/* ==========================================
   INITIALIZE QUIZ
========================================== */

function initializeQuiz() {

    const storedQuiz =
        sessionStorage.getItem("quiz");

    if (!storedQuiz) {

        alert("Quiz not found.");

        window.location.href =
            "quiz-setup.html";

        return;

    }

    quiz = JSON.parse(storedQuiz);

    console.log("Quiz Loaded");

    console.log(quiz);

    quizQuestions = quiz.questions;

    userAnswers = new Array(
        quizQuestions.length
    ).fill(null);

    document.getElementById("quizTitle").textContent =

        `${quiz.categoryName} - ${quiz.topicName}`;

    document.getElementById("questionNumber").textContent =

        `Question 1 / ${quizQuestions.length}`;

    createPalette();

    loadQuestion();

    startTimer();

}

/* ==========================================
   LOAD QUESTION
========================================== */

function loadQuestion() {

    const question =

        quizQuestions[currentQuestion];

    if (!question) return;

    document.getElementById("questionNumber").textContent =

        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;

    document.getElementById("question").textContent =

        question.question;

    document.getElementById("optionA").textContent =

        question.optionA;

    document.getElementById("optionB").textContent =

        question.optionB;

    document.getElementById("optionC").textContent =

        question.optionC;

    document.getElementById("optionD").textContent =

        question.optionD;

    document
        .querySelectorAll("input[name='option']")
        .forEach(radio => {

            radio.checked = false;

        });

    if (userAnswers[currentQuestion]) {

        document.querySelector(

            `input[value="${userAnswers[currentQuestion]}"]`

        ).checked = true;

    }

    updateProgress();

    updatePalette();

}

/* ==========================================
   SAVE ANSWER
========================================== */

document
.querySelectorAll("input[name='option']")
.forEach(radio => {

    radio.addEventListener("change", function () {

        userAnswers[currentQuestion] =
            this.value;

        updatePalette();

    });

});

/* ==========================================
   PROGRESS BAR
========================================== */

function updateProgress() {

    const progress =

        ((currentQuestion + 1)

            / quizQuestions.length)

        * 100;

    document.getElementById("progressBar").style.width =

        progress + "%";

}
/* ==========================================================
   PlaceMentor AI
   Backend Quiz Engine
   Part 2 - Navigation & Question Palette
========================================================== */

/* ==========================================
   NEXT BUTTON
========================================== */

document
.getElementById("nextBtn")
.addEventListener("click", () => {

    if (currentQuestion < quizQuestions.length - 1) {

        currentQuestion++;

        loadQuestion();

    }

});

/* ==========================================
   PREVIOUS BUTTON
========================================== */

document
.getElementById("prevBtn")
.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});

/* ==========================================
   CREATE QUESTION PALETTE
========================================== */

function createPalette() {

    const palette =

        document.getElementById("paletteGrid");

    palette.innerHTML = "";

    quizQuestions.forEach((question, index) => {

        const button =

            document.createElement("button");

        button.id = "p" + index;

        button.textContent = index + 1;

        button.addEventListener("click", () => {

            currentQuestion = index;

            loadQuestion();

        });

        palette.appendChild(button);

    });

}

/* ==========================================
   UPDATE QUESTION PALETTE
========================================== */

function updatePalette() {

    quizQuestions.forEach((q, index) => {

        const button =

            document.getElementById("p" + index);

        if (!button) return;

        button.className = "";

        if (index === currentQuestion) {

            button.classList.add("current");

            return;

        }

        if (reviewQuestions.includes(index)) {

            button.classList.add("review");

            return;

        }

        if (bookmarkedQuestions.includes(index)) {

            button.classList.add("bookmark");

            return;

        }

        if (userAnswers[index] !== null) {

            button.classList.add("answered");

            return;

        }

        button.classList.add("unanswered");

    });

}

/* ==========================================
   GO TO QUESTION
========================================== */

function goToQuestion(index) {

    if (

        index < 0 ||

        index >= quizQuestions.length

    ) {

        return;

    }

    currentQuestion = index;

    loadQuestion();

}

/* ==========================================
   ENABLE KEYBOARD NAVIGATION
========================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        if (currentQuestion < quizQuestions.length - 1) {

            currentQuestion++;

            loadQuestion();

        }

    }

    if (event.key === "ArrowLeft") {

        if (currentQuestion > 0) {

            currentQuestion--;

            loadQuestion();

        }

    }

});

/* ==========================================
   UPDATE BUTTON STATES
========================================== */

function updateNavigationButtons() {

    document.getElementById("prevBtn").disabled =

        currentQuestion === 0;

    document.getElementById("nextBtn").disabled =

        currentQuestion === quizQuestions.length - 1;

}

/* ==========================================
   OVERRIDE LOAD QUESTION
========================================== */

const originalLoadQuestion = loadQuestion;

loadQuestion = function () {

    originalLoadQuestion();

    updateNavigationButtons();

};
/* ==========================================================
   PlaceMentor AI
   Backend Quiz Engine
   Part 3 - Timer, Auto Save, Bookmark & Review
========================================================== */

/* ==========================================
   TIMER
========================================== */

function startTimer() {

    const timer = document.getElementById("timer");

    // 1 minute per question (minimum 5 minutes)
    totalTime = Math.max(quizQuestions.length * 60, 300);

    updateTimer();

    timerInterval = setInterval(() => {

        totalTime--;

        updateTimer();

        if (totalTime <= 0) {

            clearInterval(timerInterval);

            alert("Time is over!");

            submitQuiz();

        }

    }, 1000);

}

/* ==========================================
   UPDATE TIMER
========================================== */

function updateTimer() {

    const timer = document.getElementById("timer");

    const minutes = Math.floor(totalTime / 60);

    const seconds = totalTime % 60;

    timer.textContent =

        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (totalTime <= 300) {

        timer.style.background = "#EF4444";

        timer.style.color = "#fff";

    }

}

/* ==========================================
   AUTO SAVE
========================================== */

function startAutoSave() {

    setInterval(() => {

        const quizProgress = {

            answers: userAnswers,

            bookmarks: bookmarkedQuestions,

            review: reviewQuestions,

            currentQuestion: currentQuestion,

            totalTime: totalTime

        };

        sessionStorage.setItem(

            "quizProgress",

            JSON.stringify(quizProgress)

        );

    }, 5000);

}

/* ==========================================
   RESTORE QUIZ PROGRESS
========================================== */

function restoreProgress() {

    const saved =

        sessionStorage.getItem("quizProgress");

    if (!saved) return;

    const progress = JSON.parse(saved);

    if (progress.answers) {

        userAnswers = progress.answers;

    }

    if (progress.bookmarks) {

        bookmarkedQuestions = progress.bookmarks;

    }

    if (progress.review) {

        reviewQuestions = progress.review;

    }

    if (progress.currentQuestion !== undefined) {

        currentQuestion = progress.currentQuestion;

    }

    if (progress.totalTime) {

        totalTime = progress.totalTime;

    }

}

/* ==========================================
   BOOKMARK
========================================== */

document
.getElementById("bookmarkBtn")
.addEventListener("click", () => {

    if (

        bookmarkedQuestions.includes(currentQuestion)

    ) {

        bookmarkedQuestions =

            bookmarkedQuestions.filter(

                q => q !== currentQuestion

            );

    }

    else {

        bookmarkedQuestions.push(

            currentQuestion

        );

    }

    updatePalette();

});

/* ==========================================
   REVIEW LATER
========================================== */

document
.getElementById("reviewBtn")
.addEventListener("click", () => {

    if (

        reviewQuestions.includes(currentQuestion)

    ) {

        reviewQuestions =

            reviewQuestions.filter(

                q => q !== currentQuestion

            );

    }

    else {

        reviewQuestions.push(

            currentQuestion

        );

    }

    updatePalette();

});

/* ==========================================
   PAGE REFRESH WARNING
========================================== */

window.addEventListener("beforeunload", function (e) {

    if (!quizSubmitted) {

        e.preventDefault();

        e.returnValue = "";

    }

});

/* ==========================================
   START AUTO SAVE AFTER INITIALIZATION
========================================== */

const originalInitializeQuiz = initializeQuiz;

initializeQuiz = function () {

    originalInitializeQuiz();

    restoreProgress();

    loadQuestion();

    startAutoSave();

};
/* ==========================================================
   PlaceMentor AI
   Backend Quiz Engine
   Part 4 - Submit Quiz
========================================================== */

/* ==========================================
   SUBMIT BUTTON
========================================== */

document
.getElementById("submitBtn")
.addEventListener("click", submitQuiz);

/* ==========================================
   SUBMIT QUIZ
========================================== */

async function submitQuiz() {

    if (quizSubmitted) return;

    const confirmSubmit = confirm(
        "Are you sure you want to submit the quiz?"
    );

    if (!confirmSubmit) return;

    quizSubmitted = true;

    disableQuizControls();

    clearInterval(timerInterval);

    const answers = [];

    quizQuestions.forEach((question, index) => {

        answers.push({

            questionId: question.id,

            selectedAnswer: userAnswers[index]

        });

    });

    const request = {

        categoryId: quiz.categoryId,

        topicId: quiz.topicId,

        difficulty: quiz.difficulty,

        timeTaken: Math.max(0, (quizQuestions.length * 60) - totalTime),

        answers: answers

    };

    console.log(request);

    try {

        const token =

            localStorage.getItem("token");

        const response = await fetch(

            API_BASE + "/quiz/submit",

            {

                method: "POST",

                headers: {

                    "Content-Type":"application/json",

                    "Authorization":"Bearer " + token

                },

                body: JSON.stringify(request)

            }

        );

        if(!response.ok){

            throw new Error("Quiz submission failed.");

        }

        const result = await response.json();

        console.log(result);

        sessionStorage.setItem(

            "quizResult",

            JSON.stringify(result)

        );

        sessionStorage.removeItem("quiz");

        sessionStorage.removeItem("quizProgress");

        window.location.href =

            "result.html";

    }

    catch(error){

    console.error(error);

    alert(error.message);

    quizSubmitted = false;

    enableQuizControls();

}

}
/* ==========================================
   DISABLE QUIZ CONTROLS
========================================== */

function disableQuizControls() {

    document
        .querySelectorAll("input[name='option']")
        .forEach(radio => {

            radio.disabled = true;

        });

    document.getElementById("prevBtn").disabled = true;

    document.getElementById("nextBtn").disabled = true;

    document.getElementById("bookmarkBtn").disabled = true;

    document.getElementById("reviewBtn").disabled = true;

    document.getElementById("submitBtn").disabled = true;

}
/* ==========================================
   ENABLE QUIZ CONTROLS
========================================== */

function enableQuizControls() {

    document
        .querySelectorAll("input[name='option']")
        .forEach(radio => {

            radio.disabled = false;

        });

    document.getElementById("prevBtn").disabled = false;

    document.getElementById("nextBtn").disabled = false;

    document.getElementById("bookmarkBtn").disabled = false;

    document.getElementById("reviewBtn").disabled = false;

    document.getElementById("submitBtn").disabled = false;

}