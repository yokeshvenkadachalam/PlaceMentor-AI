/* ==========================================
   PlaceMentor AI
   Admin Reports Module
========================================== */

"use strict";

/* ==========================================
   GLOBAL VARIABLES
========================================== */

let reports = [];

let filteredReports = [];

let reportType = "attempt";

let attemptChart = null;

let statusChart = null;

/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeReports();

});

/* ==========================================
   INITIALIZE PAGE
========================================== */

async function initializeReports() {

    if (!getToken()) {

        showToast(
            "Please login first.",
            "error"
        );

        window.location.href =
            "../login.html";

        return;

    }

    setDefaultDates();

    registerEvents();

    await loadReports();

}

/* ==========================================
   DEFAULT DATE
========================================== */

function setDefaultDates() {

    const today = new Date();

    const yyyy = today.getFullYear();

    const mm = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const dd = String(
        today.getDate()
    ).padStart(2, "0");

    const currentDate =
        `${yyyy}-${mm}-${dd}`;

    document
        .getElementById("fromDate")
        .value = currentDate;

    document
        .getElementById("toDate")
        .value = currentDate;

}

/* ==========================================
   REGISTER EVENTS
========================================== */

function registerEvents() {

    document
        .getElementById("generateReport")
        .addEventListener(
            "click",
            loadReports
        );

    document
        .getElementById("studentSearch")
        .addEventListener(
            "input",
            applyFilters
        );

    document
        .getElementById("statusFilter")
        .addEventListener(
            "change",
            applyFilters
        );

    document
        .getElementById("reportType")
        .addEventListener(
            "change",
            loadReports
        );

    document
        .getElementById("resetFilters")
        .addEventListener(
            "click",
            resetFilters
        );

    document
        .getElementById("downloadPdf")
        .addEventListener(
            "click",
            downloadPDF
        );

    document
        .getElementById("downloadExcel")
        .addEventListener(
            "click",
            exportExcel
        );

}

/* ==========================================
   TOKEN
========================================== */

function getToken() {

    return localStorage.getItem("token");

}

/* ==========================================
   DATE FORMAT
========================================== */

function formatDate(date) {

    if (!date) {

        return "-";

    }

    return new Date(date)
        .toLocaleString();

}

/* ==========================================
   EMPTY TABLE
========================================== */

function showEmptyTable(message = "No Report Found") {

    document
        .getElementById("reportTableBody")
        .innerHTML = `

<tr>

<td colspan="10">

${message}

</td>

</tr>

`;

}
/* ==========================================
   LOAD REPORTS
========================================== */

async function loadReports() {

    try {

        reportType =
            document
                .getElementById("reportType")
                .value;
                updateFilterVisibility();

        const fromDate =
            document
                .getElementById("fromDate")
                .value;

        const toDate =
            document
                .getElementById("toDate")
                .value;

        let endpoint = "";

        if (reportType === "attempt") {

            endpoint =
                API.BASE_URL +
                `/admin/reports?fromDate=${fromDate}&toDate=${toDate}`;

        }

        else {

            endpoint =
                API.BASE_URL +
                `/admin/reports/summary?fromDate=${fromDate}&toDate=${toDate}`;

        }

        const response =
            await fetch(endpoint, {

                headers: {

                    Authorization:
                        "Bearer " + getToken()

                }

            });

        if (!response.ok) {

            throw new Error(
                "Unable to load reports."
            );

        }

        reports =
            await response.json();

        filteredReports =
            [...reports];

        renderTable();

        updateSummaryCards();

        renderCharts();

    }

    catch (error) {

        console.error(error);

        showToast(
            error.message,
            "error"
        );

        showEmptyTable(
            "Unable to load reports."
        );

    }

}

/* ==========================================
   TABLE DISPATCHER
========================================== */

function renderTable() {

    if (reportType === "attempt") {

        renderAttemptTable();

    }

    else {

        renderSummaryTable();

    }

}
/* ==========================================
   ATTEMPT REPORT TABLE
========================================== */

function renderAttemptTable() {

    const head =
        document.getElementById(
            "reportTableHead"
        );

    head.innerHTML = `

<tr>

<th>Student ID</th>

<th>Name</th>

<th>Email</th>

<th>Category</th>

<th>Topic</th>

<th>Score</th>

<th>Questions</th>

<th>Percentage</th>

<th>Status</th>

<th>Date</th>

</tr>

`;

    const body =
        document.getElementById(
            "reportTableBody"
        );

    body.innerHTML = "";

    if (filteredReports.length === 0) {

        showEmptyTable();

        return;

    }

    filteredReports.forEach(report => {

        body.innerHTML += `

<tr>

<td>${report.studentId}</td>

<td>${report.studentName}</td>

<td>${report.email}</td>

<td>${report.category}</td>

<td>${report.topic}</td>

<td>${report.score}</td>

<td>${report.totalQuestions}</td>

<td>${Number(report.percentage).toFixed(2)}%</td>

<td>

<span class="${
report.status === "Passed"
? "status-pass"
: "status-fail"
}">

${report.status}

</span>

</td>

<td>

${formatDate(report.completedAt)}

</td>

</tr>

`;

    });

}

/* ==========================================
   STUDENT SUMMARY TABLE
========================================== */

function renderSummaryTable() {

    const head =
        document.getElementById(
            "reportTableHead"
        );

    head.innerHTML = `

<tr>

<th>Student ID</th>

<th>Name</th>

<th>Email</th>

<th>Total Attempts</th>

<th>Average %</th>

<th>Best %</th>

<th>Worst %</th>

<th>Passed</th>

<th>Failed</th>

<th>Last Attempt</th>

</tr>

`;

    const body =
        document.getElementById(
            "reportTableBody"
        );

    body.innerHTML = "";

    if (filteredReports.length === 0) {

        showEmptyTable();

        return;

    }

    filteredReports.forEach(report => {

        body.innerHTML += `

<tr>

<td>${report.studentId}</td>

<td>${report.studentName}</td>

<td>${report.email}</td>

<td>${report.totalAttempts}</td>

<td>${Number(report.averagePercentage).toFixed(2)}%</td>

<td>${Number(report.bestPercentage).toFixed(2)}%</td>

<td>${Number(report.worstPercentage).toFixed(2)}%</td>

<td>${report.passCount}</td>

<td>${report.failCount}</td>

<td>${formatDate(report.lastAttempt)}</td>

</tr>

`;

    });

}
/* ==========================================
   SUMMARY CARDS
========================================== */

function updateSummaryCards() {

    if (reportType === "attempt") {

        updateAttemptSummary();

    }

    else {

        updateStudentSummary();

    }

}

/* ==========================================
   ATTEMPT REPORT SUMMARY
========================================== */

function updateAttemptSummary() {

    if (filteredReports.length === 0) {

        setSummaryCards(
            0,
            0,
            0,
            0,
            0,
            0,
            0
        );

        return;

    }

    const students = new Set();

    let totalPercentage = 0;

    let highest = 0;

    let lowest = 100;

    filteredReports.forEach(report => {

        students.add(report.studentId);

        totalPercentage += Number(report.percentage);

        if (Number(report.percentage) > highest) {

            highest = Number(report.percentage);

        }

        if (Number(report.percentage) < lowest) {

            lowest = Number(report.percentage);

        }

    });

    const totalStudents = students.size;

    const totalAttempts = filteredReports.length;

    const average =

        totalAttempts === 0

            ? 0

            : totalPercentage / totalAttempts;

    setSummaryCards(

        totalStudents,

        totalStudents,

        0,

        totalAttempts,

        average,

        highest,

        lowest

    );

}

/* ==========================================
   STUDENT SUMMARY
========================================== */

function updateStudentSummary() {

    if (filteredReports.length === 0) {

        setSummaryCards(
            0,
            0,
            0,
            0,
            0,
            0,
            0
        );

        return;

    }

    const totalStudents =
        filteredReports.length;

    let totalAttempts = 0;

    let averagePercentage = 0;

    let highest = 0;

    let lowest = 100;

    filteredReports.forEach(report => {

        totalAttempts +=
            Number(report.totalAttempts);

        averagePercentage +=
            Number(report.averagePercentage);

        if (Number(report.bestPercentage) > highest) {

            highest =
                Number(report.bestPercentage);

        }

        if (Number(report.worstPercentage) < lowest) {

            lowest =
                Number(report.worstPercentage);

        }

    });

    const average =

        totalStudents === 0

            ? 0

            : averagePercentage / totalStudents;

    setSummaryCards(

        totalStudents,

        totalStudents,

        0,

        totalAttempts,

        average,

        highest,

        lowest

    );

}

/* ==========================================
   UPDATE SUMMARY UI
========================================== */

function setSummaryCards(

    totalStudents,

    attemptedStudents,

    notAttemptedStudents,

    totalAttempts,

    average,

    highest,

    lowest

) {

    document.getElementById(
        "totalStudents"
    ).textContent =
        totalStudents;

    document.getElementById(
        "attemptedStudents"
    ).textContent =
        attemptedStudents;

    document.getElementById(
        "notAttemptedStudents"
    ).textContent =
        notAttemptedStudents;

    document.getElementById(
        "totalAttempts"
    ).textContent =
        totalAttempts;

    document.getElementById(
        "averagePercentage"
    ).textContent =
        Number(average).toFixed(2) + "%";

    document.getElementById(
        "highestPercentage"
    ).textContent =
        Number(highest).toFixed(2) + "%";

    document.getElementById(
        "lowestPercentage"
    ).textContent =
        Number(lowest).toFixed(2) + "%";

}

/* ==========================================
   APPLY FILTERS
========================================== */

function applyFilters() {

    const search =

        document
            .getElementById("studentSearch")
            .value
            .trim()
            .toLowerCase();

    const status =

        document
            .getElementById("statusFilter")
            .value;

    filteredReports = reports.filter(report => {

        const studentMatch =

            report.studentName
                .toLowerCase()
                .includes(search)

            ||

            report.studentId
                .toLowerCase()
                .includes(search);

        if (reportType === "summary") {

            return studentMatch;

        }

        const statusMatch =

            status === ""

            ||

            report.status === status;

        return studentMatch && statusMatch;

    });

    renderTable();

    updateSummaryCards();

    renderCharts();

}

/* ==========================================
   RESET FILTERS
========================================== */

function resetFilters() {

    document
        .getElementById("studentSearch")
        .value = "";

    document
        .getElementById("statusFilter")
        .value = "";

    filteredReports = [...reports];

    renderTable();

    updateSummaryCards();

    renderCharts();

}

/* ==========================================
   UPDATE FILTER VISIBILITY
========================================== */

function updateFilterVisibility() {

    const statusFilterContainer =

        document
            .getElementById("statusFilter")
            .parentElement;

    if (reportType === "summary") {

        statusFilterContainer.style.display =
            "none";

    }

    else {

        statusFilterContainer.style.display =
            "block";

    }

}


/* ==========================================
   CHARTS
========================================== */

function renderCharts() {

    renderAttemptChart();

    renderStatusChart();

}

/* ==========================================
   ATTEMPT CHART
========================================== */

function renderAttemptChart() {

    const canvas =
        document.getElementById(
            "attemptChart"
        );

    if (!canvas) {

        return;

    }

    if (attemptChart) {

        attemptChart.destroy();

    }

    const labels = [];

    const values = [];

    /* ==========================================
       ATTEMPT REPORT
    ========================================== */

    if (reportType === "attempt") {

        const attemptMap = {};

        filteredReports.forEach(report => {

            const date =
                report.completedAt.substring(0, 10);

            attemptMap[date] =
                (attemptMap[date] || 0) + 1;

        });

        Object.keys(attemptMap).forEach(date => {

            labels.push(date);

            values.push(attemptMap[date]);

        });

    }

    /* ==========================================
       SUMMARY REPORT
    ========================================== */

    else {

        filteredReports.forEach(report => {

            labels.push(report.studentName);

            values.push(report.totalAttempts);

        });

    }

    attemptChart = new Chart(

        canvas,

        {

            type: "bar",

            data: {

                labels: labels,

                datasets: [

                    {

                        label:

                            reportType === "attempt"

                                ? "Quiz Attempts"

                                : "Total Attempts",

                        data: values,

                        borderWidth: 2

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: true

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        }

    );

}

/* ==========================================
   PASS / FAIL CHART
========================================== */

function renderStatusChart() {

    const canvas =
        document.getElementById(
            "statusChart"
        );

    if (!canvas) {

        return;

    }

    if (statusChart) {

        statusChart.destroy();

    }

    let passed = 0;

    let failed = 0;

    if (reportType === "attempt") {

        filteredReports.forEach(report => {

            if (report.status === "Passed") {

                passed++;

            }

            else {

                failed++;

            }

        });

    }

    else {

        filteredReports.forEach(report => {

            passed += Number(report.passCount);

            failed += Number(report.failCount);

        });

    }

    statusChart = new Chart(

        canvas,

        {

            type: "pie",

            data: {

                labels: [

                    "Passed",

                    "Failed"

                ],

                datasets: [

                    {

                        data: [

                            passed,

                            failed

                        ]

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }

    );

}

/* ==========================================
   EXPORT EXCEL
========================================== */

function exportExcel() {

    if (filteredReports.length === 0) {

        showToast(
            "No report available.",
            "warning"
        );

        return;

    }

    let excelData = [];

    /* ==========================================
       QUIZ ATTEMPT REPORT
    ========================================== */

    if (reportType === "attempt") {

        excelData = filteredReports.map(report => ({

            "Student ID": report.studentId,

            "Student Name": report.studentName,

            "Email": report.email,

            "Category": report.category,

            "Topic": report.topic,

            "Score":
                `${report.score}/${report.totalQuestions}`,

            "Percentage":
                Number(report.percentage).toFixed(2) + "%",

            "Status": report.status,

            "Completed At":
                formatDate(report.completedAt)

        }));

    }

    /* ==========================================
       STUDENT SUMMARY REPORT
    ========================================== */

    else {

        excelData = filteredReports.map(report => ({

            "Student ID": report.studentId,

            "Student Name": report.studentName,

            "Email": report.email,

            "Attempts": report.totalAttempts,

            "Average %":
                Number(report.averagePercentage).toFixed(2) + "%",

            "Best %":
                Number(report.bestPercentage).toFixed(2) + "%",

            "Worst %":
                Number(report.worstPercentage).toFixed(2) + "%",

            "Pass Count":
                report.passCount,

            "Fail Count":
                report.failCount,

            "Last Attempt":
                formatDate(report.lastAttempt)

        }));

    }

    const worksheet =
        XLSX.utils.json_to_sheet(excelData);

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        reportType === "attempt"

            ? "Quiz Attempts"

            : "Student Summary"

    );

    XLSX.writeFile(

        workbook,

        reportType === "attempt"

            ? "Quiz_Attempt_Report.xlsx"

            : "Student_Performance_Summary.xlsx"

    );

    showToast(

        "Excel exported successfully.",

        "success"

    );

}

/* ==========================================
   EXPORT PDF
========================================== */

function downloadPDF() {

    if (filteredReports.length === 0) {

        showToast(
            "No report available.",
            "warning"
        );

        return;

    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("landscape");

    const fromDate =
        document
            .getElementById("fromDate")
            .value;

    const toDate =
        document
            .getElementById("toDate")
            .value;

    /* ==========================================
       HEADER
    ========================================== */

    doc.setFontSize(20);

    doc.text(
        "PlaceMentor AI",
        14,
        18
    );

    doc.setFontSize(15);

    doc.text(

        reportType === "attempt"

        ? "Quiz Attempt Report"

        : "Student Performance Summary",

        14,

        30

    );

    doc.setFontSize(11);

    doc.text(

        `From : ${fromDate}`,

        14,

        40

    );

    doc.text(

        `To : ${toDate}`,

        60,

        40

    );

    doc.text(

        `Generated : ${new Date().toLocaleString()}`,

        120,

        40

    );

    /* ==========================================
       TABLE
    ========================================== */

    let head = [];

    let body = [];

    if (reportType === "attempt") {

        head = [[

            "Student ID",

            "Student",

            "Email",

            "Category",

            "Topic",

            "Score",

            "Percentage",

            "Status",

            "Completed"

        ]];

        body = filteredReports.map(report => [

            report.studentId,

            report.studentName,

            report.email,

            report.category,

            report.topic,

            `${report.score}/${report.totalQuestions}`,

            Number(report.percentage).toFixed(2) + "%",

            report.status,

            formatDate(report.completedAt)

        ]);

    }

    else {

        head = [[

            "Student ID",

            "Student",

            "Email",

            "Attempts",

            "Average",

            "Best",

            "Worst",

            "Pass",

            "Fail",

            "Last Attempt"

        ]];

        body = filteredReports.map(report => [

            report.studentId,

            report.studentName,

            report.email,

            report.totalAttempts,

            Number(report.averagePercentage).toFixed(2) + "%",

            Number(report.bestPercentage).toFixed(2) + "%",

            Number(report.worstPercentage).toFixed(2) + "%",

            report.passCount,

            report.failCount,

            formatDate(report.lastAttempt)

        ]);

    }

    doc.autoTable({

        startY: 50,

        head: head,

        body: body,

        theme: "grid",

        styles: {

            fontSize: 8,

            cellPadding: 3,

            halign: "center",

            valign: "middle"

        },

        headStyles: {

            fillColor: [37, 99, 235],

            textColor: 255,

            fontStyle: "bold"

        },

        alternateRowStyles: {

            fillColor: [245, 245, 245]

        },

        margin: {

            left: 10,

            right: 10

        }

    });

    const totalPages =
        doc.internal.getNumberOfPages();

    for (

        let i = 1;

        i <= totalPages;

        i++

    ) {

        doc.setPage(i);

        doc.setFontSize(9);

        doc.text(

            `Page ${i} of ${totalPages}`,

            265,

            200

        );

    }

    doc.save(

        reportType === "attempt"

        ? "Quiz_Attempt_Report.pdf"

        : "Student_Performance_Summary.pdf"

    );

    showToast(

        "PDF exported successfully.",

        "success"

    );

}