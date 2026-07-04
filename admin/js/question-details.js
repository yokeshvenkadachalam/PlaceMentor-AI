/* ==========================================
   PlaceMentor AI
   Question Details
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await checkAdminAuth();

    loadQuestionDetails();

});

/* ==========================================
   LOAD QUESTION DETAILS
========================================== */

async function loadQuestionDetails() {

    const params = new URLSearchParams(

        window.location.search

    );

    const questionId = params.get("id");

    if (!questionId) {

        showToast(

            "Invalid Question ID.",

            "error"

        );

        return;

    }

    try {

        const response = await fetch(

            API.BASE_URL +

            "/admin/questions/" +

            questionId,

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                "Unable to load question."

            );

        }

        const question = await response.json();

        document.getElementById(

            "questionId"

        ).textContent = question.id;

        document.getElementById(

            "category"

        ).textContent = question.category;

        document.getElementById(

            "topic"

        ).textContent = question.topic;

        document.getElementById(

            "difficulty"

        ).textContent = question.difficulty;

        document.getElementById(

            "marks"

        ).textContent = question.marks;

        document.getElementById(

            "status"

        ).textContent =

            question.active

            ? "Active"

            : "Inactive";

        document.getElementById(

            "questionText"

        ).textContent = question.question;

        document.getElementById(

            "optionA"

        ).textContent = question.optionA;

        document.getElementById(

            "optionB"

        ).textContent = question.optionB;

        document.getElementById(

            "optionC"

        ).textContent = question.optionC;

        document.getElementById(

            "optionD"

        ).textContent = question.optionD;

        document.getElementById(

            "correctAnswer"

        ).textContent =

            question.correctAnswer;

        document.getElementById(

            "explanation"

        ).textContent =

            question.explanation || "-";

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load question.",

            "error"

        );

    }

}