/* ==========================================
   PlaceMentor AI
   Professional Leaderboard
========================================== */

const API_URL = "http://localhost:8080/api/quiz/leaderboard";

let leaderboard = [];

/* ==========================================
   START
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

    loadLeaderboard();

});

/* ==========================================
   LOAD LEADERBOARD
========================================== */

async function loadLeaderboard() {

    try {

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please login first.");

            window.location.href = "login.html";

            return;

        }

        const response = await fetch(API_URL, {

            method: "GET",

            headers: {

                Authorization: "Bearer " + token,
                "Content-Type": "application/json"

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load leaderboard.");

        }

        leaderboard = await response.json();

        console.log(leaderboard);

        loadStatistics();

        loadPodium();

        renderTable();

    }

    catch (error) {

        console.error(error);

        alert("Failed to load leaderboard.");

    }

}

/* ==========================================
   STATISTICS
========================================== */

function loadStatistics() {

    document.getElementById("totalStudents").textContent =
        leaderboard.length;

    if (leaderboard.length === 0) return;

    document.getElementById("highestXP").textContent =
        leaderboard[0].xp;

    document.getElementById("yourRank").textContent =
        "#" + leaderboard[0].rank;

    document.getElementById("yourBadge").textContent =
        leaderboard[0].badge;

}

/* ==========================================
   PODIUM
========================================== */

function loadPodium() {

    const first = document.getElementById("firstPlace");

    const second = document.getElementById("secondPlace");

    const third = document.getElementById("thirdPlace");

    first.innerHTML = "";
    second.innerHTML = "";
    third.innerHTML = "";

    if (leaderboard[0]) {

        first.innerHTML = createPodiumCard(
            leaderboard[0],
            "🥇"
        );

    }

    if (leaderboard[1]) {

        second.innerHTML = createPodiumCard(
            leaderboard[1],
            "🥈"
        );

    }

    if (leaderboard[2]) {

        third.innerHTML = createPodiumCard(
            leaderboard[2],
            "🥉"
        );

    }

}

/* ==========================================
   PODIUM CARD
========================================== */

function createPodiumCard(student, medal) {

    let image =
        student.profileImage
            ? `http://localhost:8080/uploads/${student.profileImage}`
            : "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(student.studentName);

    return `

        <h1>${medal}</h1>

        <img src="${image}"
             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(student.studentName)}'">

        <h3>${student.studentName}</h3>

        <p>${student.studentId}</p>

        <p><strong>${student.xp} XP</strong></p>

        <p>${student.badge}</p>

        <p>${student.averageScore.toFixed(1)}%</p>

    `;

}

/* ==========================================
   TABLE
========================================== */

function renderTable() {

    const table =
        document.getElementById("leaderboardTable");

    table.innerHTML = "";

    if (leaderboard.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="5">

                    No Students Found

                </td>

            </tr>

        `;

        return;

    }

    leaderboard.forEach(student => {

        let medal = student.rank;

        if (student.rank === 1) medal = "🥇";
        else if (student.rank === 2) medal = "🥈";
        else if (student.rank === 3) medal = "🥉";

        let badgeClass = "";

        const badge = student.badge.toLowerCase();

        if (badge.includes("bronze"))
            badgeClass = "bronze";

        else if (badge.includes("silver"))
            badgeClass = "silver";

        else if (badge.includes("gold"))
            badgeClass = "gold";

        else if (badge.includes("platinum"))
            badgeClass = "platinum";

        else if (badge.includes("diamond"))
            badgeClass = "diamond";

        table.innerHTML += `

            <tr>

                <td>

                    ${medal} ${student.rank}

                </td>

                <td>

                    <strong>

                        ${student.studentName}

                    </strong>

                    <br>

                    <small>

                        ${student.studentId}

                    </small>

                </td>

                <td>

                    ${student.xp}

                </td>

                <td>

                    <span class="badge ${badgeClass}">

                        ${student.badge}

                    </span>

                </td>

                <td>

                    ${student.averageScore.toFixed(1)}%

                </td>

            </tr>

        `;

    });

}

/* ==========================================
   SEARCH
========================================== */

document
.getElementById("searchStudent")
.addEventListener("keyup", function () {

    const value =
        this.value.toLowerCase();

    document
        .querySelectorAll("#leaderboardTable tr")
        .forEach(row => {

            row.style.display =
                row.innerText
                    .toLowerCase()
                    .includes(value)
                    ? ""
                    : "none";

        });

});