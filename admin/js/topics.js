/* ==========================================
   PlaceMentor AI
   Topic Management
========================================== */

let editingTopicId = null;

let allTopics = [];

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await checkAdminAuth();

    initializeEvents();

    await loadTopics();

});

/* ==========================================
   EVENTS
========================================== */

function initializeEvents() {

    document
        .getElementById("searchTopic")
        .addEventListener(
            "keyup",
            filterTopics
        );

    document
        .getElementById("categoryFilter")
        .addEventListener(
            "change",
            filterTopics
        );

    document
        .getElementById("statusFilter")
        .addEventListener(
            "change",
            filterTopics
        );

    document
        .getElementById("addTopicBtn")
        .addEventListener(
            "click",
            openModal
        );

    document
        .getElementById("closeTopicModal")
        .addEventListener(
            "click",
            closeModal
        );

    document
        .getElementById("saveTopicBtn")
        .addEventListener(
            "click",
            saveTopic
        );

}

/* ==========================================
   LOAD TOPICS
========================================== */

async function loadTopics() {

    try {

        const response = await fetch(

            API.BASE_URL +

            "/admin/topics",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                "Unable to load topics."

            );

        }

        const data = await response.json();

        allTopics = data.topics;

        document.getElementById(

            "totalTopics"

        ).textContent = data.totalTopics;

        document.getElementById(

            "activeTopics"

        ).textContent = data.activeTopics;

        document.getElementById(

            "inactiveTopics"

        ).textContent = data.inactiveTopics;

        populateCategoryFilter();

        renderTopics(allTopics);

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load topics.",

            "error"

        );

    }

}
/* ==========================================
   LOAD CATEGORY DROPDOWN
========================================== */

async function loadCategoryDropdown(selectedCategory = null) {

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/categories",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error();

        }

        const data = await response.json();

        const dropdown =

            document.getElementById(

                "topicCategory"

            );

        dropdown.innerHTML = "";

        data.categories.forEach(category => {

            dropdown.innerHTML += `

                <option value="${category.name}"

                    ${selectedCategory === category.name ? "selected" : ""}>

                    ${category.name}

                </option>

            `;

        });

    }

    catch (error) {

        showToast(

            "Unable to load categories.",

            "error"

        );

    }

}

/* ==========================================
   POPULATE CATEGORY FILTER
========================================== */

function populateCategoryFilter() {

    const filter =

        document.getElementById(

            "categoryFilter"

        );

    filter.innerHTML =

        `<option value="All">

            All Categories

        </option>`;

    const categories = [

        ...new Set(

            allTopics.map(

                topic => topic.category

            )

        )

    ];

    categories.forEach(category => {

        filter.innerHTML += `

            <option value="${category}">

                ${category}

            </option>

        `;

    });

}
/* ==========================================
   LOAD CATEGORY DROPDOWN
========================================== */

async function loadCategoryDropdown() {

    try {

        const response = await fetch(

            API.BASE_URL +

            "/admin/categories",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                "Unable to load categories."

            );

        }

        const data = await response.json();

        const select =

            document.getElementById(

                "topicCategory"

            );

        select.innerHTML = "";

        data.categories.forEach(category => {

            select.innerHTML += `

                <option value="${category.name}">

                    ${category.name}

                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

    }

}
/* ==========================================
   RENDER TABLE
========================================== */

function renderTopics(topics) {

    const table =

        document.getElementById(

            "topicTable"

        );

    table.innerHTML = "";

    if (topics.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="5"

                    class="empty-row">

                    No Topics Found

                </td>

            </tr>

        `;

        return;

    }

    topics.forEach(topic => {

        table.innerHTML += `

            <tr>

                <td>${topic.name}</td>

                <td>${topic.category}</td>

                <td>

                    <span class="status ${topic.active ? "active" : "inactive"}">

                        ${topic.active ? "Active" : "Inactive"}

                    </span>

                </td>

                <td>${topic.totalQuestions}</td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="view-btn"
                            onclick="viewTopic(${topic.id})">

                            <i class="fa-solid fa-eye"></i>

                        </button>

                        <button
                            class="edit-btn"
                            onclick="editTopic(${topic.id})">

                            <i class="fa-solid fa-pen"></i>

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteTopic(${topic.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}

/* ==========================================
   FILTER
========================================== */

function filterTopics() {

    const search =

        document

            .getElementById(

                "searchTopic"

            )

            .value

            .toLowerCase();

    const category =

        document

            .getElementById(

                "categoryFilter"

            )

            .value;

    const status =

        document

            .getElementById(

                "statusFilter"

            )

            .value;

    const filtered =

        allTopics.filter(topic => {

            const matchSearch =

                topic.name

                    .toLowerCase()

                    .includes(search);

            const matchCategory =

                category === "All"

                ||

                topic.category === category;

            const matchStatus =

                status === "All"

                ||

                (status === "Active"

                    ? topic.active

                    : !topic.active);

            return (

                matchSearch

                &&

                matchCategory

                &&

                matchStatus

            );

        });

    renderTopics(filtered);

}

/* ==========================================
   VIEW TOPIC
========================================== */

function viewTopic(id) {

    window.location.href =

        `topic-details.html?id=${id}`;

}

/* ==========================================
   EDIT TOPIC
========================================== */

async function editTopic(id) {

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/topics/" + id,

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load topic.");

        }

        const topic = await response.json();

        editingTopicId = id;

        document.getElementById("modalTitle").textContent =
            "✏ Edit Topic";

        document.getElementById("saveTopicBtn").textContent =
            "Update Topic";

        document.getElementById("topicName").value =
            topic.name;

        document.getElementById("topicStatus").value =
            topic.active.toString();

        await loadCategoryDropdown(topic.category);

        document.getElementById("topicModal").style.display =
            "flex";

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load topic.",

            "error"

        );

    }

}
/* ==========================================
   DELETE TOPIC
========================================== */

async function deleteTopic(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this topic?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(

            API.BASE_URL +

            "/admin/topics/" +

            id,

            {

                method: "DELETE",

                headers: API.getHeaders()

            }

        );

        const message = await response.text();

        if (!response.ok) {

            throw new Error(message);

        }

        showToast(
            message,
            "success"
        );

        await loadTopics();

    }

    catch (error) {

        console.error(error);

        showToast(
            error.message ||
            "Unable to delete topic.",
            "error"
        );

    }

}

/* ==========================================
   SAVE TOPIC
========================================== */

async function saveTopic() {

    const name =

        document.getElementById(

            "topicName"

        ).value.trim();

    const category =

        document.getElementById(

            "topicCategory"

        ).value;

    const active =

        document.getElementById(

            "topicStatus"

        ).value === "true";

    if (name === "") {

        showToast(

            "Topic name is required.",

            "warning"

        );

        return;

    }

    const topicData = {

        name: name,

        category: category,

        active: active

    };

    try {

        let response;

        /* ==========================
           UPDATE
        ========================== */

        if (editingTopicId) {

            response = await fetch(

                API.BASE_URL +

                "/admin/topics/" +

                editingTopicId,

                {

                    method: "PUT",

                    headers: API.getHeaders(),

                    body: JSON.stringify(

                        topicData

                    )

                }

            );

        }

        /* ==========================
           CREATE
        ========================== */

        else {

            response = await fetch(

                API.BASE_URL +

                "/admin/topics",

                {

                    method: "POST",

                    headers: API.getHeaders(),

                    body: JSON.stringify(

                        topicData

                    )

                }

            );

        }

        const message = await response.text();

        if (!response.ok) {

            throw new Error(message);

        }

        showToast(

            message,

            "success"

        );

        closeModal();

        await loadTopics();

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message ||

            "Unable to save topic.",

            "error"

        );

    }

}

/* ==========================================
   MODAL
========================================== */

async function openModal() {

    editingTopicId = null;

    clearForm();

    await loadCategoryDropdown();

    document.getElementById(
        "modalTitle"
    ).textContent = "➕ Add Topic";

    document.getElementById(
        "saveTopicBtn"
    ).textContent = "💾 Save Topic";

    document.getElementById(
        "topicModal"
    ).style.display = "flex";

}

function closeModal() {

    editingTopicId = null;

    clearForm();

    document.getElementById(

        "topicModal"

    ).style.display = "none";

}

/* ==========================================
   CLEAR FORM
========================================== */

function clearForm() {

    document.getElementById(
        "topicName"
    ).value = "";

    document.getElementById(
        "topicStatus"
    ).value = "true";

}