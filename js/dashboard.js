/* ==========================================
   PlaceMentor AI
   Professional Dashboard
   Part 1
========================================== */

// ================= GLOBAL =================

let currentUser = null;
let quizHistory = [];

// ================= START =================

document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

    initializeDashboard();

});

// ================= INITIALIZE =================

async function initializeDashboard() {

    checkLogin();

    await loadUser();

    await loadReports();

    document
        .getElementById("clearNotifications")
        .addEventListener("click", clearNotifications);
    await loadAchievements(); 
    await loadLevel();   

}
// ================= LOGIN =================

function checkLogin() {

    currentUser = getCurrentUser();

    if (!currentUser) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

}

/* ==========================================
   LOAD USER FROM BACKEND
========================================== */

async function loadUser() {

    const token = getToken();

    if (!token) {

        window.location.href = "login.html";

        return;

    }

    try {

        const response = await fetch(

            API.BASE_URL + "/student/profile",

            {

                method: "GET",

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            logout();

            return;

        }

        const student = await response.json();

        currentUser = student;

        document.getElementById("studentName").textContent =
            student.firstName || "Student";

        document.getElementById("profileName").textContent =
            (
                (student.firstName || "") +
                " " +
                (student.lastName || "")
            ).trim();

        document.getElementById("studentId").textContent =
         student.studentId || "-";

        document.getElementById("studentCollege").textContent =
            student.college || "-";

        const profileImage =
    document.getElementById("profileImage");

if (
    student.profileImage &&
    student.profileImage.trim() !== ""
) {

    profileImage.src =
        "http://localhost:8080/uploads/profiles/" +
        student.profileImage +
        "?t=" +
        Date.now();

}
else {

    profileImage.src =
        "images/default-profile.png";

}

    }

    catch (error) {

        console.error(error);

        showToast(
            "Unable to load profile.",
            "error"
        );

    }

}
/* ==========================================
   LOAD REPORTS
========================================== */

async function loadReports() {

    try {

        const response = await fetch(

            API.BASE_URL + "/quiz/reports",

            {

                method: "GET",

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load reports.");

        }

        const report = await response.json();

        document.getElementById("tests").textContent =
            report.totalTests;

        document.getElementById("highest").textContent =
            report.highestScore.toFixed(1) + "%";

        document.getElementById("average").textContent =
            report.averageScore.toFixed(1) + "%";

        document.getElementById("accuracy").textContent =
            report.accuracy.toFixed(1) + "%";

        quizHistory = report.history;

        loadStrongTopics(report);

        loadWeakTopics(report);

        loadRecommendation(report);

        loadPerformanceMessage(report);

        await refreshDashboard();

    }

    catch(error){

        console.error(error);

    }

}
function loadStrongTopics(report){

    const ul = document.querySelectorAll(".topic-box ul")[0];

    ul.innerHTML = "";

    if(report.strongTopics.length === 0){

        ul.innerHTML = "<li>No strong topics yet.</li>";

        return;

    }

    report.strongTopics.forEach(topic=>{

        ul.innerHTML += `
            <li>
                ${topic.topic}
                (${topic.percentage.toFixed(1)}%)
            </li>
        `;

    });

}
function loadWeakTopics(report){

    const ul = document.querySelectorAll(".topic-box ul")[1];

    ul.innerHTML = "";

    if(report.weakTopics.length === 0){

        ul.innerHTML = "<li>No weak topics.</li>";

        return;

    }

    report.weakTopics.forEach(topic=>{

        ul.innerHTML += `
            <li>
                ${topic.topic}
                (${topic.percentage.toFixed(1)}%)
            </li>
        `;

    });

}
function loadRecommendation(report){

    if(report.weakTopics.length > 0){

        document.getElementById("nextQuiz").textContent =
            report.weakTopics[0].topic;

    }

    else{

        document.getElementById("nextQuiz").textContent =
            "Practice Random Quiz";

    }

}
function loadPerformanceMessage(report){

    let message = "";

    if(report.averageScore >= 80){

        message = "Excellent! Keep it up. 🔥";

    }

    else if(report.averageScore >= 60){

        message = "Good progress. 💪";

    }

    else if(report.averageScore >= 40){

        message = "Focus on your weak topics. 📚";

    }

    else{

        message = "You need more practice. 🚀";

    }

    document.getElementById("performanceMessage").textContent =
        message;

}


/* ==========================================
   DASHBOARD PART 2
   History + Performance Chart
========================================== */

let performanceChart = null;

/* ==========================================
   LOAD HISTORY TABLE
========================================== */

function loadHistoryTable() {

    const table = document.getElementById("historyTable");

    if (!table) {

        return;

    }

    table.innerHTML = "";

    if (!quizHistory || quizHistory.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="4">

                    No quiz attempted yet.

                </td>

            </tr>

        `;

        return;

    }

    quizHistory
        .slice(0, 5)
        .forEach(item => {

            table.innerHTML += `

                <tr>

                    <td>

                        ${new Date(item.completedAt).toLocaleDateString()}

                    </td>

                    <td>

                        ${item.category}

                    </td>

                    <td>

                        ${item.score}/${item.totalMarks}

                    </td>

                    <td>

                        ${item.percentage.toFixed(1)}%

                    </td>

                </tr>

            `;

        });

}
/* ==========================================
   PERFORMANCE CHART
========================================== */

function drawPerformanceChart() {

    const canvas = document.getElementById("performanceChart");

    if (!canvas) return;

    if (performanceChart) {

        performanceChart.destroy();

    }

    const labels = quizHistory.map((q, index) => "Quiz " + (index + 1));

    const scores = quizHistory.map(q => q.percentage);

    performanceChart = new Chart(canvas, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {

                    label: "Score (%)",

                    data: scores,

                    fill: false,

                    tension: 0.3

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100

                }

            }

        }

    });

}
/* ==========================================
   LOAD NOTIFICATIONS
========================================== */

async function loadNotifications() {

    try {

        const response = await fetch(

    API.BASE_URL + "/notifications?ts=" + Date.now(),

    {

        headers: getHeaders(),

        cache: "no-store"

    }

);

        if (!response.ok) {

            throw new Error(
                "Unable to load notifications."
            );

        }

        const notifications =
            await response.json();

        document.getElementById(
            "notificationTitle"
        ).textContent =
            `🔔 Notifications (${notifications.length})`;

        const list =
            document.getElementById(
                "notificationList"
            );

        list.innerHTML = "";

        if (notifications.length === 0) {

            list.innerHTML = `

                <div class="notification-item">

                    <p>

                        No notifications yet.

                    </p>

                </div>

            `;

            return;

        }

        notifications.forEach(notification => {

            const div =
                document.createElement("div");

            div.className =
                "notification-item";

            div.innerHTML = `

                <div class="notification-header">

                    <strong>

                        ${notification.title}

                    </strong>

                    <small>

                        ${new Date(notification.createdAt).toLocaleString()}

                    </small>

                </div>

                <p>

                    ${notification.message}

                </p>

                <div class="notification-footer">

                    <span class="notification-type">

                        ${notification.type}

                    </span>

                    ${notification.read
                        ? `<span class="read-badge">✓ Read</span>`
                        : `<button onclick="markNotificationRead(${notification.id})">
                                Mark as Read
                           </button>`
                    }

                </div>

            `;

            list.appendChild(div);

        });

    }

    catch (error) {

        console.error(error);

    }

}
/* ==========================================
   LOAD ALL ACHIEVEMENTS
========================================== */

async function loadAchievements() {

    try {

        const response = await fetch(

            API.BASE_URL + "/achievements/all",

            {

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(
                "Unable to load achievements."
            );

        }

        const achievements =
            await response.json();

        const grid =
            document.getElementById(
                "achievementGrid"
            );

        grid.innerHTML = "";

        achievements.forEach(achievement => {

            const progress =
                Math.round(
                    (achievement.progress /
                        achievement.target) * 100
                );

            const card =
                document.createElement("div");

            card.className =

                achievement.unlocked

                    ? "achievement-card unlocked"

                    : "achievement-card locked";

            card.innerHTML = `

                <div class="achievement-icon">

                    ${achievement.icon}

                </div>

                <h3>

                    ${achievement.name}

                </h3>

                <p>

                    ${achievement.description}

                </p>

                <div class="achievement-status">

                    ${achievement.unlocked

                        ? "✔ Unlocked"

                        : "🔒 Locked"}

                </div>

                <div class="achievement-progress-text">

                    ${achievement.progress}
                    /
                    ${achievement.target}

                </div>

                <div class="achievement-progress">

                    <div
                        class="achievement-progress-bar"

                        style="width:${progress}%">

                    </div>

                </div>

                <div class="achievement-percentage">

                    ${progress}%

                </div>

                <div class="achievement-xp">

                    +${achievement.xpReward} XP

                </div>

            `;

            grid.appendChild(card);

        });

    }

    catch (error) {

        console.error(error);

    }

}
/* ==========================================
   REFRESH DASHBOARD
========================================== */

async function refreshDashboard() {

    loadHistoryTable();

    drawPerformanceChart();

    await loadLevel();

    await loadNotifications();

    await loadAchievements();

    await loadDailyChallenges();

    await loadStreak();

    loadLearningInsights();

}
/* ==========================================
   LOAD LEVEL
========================================== */

async function loadLevel() {

    try {

        const response = await fetch(

            API.BASE_URL + "/level",

            {

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load level.");

        }

        const level = await response.json();

        document.getElementById(

            "xpValue"

        ).textContent =

            level.xp + " XP";

        document.getElementById(

            "levelValue"

        ).textContent =

            "Level " + level.level;

        document.getElementById(

            "remainingXP"

        ).textContent =

            level.remainingXP + " XP to next level";

        document.getElementById(

            "xpPercent"

        ).textContent =

            level.progress + "%";

        document.getElementById(

            "xpProgressBar"

        ).style.width =

            level.progress + "%";

    }

    catch(error){

        console.error(error);

    }

}
/* ==========================================
   LOAD DAILY CHALLENGES
========================================== */

async function loadDailyChallenges() {

    try {

        const response = await fetch(

            API.BASE_URL + "/daily-challenges",

            {

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load daily challenges.");

        }

        const challenges = await response.json();

        const grid =

            document.getElementById(

                "dailyChallengeGrid"

            );

        grid.innerHTML = "";

        challenges.forEach(challenge => {

            const progress =

                Math.min(

                    (challenge.progress / challenge.target) * 100,

                    100

                );

            const card =

                document.createElement("div");

            card.className =

                challenge.completed

                    ? "daily-card completed"

                    : "daily-card";

            card.innerHTML = `

                <h3>

                    ${challenge.title}

                </h3>

                <p>

                    ${challenge.description}

                </p>

                <div class="daily-progress">

                    <div
                        class="daily-progress-fill"
                        style="width:${progress}%">

                    </div>

                </div>

                <div class="daily-footer">

                    <span>

                        ${challenge.progress}
                        /
                        ${challenge.target}

                    </span>

                    <strong>

                        +${challenge.xpReward} XP

                    </strong>

                </div>

                ${
                    challenge.completed

                    ?

                    `<p style="color:green">

                        ✔ Completed

                    </p>`

                    :

                    `<p>

                        In Progress

                    </p>`
                }

            `;

            grid.appendChild(card);

        });

    }

    catch(error){

        console.error(error);

    }

}
/* ==========================================
   LOAD STREAK
========================================== */

async function loadStreak() {

    try {

        const response = await fetch(

            API.BASE_URL + "/streak",

            {

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load streak.");

        }

        const streak = await response.json();

        document.getElementById("dailyStreak").textContent =

            streak.currentStreak + " Days";

    }

    catch(error){

        console.error(error);

    }

}
/* ==========================================
   PART 4
   LEARNING INSIGHTS
========================================== */

function loadLearningInsights() {

    // Daily Goal
    const goal = 5;

    const completed = Math.min(quizHistory.length, goal);

    const progress = (completed / goal) * 100;

    document.getElementById("goalFill").style.width =
        progress + "%";

    document.getElementById("goalText").textContent =
        completed + " / " + goal + " Quizzes";

    // Performance
    let average = 0;

    if (quizHistory.length > 0) {

        quizHistory.forEach(q => {

            average += q.percentage;

        });

        average /= quizHistory.length;

    }

    let message = "Keep Practicing 💪";

    if (average >= 90)

        message = "Placement Ready 🚀";

    else if (average >= 75)

        message = "Excellent Progress 🎯";

    else if (average >= 60)

        message = "Good Going 👍";

    document.getElementById("performanceMessage").textContent =
        message;

    // Recommendation
    let recommendation = "Percentage";

    if (average >= 80)

        recommendation = "Programming";

    else if (average >= 60)

        recommendation = "Reasoning";

    else

        recommendation = "Aptitude Basics";

    document.getElementById("nextQuiz").textContent =
        recommendation;

}

/* ==========================================
   MARK NOTIFICATION AS READ
========================================== */

async function markNotificationRead(id) {

    try {

        const response = await fetch(

            API.BASE_URL + "/notifications/" + id + "/read",

            {

                method: "PUT",

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to mark notification.");

        }

        await loadNotifications();

    }

    catch (error) {

        console.error(error);

    }

}
/* ==========================================
   MARK ALL AS READ
========================================== */

async function markAllNotificationsRead() {

    try {

        const response = await fetch(

            API.BASE_URL + "/notifications/read-all",

            {

                method: "PUT",

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error();

        }

        await loadNotifications();

    }

    catch (error) {

        console.error(error);

    }

}
async function clearNotifications() {

    console.log("1. Button clicked");

    if (!confirm("Clear all notifications?")) {
        return;
    }

    try {

        const response = await fetch(

            API.BASE_URL + "/notifications/clear",

            {

                method: "DELETE",

                headers: getHeaders()

            }

        );

        

        if (!response.ok) {

            throw new Error("Failed to clear notifications.");

        }
        await loadNotifications();

    }

    catch (error) {

        console.error(error);

    }

}

function logout(){

    clearCurrentUser();

    clearRememberUser();

    window.location.href = "login.html";

}