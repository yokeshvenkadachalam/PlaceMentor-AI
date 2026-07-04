/* ==========================================
   PlaceMentor AI
   Topic Details
========================================== */

const API_BASE = "https://placementor-backend-5lv4.onrender.com/api/admin";

/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadTopic();

    }

);

/* ==========================================
   LOAD TOPIC
========================================== */

async function loadTopic() {

    const params = new URLSearchParams(

        window.location.search

    );

    const topicId = params.get("id");

    if (!topicId) {

        showToast(

            "Invalid Topic",

            "error"

        );

        return;

    }

    try {

        const response = await fetch(

            `${API_BASE}/topics/${topicId}`,

            {

                headers: {

                    "Authorization":
                        "Bearer " + localStorage.getItem("token")

                }

            }

        );

        if (!response.ok) {

            throw new Error(

                "Topic Not Found"

            );

        }

        const topic = await response.json();

        renderTopic(topic);

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
   RENDER TOPIC
========================================== */

function renderTopic(topic) {

    document.getElementById(

        "topicName"

    ).textContent = topic.name;

    document.getElementById(

        "topicCategory"

    ).textContent = topic.category;

    document.getElementById(

        "totalQuestions"

    ).textContent = topic.totalQuestions;

    const status = document.getElementById(

        "topicStatus"

    );

    if (topic.active) {

        status.textContent = "Active";

        status.className = "status-active";

    }

    else {

        status.textContent = "Inactive";

        status.className = "status-inactive";

    }

}