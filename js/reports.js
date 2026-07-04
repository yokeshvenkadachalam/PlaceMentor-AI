/* ==========================================
   PlaceMentor AI
   Reports Module (Backend Version)
========================================== */

const API_URL = "https://placementor-backend-5lv4.onrender.com/api/quiz/reports";

let report = {};
let quizHistory = [];

let lineChart = null;
let pieChart = null;

/* ==========================================
   START
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

    loadReports();

});

/* ==========================================
   LOAD REPORT
========================================== */

async function loadReports() {

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

            throw new Error("Unable to load reports.");

        }

        report = await response.json();

        quizHistory = report.history || [];

        console.log("Report Data");

        console.log(report);

        // Next Parts
        loadSummary();
        loadHistory();
        drawLineChart();
        drawPieChart();
        loadTopics();
        loadInsights();
        loadTopicPerformance();
        loadAIInsights();

    }

    catch (error) {

        console.error(error);

        alert("Failed to load report.");

    }

}
/* ==========================================
   SUMMARY CARDS
========================================== */

function loadSummary() {

    document.getElementById("totalTests").textContent =
        report.totalTests ?? 0;

    document.getElementById("highestScore").textContent =
        (report.highestScore ?? 0).toFixed(1) + "%";

    document.getElementById("averageScore").textContent =
        (report.averageScore ?? 0).toFixed(1) + "%";

    document.getElementById("accuracy").textContent =
        (report.accuracy ?? 0).toFixed(1) + "%";

}
/* ==========================================
   QUIZ HISTORY TABLE
========================================== */

function loadHistory() {

    const table = document.getElementById("historyTable");

    table.innerHTML = "";

    if (!quizHistory || quizHistory.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="4">

                    No Quiz History Found

                </td>

            </tr>

        `;

        return;

    }

    quizHistory.forEach(item => {

        const date = new Date(item.completedAt);

        table.innerHTML += `

            <tr>

                <td>${date.toLocaleDateString()}</td>

                <td>

                    ${item.category}

                    <br>

                    <small>${item.topic}</small>

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
   PERFORMANCE TREND
========================================== */

function drawLineChart() {

    const canvas = document.getElementById("lineChart");

    if (!canvas) return;

    if (lineChart) {

        lineChart.destroy();

    }

    const labels = [];
    const scores = [];

    quizHistory
        .slice()
        .reverse()
        .forEach((quiz, index) => {

            labels.push("Quiz " + (index + 1));

            scores.push(quiz.percentage);

        });

    lineChart = new Chart(canvas, {

        type: "line",

        data: {

            labels: labels,

            datasets: [{

                label: "Percentage",

                data: scores,

                borderColor: "#2563EB",

                backgroundColor: "rgba(37,99,235,.15)",

                fill: true,

                tension: .35,

                pointRadius: 5

            }]

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
   PASSED / FAILED PIE CHART
========================================== */

function drawPieChart() {

    const canvas = document.getElementById("pieChart");

    if (!canvas) return;

    if (pieChart) {

        pieChart.destroy();

    }

    pieChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [

                "Passed",

                "Failed"

            ],

            datasets: [{

                data: [

                    report.passed,

                    report.failed

                ],

                backgroundColor: [

                    "#22C55E",

                    "#EF4444"

                ]

            }]

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

    });

}
/* ==========================================
   STRONG & WEAK TOPICS
========================================== */

function loadTopics() {

    const strongList = document.getElementById("strongTopics");

    const weakList = document.getElementById("weakTopics");

    strongList.innerHTML = "";

    weakList.innerHTML = "";

    // Strong Topics

    if (report.strongTopics.length === 0) {

        strongList.innerHTML =
            "<li>No strong topics yet.</li>";

    } else {

        report.strongTopics.forEach(topic => {

            strongList.innerHTML += `
                <li>
                    <strong>${topic.topic}</strong><br>
                    ${topic.category}<br>
                    Average :
                    ${topic.averageScore.toFixed(1)}%
                </li>
            `;

        });

    }

    // Weak Topics

    if (report.weakTopics.length === 0) {

        weakList.innerHTML =
            "<li>No weak topics 🎉</li>";

    } else {

        report.weakTopics.forEach(topic => {

            weakList.innerHTML += `
                <li>
                    <strong>${topic.topic}</strong><br>
                    ${topic.category}<br>
                    Average :
                    ${topic.averageScore.toFixed(1)}%
                </li>
            `;

        });

    }

}
/* ==========================================
   TOPIC PERFORMANCE TABLE
========================================== */

function loadTopicPerformance() {

    const tbody =
        document.getElementById("topicPerformance");

    tbody.innerHTML = "";

    const topics = [

        ...(report.strongTopics || []),

        ...(report.weakTopics || [])

    ];

    if (topics.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="3">
                    No Topic Performance Available
                </td>
            </tr>
        `;

        return;

    }

    topics.forEach(topic => {

        tbody.innerHTML += `

            <tr>

                <td>

                    ${topic.category}
                    <br>
                    <small>${topic.topic}</small>

                </td>

                <td>

                    ${topic.averageScore.toFixed(1)}%

                </td>

                <td>

                    <div class="progress-container">

                        <div
                            class="progress-bar"
                            style="width:${topic.averageScore}%">

                            ${topic.averageScore.toFixed(0)}%

                        </div>

                    </div>

                </td>

            </tr>

        `;

    });

}
/* ==========================================
   INSIGHTS
========================================== */

function loadInsights() {

    if (!quizHistory.length) return;

    // Performance Trend

    const first = quizHistory[quizHistory.length - 1].percentage;
    const last = quizHistory[0].percentage;

    let trend = "Stable";

    if (last > first)
        trend = "Improving 📈";

    else if (last < first)
        trend = "Declining 📉";

    document.getElementById("performanceTrend").textContent = trend;

    // Recommendation

    let recommendation = "";

    if (report.averageScore >= 80)
        recommendation = "Excellent performance. Keep practicing.";

    else if (report.averageScore >= 60)
        recommendation = "Good progress. Focus on weak topics.";

    else
        recommendation = "Practice daily and revise weak topics.";

    document.getElementById("recommendation").textContent =
        recommendation;

    // Best Quiz

    const best = quizHistory.reduce((a, b) =>
        a.percentage > b.percentage ? a : b
    );

    document.getElementById("bestQuiz").textContent =
        `${best.topic} (${best.percentage.toFixed(1)}%)`;

    // Lowest Quiz

    const worst = quizHistory.reduce((a, b) =>
        a.percentage < b.percentage ? a : b
    );

    document.getElementById("lowestQuiz").textContent =
        `${worst.topic} (${worst.percentage.toFixed(1)}%)`;

    // Consistency

    const values = quizHistory.map(q => q.percentage);

    const avg =
        values.reduce((a, b) => a + b, 0) / values.length;

    const variance =
        values.reduce((a, b) =>
            a + Math.pow(b - avg, 2), 0) / values.length;

    const deviation = Math.sqrt(variance);

    let consistency = "Excellent";

    if (deviation > 30)
        consistency = "Poor";

    else if (deviation > 15)
        consistency = "Average";

    document.getElementById("consistency").textContent =
        consistency;
}
/* ==========================================
   AI INSIGHTS
========================================== */

function loadAIInsights() {

    const container =
        document.getElementById("aiInsights");

    container.innerHTML = "";

    const insights = [];

    // Overall Performance

    if (report.averageScore >= 80) {

        insights.push({
            title:"Excellent Performance",
            text:"You consistently score above 80%. Continue solving harder questions."
        });

    }

    else if (report.averageScore >= 60) {

        insights.push({
            title:"Good Progress",
            text:"Your performance is improving. Focus on difficult topics to increase your average."
        });

    }

    else {

        insights.push({
            title:"Needs Improvement",
            text:"Your average score is below 60%. Spend more time practicing fundamentals."
        });

    }

    // Accuracy

    if (report.accuracy < 50) {

        insights.push({
            title:"Accuracy Warning",
            text:"You answer many questions incorrectly. Slow down and prioritize correctness."
        });

    }

    // Strong Topics

    if (report.strongTopics.length > 0) {

        const topic = report.strongTopics[0];

        insights.push({

            title:"Strongest Topic",

            text:`${topic.topic} (${topic.category}) is your strongest area with an average score of ${topic.averageScore.toFixed(1)}%.`

        });

    }

    // Weak Topics

    if (report.weakTopics.length > 0) {

        const topic = report.weakTopics[0];

        insights.push({

            title:"Focus Area",

            text:`Practice ${topic.topic} (${topic.category}) more frequently. Current average is ${topic.averageScore.toFixed(1)}%.`

        });

    }

    // Pass Rate

    const passRate =
        report.totalTests === 0
        ? 0
        : (report.passed * 100) / report.totalTests;

    insights.push({

        title:"Pass Rate",

        text:`You passed ${report.passed} out of ${report.totalTests} quizzes (${passRate.toFixed(1)}%).`

    });

    insights.forEach(item => {

        container.innerHTML += `

            <div class="ai-card">

                <h3>${item.title}</h3>

                <p>${item.text}</p>

            </div>

        `;

    });

}
/* ==========================================
   PRINT REPORT
========================================== */

document
.getElementById("printBtn")
.addEventListener("click", () => {

    window.print();

});
/* ==========================================
   DOWNLOAD PDF
========================================== */

document
.getElementById("pdfBtn")
.addEventListener("click", downloadPDF);

async function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p","mm","a4");

    const page =
        document.querySelector(".container");

    const canvas =
        await html2canvas(page,{

            scale:2

        });

    const image =
        canvas.toDataURL("image/png");

    const width =
        pdf.internal.pageSize.getWidth();

    const height =
        canvas.height * width / canvas.width;

    pdf.addImage(

        image,

        "PNG",

        0,

        0,

        width,

        height

    );

    pdf.save("PlaceMentor_Report.pdf");

}
/* ==========================================
   EXPORT CSV
========================================== */

document
.getElementById("csvBtn")
.addEventListener("click", exportCSV);

function exportCSV(){

    let csv =

"Date,Category,Topic,Difficulty,Score,Percentage,Time Taken\n";

    quizHistory.forEach(item=>{

        csv +=

`${item.completedAt},
${item.category},
${item.topic},
${item.difficulty},
${item.score}/${item.totalMarks},
${item.percentage.toFixed(1)}%,
${item.timeTaken}\n`;

    });

    const blob =

        new Blob(

            [csv],

            {

                type:"text/csv"

            }

        );

    const url =
        window.URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "Quiz_Report.csv";

    a.click();

    window.URL.revokeObjectURL(url);

}