/* ==========================================
   PlaceMentor AI
   Admin Student Management
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await checkAdminAuth();

    initializeEvents();

    await loadStudents();

});

/* ==========================================
   LOAD STUDENTS
========================================== */

async function loadStudents() {

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/students",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error("Unable to load students.");

        }

        const data = await response.json();

        document.getElementById("studentCount").textContent =
            data.totalStudents;

        const table =
            document.getElementById("studentTable");

        table.innerHTML = "";

        if (!data.students || data.students.length === 0) {

            table.innerHTML = `

                <tr>

                    <td colspan="7">

                        No Students Found

                    </td>

                </tr>

            `;

            return;

        }

        data.students.forEach(student => {

            table.innerHTML += `

                <tr>

                    <td>${student.name}</td>

                    <td>${student.studentId}</td>

                    <td>${student.email}</td>

                    <td>${student.college}</td>

                    <td>${student.department}</td>

                    <td>${student.yearOfStudy}</td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="view-btn"
                                onclick="viewStudent('${student.studentId}')">

                                <i class="fa-solid fa-eye"></i>

                            </button>

                            <button
                                class="edit-btn"
                                onclick="editStudent('${student.studentId}')">

                                <i class="fa-solid fa-pen"></i>

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteStudent('${student.studentId}')">

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load students.",

            "error"

        );

    }

}

/* ==========================================
   SEARCH
========================================== */

function initializeEvents() {

    /* ==========================
       SEARCH
    ========================== */

    document
        .getElementById("searchStudent")
        .addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            document
                .querySelectorAll("#studentTable tr")
                .forEach(row => {

                    row.style.display =

                        row.innerText
                            .toLowerCase()
                            .includes(value)

                            ? ""

                            : "none";

                });

        });

    /* ==========================
       CLOSE EDIT MODAL
    ========================== */

    document
        .getElementById("closeEditModalBtn")
        .addEventListener(
            "click",
            closeEditModal
        );
        /* UPDATE STUDENT */

    document
        .getElementById("updateStudentBtn")
        .addEventListener(
            "click",
            updateStudent
        );

}

/* ==========================================
   VIEW STUDENT
========================================== */

function viewStudent(studentId) {

    window.location.href =

        "student-details.html?id=" + studentId;

}




/* ==========================================
   EDIT STUDENT
========================================== */

async function editStudent(studentId) {

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/students/" + studentId,

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            showToast(

                "Unable to load student.",

                "error"

            );

            return;

        }

        const student = await response.json();

        document.getElementById(

            "editStudentId"

        ).value = student.studentId;

        document.getElementById(

            "editName"

        ).value = student.name;

        document.getElementById(

            "editEmail"

        ).value = student.email;

        document.getElementById(

            "editMobile"

        ).value = student.mobile;

        document.getElementById(

            "editCollege"

        ).value = student.college;

        document.getElementById(

            "editDepartment"

        ).value = student.department;

        document.getElementById(

            "editYear"

        ).value = student.yearOfStudy;

        document.getElementById(

            "editStudentModal"

        ).style.display = "flex";

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load student.",

            "error"

        );

    }

}
/* ==========================================
   CLOSE EDIT MODAL
========================================== */

function closeEditModal() {

    document.getElementById(

        "editStudentModal"

    ).style.display = "none";

}
/* ==========================================
   UPDATE STUDENT
========================================== */

async function updateStudent() {

    const studentId =
        document.getElementById("editStudentId").value;

    const body = {

        name:
            document.getElementById("editName").value,

        email:
            document.getElementById("editEmail").value,

        mobile:
            document.getElementById("editMobile").value,

        college:
            document.getElementById("editCollege").value,

        department:
            document.getElementById("editDepartment").value,

        yearOfStudy:
            document.getElementById("editYear").value

    };

    try {

        const response = await fetch(

            API.BASE_URL +

            "/admin/students/" +

            studentId,

            {

                method: "PUT",

                headers: API.getHeaders(),

                body: JSON.stringify(body)

            }

        );

        if (!response.ok) {

            showToast(

                "Update Failed",

                "error"

            );

            return;

        }

        showToast(

            "Student Updated Successfully",

            "success"

        );

        closeEditModal();

        await loadStudents();

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to update student.",

            "error"

        );

    }

}
/* ==========================================
   DELETE STUDENT
========================================== */

async function deleteStudent(studentId) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this student?"

    );

    if (!confirmDelete) {

        return;

    }

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/students/" + studentId,

            {

                method: "DELETE",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            const error = await response.text();

            showToast(error, "error");

            return;

        }

        showToast(

            "Student Deleted Successfully",

            "success"

        );

        await loadStudents();

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to delete student.",

            "error"

        );

    }

}