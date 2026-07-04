/* ==========================================
   PlaceMentor AI
   Admin Dashboard
========================================== */

const API_URL =
    "http://localhost:8080/api/admin/dashboard";

let dashboardData = {};
let studentChart = null;

/* ==========================================
   START
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await checkAdminAuth();

    loadDashboard();

});

/* ==========================================
   LOAD DASHBOARD
========================================== */

async function loadDashboard() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(API_URL, {

            method: "GET",

            headers: {

                Authorization: "Bearer " + token,

                "Content-Type": "application/json"

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load dashboard.");

        }

        dashboardData = await response.json();

        const user = getCurrentUser();

        if (user) {

            document.getElementById("adminName").textContent =
                user.name;

        }

        loadSummary();

        drawChart();

    }

    catch (error) {

        console.error(error);

        showToast(

            "Failed to load dashboard.",

            "error"

        );

    }

}

/* ==========================================
   SUMMARY
========================================== */

function loadSummary() {

    document.getElementById("totalStudents").textContent =
        dashboardData.totalStudents ?? 0;

    document.getElementById("totalQuestions").textContent =
        dashboardData.totalQuestions ?? 0;

    document.getElementById("quizAttempts").textContent =
        dashboardData.totalQuizAttempts ?? 0;

    document.getElementById("averageScore").textContent =
        (dashboardData.averageScore ?? 0).toFixed(1) + "%";


}

/* ==========================================
   STUDENT GROWTH CHART
========================================== */

function drawChart() {

    const canvas =
        document.getElementById("studentChart");

    if (!canvas) return;

    if (studentChart) {

        studentChart.destroy();

    }

    const labels = [];

    const values = [];

    dashboardData.studentGrowth.forEach(item => {

        labels.push(item.month);

        values.push(item.students);

    });

    studentChart = new Chart(canvas, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {

                    label: "Students",

                    data: values,

                    borderColor: "#2563EB",

                    backgroundColor:
                        "rgba(37,99,235,.15)",

                    fill: true,

                    tension: .35,

                    pointRadius: 5

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

/* ==========================================
   LOGOUT
========================================== */

function logoutAdmin() {

    removeToken();

    clearCurrentUser();

    clearRememberUser();

    showToast(

        "Logged Out Successfully",

        "success"

    );

    setTimeout(() => {

        window.location.href =
            "../login.html";

    }, 1000);

}