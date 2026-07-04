/* ==========================================
   PlaceMentor AI
   Result Page
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadResult();

});

/* ==========================================
   LOAD RESULT
========================================== */

function loadResult() {

    const result = JSON.parse(
        sessionStorage.getItem("quizResult")
    );

    if (!result) {

        alert("No quiz result found.");

        window.location.href = "dashboard.html";

        return;

    }

    document.getElementById("percentage").textContent =
        result.percentage.toFixed(2) + "%";

    document.getElementById("correct").textContent =
        result.correctAnswers;

    document.getElementById("wrong").textContent =
        result.wrongAnswers;

    document.getElementById("skipped").textContent =
        result.unanswered;

    createChart(result);

    loadReview(result);

    saveQuizHistory(result);

}

/* ==========================================
   CHART
========================================== */

function createChart(result) {

    const ctx = document
        .getElementById("resultChart")
        .getContext("2d");

    new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Correct",
                "Wrong",
                "Skipped"
            ],

            datasets: [{

                data: [

                    result.correctAnswers,
                    result.wrongAnswers,
                    result.unanswered

                ],

                backgroundColor: [

                    "#16A34A",
                    "#DC2626",
                    "#F59E0B"

                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

/* ==========================================
   ANSWER REVIEW
========================================== */

function loadReview(result) {

    const reviewList =
        document.getElementById("reviewList");

    reviewList.innerHTML = "";

    result.answers.forEach((answer, index) => {

        let status = "Skipped";
        let css = "skipped";

        if (answer.selectedAnswer) {

            if (answer.correct) {

                status = "Correct";
                css = "correct";

            } else {

                status = "Wrong";
                css = "wrong";

            }

        }

        const div =
            document.createElement("div");

        div.className = "review-item";

        div.innerHTML = `

            <h3>
                Question ${index + 1}
            </h3>

            <p>
                <strong>Question:</strong><br>
                ${answer.question}
            </p>

            <p>
                <strong>Your Answer:</strong>
                ${answer.selectedAnswer ?? "Not Answered"}
            </p>

            <p>
                <strong>Correct Answer:</strong>
                ${answer.correctAnswer}
            </p>

            <p>
                <strong>Explanation:</strong><br>
                ${answer.explanation}
            </p>

            <p class="${css}">
                ${status}
            </p>

        `;

        reviewList.appendChild(div);

    });

}

/* ==========================================
   SAVE HISTORY
========================================== */

function saveQuizHistory(result) {

    let history = JSON.parse(
        localStorage.getItem("quizHistory")
    ) || [];

    if (
        history.length &&
        history[0].attemptId === result.attemptId
    ) {
        return;
    }

    history.unshift({

        attemptId: result.attemptId,

        date: new Date().toLocaleString(),

        score: result.obtainedMarks,

        total: result.totalMarks,

        percentage: result.percentage,

        passed: result.passed

    });

    localStorage.setItem(
        "quizHistory",
        JSON.stringify(history)
    );

}

/* ==========================================
   BUTTONS
========================================== */

document
.getElementById("retakeBtn")
.addEventListener("click", () => {

    sessionStorage.removeItem("quiz");

    sessionStorage.removeItem("quizProgress");

    sessionStorage.removeItem("quizResult");

    window.location.href =
        "quiz-setup.html";

});

document
.getElementById("dashboardBtn")
.addEventListener("click", () => {

    window.location.href =
        "dashboard.html";

});