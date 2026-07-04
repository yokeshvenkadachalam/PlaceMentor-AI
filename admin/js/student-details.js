/* ==========================================
   PlaceMentor AI
   Student Details
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await checkAdminAuth();

    loadStudentDetails();

});

/* ==========================================
   LOAD STUDENT DETAILS
========================================== */

async function loadStudentDetails() {

    const params = new URLSearchParams(

        window.location.search

    );

    const studentId = params.get("id");

    if (!studentId) {

        showToast(

            "Student ID not found.",

            "error"

        );

        return;

    }

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/students/" + studentId,

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load student.");

        }

        const student = await response.json();

        /* ==========================================
           PROFILE
        ========================================== */

        document.getElementById("studentName").textContent =
            student.name;

        document.getElementById("studentId").textContent =
            student.studentId;

        document.getElementById("studentEmail").textContent =
            student.email;

        document.getElementById("studentMobile").textContent =
            student.mobile;

        document.getElementById("studentCollege").textContent =
            student.college;

        document.getElementById("studentDepartment").textContent =
            student.department;

        document.getElementById("studentYear").textContent =
            student.yearOfStudy;

        document.getElementById("studentStatus").textContent =
            student.status;

        /* ==========================================
           PROFILE IMAGE
        ========================================== */

        const image = document.getElementById("profileImage");

        if (student.profileImage) {

            image.src =
                "https://placementor-backend-5lv4.onrender.com/uploads/" +
                student.profileImage;

        } else {

            image.src =
                "../images/default-profile.png";

        }

        image.onerror = function () {

            this.src =
                "../images/default-profile.png";

        };

        /* ==========================================
           STATISTICS
        ========================================== */

        document.getElementById("totalAttempts").textContent =
            student.totalAttempts;

        document.getElementById("averageScore").textContent =
            student.averageScore.toFixed(2) + "%";

        document.getElementById("highestScore").textContent =
            student.highestScore.toFixed(2) + "%";

        document.getElementById("accuracy").textContent =
            student.accuracy.toFixed(2) + "%";

        document.getElementById("xp").textContent =
            student.xp;

        document.getElementById("badge").textContent =
            student.badge;

        /* ==========================================
           QUIZ HISTORY
        ========================================== */

        const table =

            document.getElementById(

                "quizHistoryTable"

            );

        table.innerHTML = "";

        if (

            !student.recentQuizzes ||

            student.recentQuizzes.length === 0

        ) {

            table.innerHTML = `

                <tr>

                    <td colspan="5">

                        No Quiz History Found

                    </td>

                </tr>

            `;

            return;

        }

        student.recentQuizzes.forEach(quiz => {

            table.innerHTML += `

                <tr>

                    <td>${quiz.topic}</td>

                    <td>${quiz.category}</td>

                    <td>${quiz.difficulty}</td>

                    <td>${quiz.score.toFixed(2)}%</td>

                    <td>${formatDate(quiz.completedAt)}</td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load student details.",

            "error"

        );

    }

}

/* ==========================================
   FORMAT DATE
========================================== */

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {

        year: "numeric",

        month: "short",

        day: "numeric",

        hour: "2-digit",

        minute: "2-digit"

    });

}