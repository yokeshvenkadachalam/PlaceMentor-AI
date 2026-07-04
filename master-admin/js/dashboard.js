/* ==========================================
   PlaceMentor AI
   Master Admin Dashboard
========================================== */

const DASHBOARD_API =
    API.BASE_URL + "/admin/dashboard";

const ADMINS_API =
    API.BASE_URL + "/admins";

let dashboardData = {};

let recentAdmins = [];

let studentChart = null;

/* ==========================================
   START
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        const authenticated =

            await checkMasterAdminAuth();

        if (!authenticated) {

            return;

        }

        await loadMasterDashboard();

    }

);

/* ==========================================
   LOAD DASHBOARD
========================================== */

async function loadMasterDashboard() {

    try {

        showLoading(true);

        await Promise.all([

            loadProfile(),

            loadDashboard(),

            loadRecentAdmins()

        ]);

        showLoading(false);

    }

    catch (error) {

        console.error(error);

        showLoading(false);

        showToast(

            "Unable to load dashboard.",

            "error"

        );

    }

}

/* ==========================================
   LOAD PROFILE
========================================== */

async function loadProfile() {

    try {

        const response = await fetch(

            API.BASE_URL + "/auth/profile",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                "Profile Load Failed"

            );

        }

        const profile =

            await response.json();

        localStorage.setItem(

            "currentUser",

            JSON.stringify(profile)

        );

        sessionStorage.setItem(

            "currentUser",

            JSON.stringify(profile)

        );

        document.getElementById(

            "adminName"

        ).textContent =

            profile.name;

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}

/* ==========================================
   LOAD DASHBOARD DATA
========================================== */

async function loadDashboard() {

    try {

        const response = await fetch(

            DASHBOARD_API,

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                "Dashboard API Failed"

            );

        }

        dashboardData =

    await response.json();
    console.log(dashboardData);

/* ==========================
   UPDATE DASHBOARD UI
========================== */

loadSummary();

loadStudents();

drawChart();

loadAdminTable();

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}

/* ==========================================
   LOAD ADMINS
========================================== */

async function loadRecentAdmins() {

    try {

        const response = await fetch(

            ADMINS_API,

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                "Admin API Failed"

            );

        }

        recentAdmins = await response.json();
        console.log(recentAdmins);

loadAdminTable();

loadAdminSummary();
    }

    catch (error) {

        console.error(error);

        throw error;

    }

}

/* ==========================================
   SIMPLE LOADER
========================================== */

function showLoading(show) {

    const body =

        document.body;

    if (show) {

        body.style.cursor =

            "progress";

    }

    else {

        body.style.cursor =

            "default";

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
    document.getElementById("totalAdmins").textContent =
        recentAdmins.length;

    document.getElementById("averageScore").textContent =
        (dashboardData.averageScore ?? 0).toFixed(1) + "%";

}
/* ==========================================
   RECENT STUDENTS
========================================== */

function loadStudents() {

    const tbody =
        document.getElementById("studentTable");

    if (!tbody) {

        return;

    }

    tbody.innerHTML = "";

    if (

        !dashboardData.recentStudents ||

        dashboardData.recentStudents.length === 0

    ) {

        tbody.innerHTML = `

            <tr>

                <td colspan="3">

                    No Students Found

                </td>

            </tr>

        `;

        return;

    }

    dashboardData.recentStudents.forEach(student => {

        tbody.innerHTML += `

            <tr>

                <td>${student.name}</td>

                <td>${student.studentId}</td>

                <td>${student.status}</td>

            </tr>

        `;

    });

}
/* ==========================================
   STUDENT GROWTH CHART
========================================== */

function drawChart() {

    const canvas =
        document.getElementById("studentChart");

    if (!canvas) {

        return;

    }

    if (studentChart) {

        studentChart.destroy();

    }

    const labels = [];

    const values = [];

    if (dashboardData.studentGrowth) {

        dashboardData.studentGrowth.forEach(item => {

            labels.push(item.month);

            values.push(item.students);

        });

    }

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
   RECENT ADMINS TABLE
========================================== */

function loadAdminTable() {

    const table =
        document.getElementById("adminTable");

    if (!table) {

        return;

    }

    table.innerHTML = "";

    if (

        !recentAdmins ||

        recentAdmins.length === 0

    ) {

        table.innerHTML = `

            <tr>

                <td colspan="5">

                    No Admins Found

                </td>

            </tr>

        `;

        return;

    }

    recentAdmins.forEach(admin => {

        table.innerHTML += `

            <tr>

                <td>${admin.userId}</td>
<td>${admin.fullName}</td>
<td>${admin.email}</td>
<td>${admin.active ? "Active" : "Inactive"}</td>
<td>${admin.masterAdmin ? "Master Admin" : "Admin"}</td>

            </tr>

        `;

    });

}
/* ==========================================
   ADMIN SUMMARY
========================================== */

function loadAdminSummary() {

    const active =
        recentAdmins.filter(a => a.active).length;

    const inactive =
        recentAdmins.filter(a => !a.active).length;

    const master =
        recentAdmins.filter(a => a.masterAdmin).length;

    const activeCard =
        document.getElementById("activeAdmins");

    if (activeCard) {

        activeCard.textContent = active;

    }

    const inactiveCard =
        document.getElementById("inactiveAdmins");

    if (inactiveCard) {

        inactiveCard.textContent = inactive;

    }

    const masterCard =
        document.getElementById("masterAdmins");

    if (masterCard) {

        masterCard.textContent = master;

    }

}