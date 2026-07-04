
/* ==========================================
   PlaceMentor AI
   Quiz Setup
========================================== */

const API_BASE = "http://localhost:8080/api";

const categorySelect = document.getElementById("category");
const topicSelect = document.getElementById("topic");
const difficultySelect = document.getElementById("difficulty");
const numberOfQuestionsSelect = document.getElementById("numberOfQuestions");
const startQuizBtn = document.getElementById("startQuizBtn");

/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadCategories();

    categorySelect.addEventListener(
        "change",
        loadTopics
    );

    startQuizBtn.addEventListener(
        "click",
        startQuiz
    );

});

/* ==========================================
   AUTH HEADER
========================================== */

function getHeaders() {

    const token = localStorage.getItem("token");

    return {

        "Content-Type": "application/json",

        "Authorization": `Bearer ${token}`

    };

}

/* ==========================================
   LOAD CATEGORIES
========================================== */

async function loadCategories() {

    try {

        const response = await fetch(

            `${API_BASE}/quiz/categories`,

            {

                headers: getHeaders()

            }

        );

        const categories = await response.json();

        categorySelect.innerHTML =

            '<option value="">Select Category</option>';

        categories.forEach(category => {

            categorySelect.innerHTML += `

                <option value="${category.id}">

                    ${category.name}

                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load categories.");

    }

}

/* ==========================================
   LOAD TOPICS
========================================== */

async function loadTopics() {

    const categoryId = categorySelect.value;

    if (!categoryId) {

        topicSelect.innerHTML =

            '<option>Select Category First</option>';

        return;

    }

    try {

        const response = await fetch(

            `${API_BASE}/quiz/topics/${categoryId}`,

            {

                headers: getHeaders()

            }

        );

        const topics = await response.json();

        topicSelect.innerHTML =

            '<option value="">Select Topic</option>';

        topics.forEach(topic => {

            topicSelect.innerHTML += `

                <option value="${topic.id}">

                    ${topic.name}

                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================
   START QUIZ
========================================== */

async function startQuiz() {

    if (!categorySelect.value) {

        alert("Please select a category.");

        return;

    }

    if (!topicSelect.value) {

        alert("Please select a topic.");

        return;

    }

    const request = {

        categoryId:

            parseInt(categorySelect.value),

        topicId:

            parseInt(topicSelect.value),

        difficulty:

            difficultySelect.value,

        numberOfQuestions:

            parseInt(

                numberOfQuestionsSelect.value

            )

    };

    try {

        const response = await fetch(

            `${API_BASE}/quiz/start`,

            {

                method: "POST",

                headers: getHeaders(),

                body: JSON.stringify(request)

            }

        );

        if (!response.ok) {

            throw new Error(

                "Unable to start quiz."

            );

        }

        const quiz = await response.json();

        sessionStorage.setItem(

            "quiz",

            JSON.stringify(quiz)

        );

        window.location.href =

            "quiz.html";

    }

    catch (error) {

        console.error(error);

        alert(

            "Unable to start quiz."

        );

    }

}