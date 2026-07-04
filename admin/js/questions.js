/* ==========================================
   PlaceMentor AI
   Question Management
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await checkAdminAuth();

    initializeEvents();
    await loadCategories();

    await loadQuestions();

});

let editingQuestionId = null;
/* ==========================================
   EVENTS
========================================== */

function initializeEvents(){

    document
    .getElementById("addQuestionBtn")
    .addEventListener("click", openModal);

    document
    .getElementById("closeQuestionModal")
    .addEventListener("click", closeModal);

    document
    .getElementById("saveQuestionBtn")
    .addEventListener("click", saveQuestion);

    document
    .getElementById("searchQuestion")
    .addEventListener("keyup", filterQuestions);

    document
    .getElementById("categoryFilter")
    .addEventListener("change", filterQuestions);
    document
    .getElementById("questionCategory")
    .addEventListener("change", function () {

        loadTopics(this.value);

    });

    document
    .getElementById("difficultyFilter")
    .addEventListener("change", filterQuestions);

}

/* ==========================================
   STORAGE
========================================== */





/* ==========================================
   LOAD QUESTIONS
========================================== */

async function loadQuestions() {

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/questions",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load questions.");

        }

        const data = await response.json();

        document.getElementById(

            "questionCount"

        ).textContent = data.totalQuestions;

        const table =

            document.getElementById(

                "questionTable"

            );

        table.innerHTML = "";

        if (

            !data.questions ||

            data.questions.length === 0

        ) {

            table.innerHTML = `

                <tr>

                    <td colspan="5">

                        No Questions Found

                    </td>

                </tr>

            `;

            return;

        }

        data.questions.forEach(question => {

            table.innerHTML += `

                <tr>

                    <td>${question.question}</td>

                    <td>${question.category}</td>

                    <td>${question.difficulty}</td>

                    <td>${question.correctAnswer}</td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="view-btn"
                                onclick="viewQuestion(${question.id})">

                                <i class="fa-solid fa-eye"></i>

                            </button>

                            <button
                                class="edit-btn"
                                onclick="editQuestion(${question.id})">

                                <i class="fa-solid fa-pen"></i>

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteQuestion(${question.id})">

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load questions.",

            "error"

        );

    }

}
/* ==========================================
   LOAD CATEGORIES
========================================== */

async function loadCategories() {

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/categories",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load categories.");

        }

        const data = await response.json();

        const categories = data.categories;

        const categorySelect = document.getElementById(

            "questionCategory"

        );

        categorySelect.innerHTML = `

            <option value="">

                Select Category

            </option>

        `;

        categories.forEach(category => {

            categorySelect.innerHTML += `

                <option value="${category.name}">

                    ${category.name}

                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message,

            "error"

        );

    }

}
/* ==========================================
   LOAD TOPICS
========================================== */

async function loadTopics(categoryName) {

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/topics",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load topics.");

        }

        const data = await response.json();

        const topics = data.topics;

        const topicSelect = document.getElementById(

            "questionTopic"

        );

        topicSelect.innerHTML = `

            <option value="">

                Select Topic

            </option>

        `;

        topics
            .filter(topic => topic.category === categoryName)
            .forEach(topic => {

                topicSelect.innerHTML += `

                    <option value="${topic.name}">

                        ${topic.name}

                    </option>

                `;

            });

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message,

            "error"

        );

    }

}
/* ==========================================
   SAVE / UPDATE QUESTION
========================================== */

async function saveQuestion() {

    const payload = {

    question: document.getElementById("questionText").value.trim(),

    optionA: document.getElementById("optionA").value.trim(),

    optionB: document.getElementById("optionB").value.trim(),

    optionC: document.getElementById("optionC").value.trim(),

    optionD: document.getElementById("optionD").value.trim(),

    correctAnswer: document.getElementById("correctAnswer").value,

    explanation: document.getElementById("explanation").value.trim(),

    category: document.getElementById("questionCategory").value,

    topic: document.getElementById("questionTopic").value,

    difficulty: document.getElementById("questionDifficulty").value.toUpperCase(),

    marks: 1,

    active: true

};

    if (

        !payload.question ||

        !payload.optionA ||

        !payload.optionB ||

        !payload.optionC ||

        !payload.optionD ||

        !payload.correctAnswer

    ) {

        showToast(
            "Fill all fields.",
            "error"
        );

        return;

    }

    try {

        let url;
        let method;

        if (editingQuestionId) {

            url =

                API.BASE_URL +

                "/admin/questions/" +

                editingQuestionId;

            method = "PUT";

        }

        else {

            url =

                API.BASE_URL +

                "/admin/questions";

            method = "POST";

        }

        const response = await fetch(

            url,

            {

                method: method,

                headers: {

                    ...API.getHeaders(),

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(payload)

            }

        );

        if (!response.ok) {

            throw new Error(

                "Unable to save question."

            );

        }

        showToast(

            editingQuestionId

                ? "Question Updated Successfully"

                : "Question Added Successfully",

            "success"

        );

        editingQuestionId = null;

        document.getElementById(

            "modalTitle"

        ).textContent = "➕ Add Question";

        document.getElementById(

            "saveQuestionBtn"

        ).textContent = "💾 Save Question";

        clearForm();

        closeModal();

        await loadQuestions();

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message,

            "error"

        );

    }

}
/* ==========================================
   FILTER
========================================== */

function filterQuestions(){

    const search =

        document
        .getElementById("searchQuestion")
        .value
        .toLowerCase();

    const category =

        document
        .getElementById("categoryFilter")
        .value;

    const difficulty =

        document
        .getElementById("difficultyFilter")
        .value;

    const rows =

        document.querySelectorAll(

            "#questionTable tr"

        );

    rows.forEach(row=>{

        const text =

            row.innerText.toLowerCase();

        const matchSearch =

            text.includes(search);

        const matchCategory =

            category==="All" ||

            text.includes(

                category.toLowerCase()

            );

        const matchDifficulty =

            difficulty==="All" ||

            text.includes(

                difficulty.toLowerCase()

            );

        row.style.display =

            matchSearch &&

            matchCategory &&

            matchDifficulty

            ? ""

            : "none";

    });

}

/* ==========================================
   VIEW QUESTION
========================================== */

function viewQuestion(id) {

    window.location.href =
        "question-details.html?id=" + id;

}

/* ==========================================
   EDIT QUESTION
========================================== */

async function editQuestion(id) {

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/questions/" + id,

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

        editingQuestionId = id;

        document.getElementById(

            "modalTitle"

        ).textContent = "✏️ Edit Question";

        document.getElementById(

            "saveQuestionBtn"

        ).textContent = "💾 Update Question";

        document.getElementById(

            "questionText"

        ).value = question.question;

        document.getElementById(

            "optionA"

        ).value = question.optionA;

        document.getElementById(

            "optionB"

        ).value = question.optionB;

        document.getElementById(

            "optionC"

        ).value = question.optionC;

        document.getElementById(

            "optionD"

        ).value = question.optionD;

        document.getElementById(

            "correctAnswer"

        ).value = question.correctAnswer;
        document.getElementById(
            "explanation"
        ).value = question.explanation;

        document.getElementById(

            "questionDifficulty"

        ).value = question.difficulty;

        document.getElementById(

            "questionModal"

        ).style.display = "flex";

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load question.",

            "error"

        );

    }

}

/* ==========================================
   DELETE QUESTION
========================================== */

async function deleteQuestion(questionId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this question?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/questions/" + questionId,

            {
                method: "DELETE",
                headers: API.getHeaders()
            }

        );

        if (!response.ok) {

            throw new Error("Unable to delete question.");

        }

        showToast(
            "Question Deleted Successfully",
            "success"
        );

        await loadQuestions();

    }

    catch (error) {

        console.error(error);

        showToast(
            "Unable to delete question.",
            "error"
        );

    }

}

/* ==========================================
   MODAL
========================================== */

function openModal() {

    editingQuestionId = null;

    clearForm();

    document.getElementById(
        "modalTitle"
    ).textContent = "➕ Add Question";

    document.getElementById(
        "saveQuestionBtn"
    ).textContent = "💾 Save Question";

    document.getElementById(
        "questionModal"
    ).style.display = "flex";

}

function closeModal(){

    document.getElementById(

        "questionModal"

    ).style.display="none";

}

/* ==========================================
   CLEAR FORM
========================================== */

function clearForm(){

    document.getElementById("questionText").value="";

    document.getElementById("optionA").value="";

    document.getElementById("optionB").value="";

    document.getElementById("optionC").value="";

    document.getElementById("optionD").value="";

    document.getElementById("correctAnswer").selectedIndex=0;
    document.getElementById(
       "explanation"
     ).value = "";

    document.getElementById("questionCategory").selectedIndex = 0;

document.getElementById("questionTopic").innerHTML = `

    <option value="">

        Select Topic

    </option>

`;

    document.getElementById("questionDifficulty").selectedIndex=0;

}

/* ==========================================
   ADMIN LOGIN
========================================== */

function checkAdminLogin(){

    const admin = JSON.parse(

        sessionStorage.getItem(

            "adminUser"

        )

    );

    if(!admin){

        window.location.href="login.html";

    }

}