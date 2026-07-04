/* ==========================================
   PlaceMentor AI
   Quiz History
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await loadCategories();

    initializeFilters();

    await loadQuizHistory();

});

/* ==========================================
   LOAD HISTORY
========================================== */

async function loadQuizHistory() {

    try {

        const token =
            localStorage.getItem("token");

        const response = await fetch(

            "http://localhost:8080/api/quiz/history",

            {
                headers: {

                    Authorization:
                        "Bearer " + token

                }

            }

        );

        if (!response.ok) {

            throw new Error(
                "Unable to load history."
            );

        }

        const history =
            await response.json();

        if (history.length === 0) {

            document.getElementById(
                "emptyState"
            ).style.display = "block";

            document.querySelector(
                ".table-section"
            ).style.display = "none";

            return;

        }

        loadSummary(history);

        loadTable(history);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load quiz history.");

    }

}
/* ==========================================
   INITIALIZE FILTERS
========================================== */

function initializeFilters() {

    document
        .getElementById("categoryFilter")
        .addEventListener(
            "change",
            categoryChanged
        );

    document
        .getElementById("filterBtn")
        .addEventListener(
            "click",
            applyFilters
        );

    document
        .getElementById("resetBtn")
        .addEventListener(
            "click",
            resetFilters
        );

}
/* ==========================================
   LOAD CATEGORIES
========================================== */

async function loadCategories() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(

            "http://localhost:8080/api/quiz/categories",

            {

                headers: {

                    Authorization:
                        "Bearer " + token

                }

            }

        );

        if (!response.ok) {

            throw new Error();

        }

        const categories =
            await response.json();

        const select =
            document.getElementById(
                "categoryFilter"
            );

        select.innerHTML =

            `
            <option value="">
                All Categories
            </option>
            `;

        categories.forEach(category => {

            select.innerHTML +=

                `
                <option value="${category.name}">
                    ${category.name}
                </option>
                `;

        });

    }

    catch(error){

        console.error(error);

    }

}
/* ==========================================
   CATEGORY CHANGED
========================================== */

async function categoryChanged() {

    const categoryName =
        document.getElementById(
            "categoryFilter"
        ).value;

    const topicSelect =
        document.getElementById(
            "topicFilter"
        );

    topicSelect.innerHTML =

        `
        <option value="">
            All Topics
        </option>
        `;

    if(categoryName===""){

        return;

    }

    const token =
        localStorage.getItem("token");

    const categories =
        await fetch(

            "http://localhost:8080/api/quiz/categories",

            {

                headers:{

                    Authorization:
                        "Bearer "+token

                }

            }

        );

    const categoryList =
        await categories.json();

    const category =
        categoryList.find(

            c=>c.name===categoryName

        );

    if(!category){

        return;

    }

    const response =
        await fetch(

            "http://localhost:8080/api/quiz/topics/"
            + category.id,

            {

                headers:{

                    Authorization:
                        "Bearer "+token

                }

            }

        );

    const topics =
        await response.json();

    topics.forEach(topic=>{

        topicSelect.innerHTML +=

        `
        <option value="${topic.name}">
            ${topic.name}
        </option>
        `;

    });

}
/* ==========================================
   APPLY FILTERS
========================================== */

async function applyFilters() {

    try {

        const token = localStorage.getItem("token");

        const category =
            document.getElementById(
                "categoryFilter"
            ).value;

        const topic =
            document.getElementById(
                "topicFilter"
            ).value;

        const difficulty =
            document.getElementById(
                "difficultyFilter"
            ).value;

        const fromDate =
            document.getElementById(
                "fromDate"
            ).value;

        const toDate =
            document.getElementById(
                "toDate"
            ).value;

        const params = new URLSearchParams();

        if (category)
            params.append(
                "category",
                category
            );

        if (topic)
            params.append(
                "topic",
                topic
            );

        if (difficulty)
            params.append(
                "difficulty",
                difficulty
            );

        if (fromDate)
            params.append(
                "fromDate",
                fromDate
            );

        if (toDate)
            params.append(
                "toDate",
                toDate
            );

        const response = await fetch(

            "http://localhost:8080/api/quiz/history/filter?" +
            params.toString(),

            {

                headers: {

                    Authorization:
                        "Bearer " + token

                }

            }

        );

        if (!response.ok) {

            throw new Error(
                "Unable to filter history."
            );

        }

        const history =
            await response.json();

        if (history.length === 0) {

            document.querySelector(
                ".table-section"
            ).style.display = "none";

            document.getElementById(
                "emptyState"
            ).style.display = "block";

            return;

        }

        document.querySelector(
            ".table-section"
        ).style.display = "block";

        document.getElementById(
            "emptyState"
        ).style.display = "none";

        loadSummary(history);

        loadTable(history);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}
/* ==========================================
   RESET FILTERS
========================================== */

async function resetFilters() {

    document.getElementById(
        "categoryFilter"
    ).selectedIndex = 0;

    document.getElementById(
        "topicFilter"
    ).innerHTML =

    `
        <option value="">
            All Topics
        </option>
    `;

    document.getElementById(
        "difficultyFilter"
    ).selectedIndex = 0;

    document.getElementById(
        "fromDate"
    ).value = "";

    document.getElementById(
        "toDate"
    ).value = "";

    await loadQuizHistory();

}
/* ==========================================
   SUMMARY
========================================== */

function loadSummary(history) {

    document.getElementById(
        "totalAttempts"
    ).textContent = history.length;

    const passed =
        history.filter(h => h.passed).length;

    document.getElementById(
        "passedCount"
    ).textContent = passed;

    const highest =
        Math.max(
            ...history.map(
                h => h.percentage
            )
        );

    document.getElementById(
        "highestPercentage"
    ).textContent =
        highest.toFixed(2) + "%";

    const average =

        history.reduce(

            (sum, h) =>

                sum + h.percentage,

            0

        ) / history.length;

    document.getElementById(
        "averagePercentage"
    ).textContent =
        average.toFixed(2) + "%";

}

/* ==========================================
   HISTORY TABLE
========================================== */

function loadTable(history) {

    const tbody =
        document.getElementById(
            "historyTable"
        );

    tbody.innerHTML = "";

    history.forEach(

        (attempt, index) => {

            const tr =
                document.createElement("tr");

            let percentageClass =
                "low-score";

            if (attempt.percentage >= 75) {

                percentageClass =
                    "high-score";

            }

            else if (attempt.percentage >= 50) {

                percentageClass =
                    "medium-score";

            }

            const date =

                new Date(
                    attempt.completedAt
                ).toLocaleString();

            tr.innerHTML = `

                <td>${index + 1}</td>

                <td>${attempt.category}</td>

                <td>${attempt.topic}</td>

                <td>${attempt.difficulty}</td>

                <td>

                    ${attempt.score}

                    /

                    ${attempt.totalMarks}

                </td>

                <td>

                    <span class="${percentageClass}">

                        ${attempt.percentage.toFixed(2)}%

                    </span>

                </td>

                <td>

                    ${attempt.timeTaken}s

                </td>

                <td>

                    <span class="status ${attempt.passed ? "pass" : "fail"}">

                        ${attempt.passed ? "Passed" : "Failed"}

                    </span>

                </td>

                <td>${date}</td>

            `;

            tbody.appendChild(tr);

        }

    );

}