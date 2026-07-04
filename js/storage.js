/* ==========================================
   PlaceMentor AI
   Storage Utility
========================================== */

/* Save Current User */

function saveCurrentUser(user){

    sessionStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

}

/* Get Current User */

function getCurrentUser(){

    let user = JSON.parse(
        sessionStorage.getItem("currentUser")
    );

    if(!user){

        user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        if(user){

            sessionStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

        }

    }

    return user;

}

/* Logout */

function logoutUser(){

    sessionStorage.removeItem("currentUser");

}

/* Clear User */

function clearCurrentUser(){

    sessionStorage.removeItem("currentUser");

    localStorage.removeItem("currentUser");

}
/* ==========================================
   STUDENTS
========================================== */

function getStudents(){

    return JSON.parse(
        localStorage.getItem("students")
    ) || [];

}

function saveStudents(students){

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}

/* ==========================================
   QUIZ HISTORY
========================================== */

function getQuizHistory(){

    return JSON.parse(
        localStorage.getItem("quizHistory")
    ) || [];

}

function saveQuizHistory(history){

    localStorage.setItem(
        "quizHistory",
        JSON.stringify(history)
    );

}

/* ==========================================
   REMEMBER USER
========================================== */

function getRememberUser(){

    return JSON.parse(
        localStorage.getItem("rememberUser")
    );

}

function saveRememberUser(user){

    localStorage.setItem(
        "rememberUser",
        JSON.stringify(user)
    );

}

function clearRememberUser(){

    localStorage.removeItem(
        "rememberUser"
    );

}
/* ==========================================
   UPDATE CURRENT STUDENT
========================================== */

function updateCurrentStudent(updatedUser){

    let students = getStudents();

    students = students.map(student =>

        student.studentId === updatedUser.studentId

            ? updatedUser

            : student

    );

    saveStudents(students);

    saveCurrentUser(updatedUser);

}
/* ==========================================
   THEME
========================================== */

function getTheme() {

    const currentUser = getCurrentUser();

    if (
        currentUser &&
        currentUser.settings &&
        currentUser.settings.theme
    ) {

        return currentUser.settings.theme;

    }

    return "light";

}

function setTheme(theme) {

    const currentUser = getCurrentUser();

    if (!currentUser) return;

    if (!currentUser.settings) {

        currentUser.settings = {};

    }

    currentUser.settings.theme = theme;

    updateCurrentStudent(currentUser);

}

function applyTheme() {

    const theme = getTheme();

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

    } else {

        document.body.classList.remove("dark-mode");

    }

}
/* ==========================================
   NOTIFICATIONS
========================================== */

function getNotifications(){

    return JSON.parse(

        localStorage.getItem("notifications")

    ) || [];

}

function saveNotifications(notifications){

    localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

    );

}
/* ==========================================
   TOKEN
========================================== */

function removeToken() {

    localStorage.removeItem("token");

    sessionStorage.removeItem("token");

}
/* ==========================================
   LOGOUT
========================================== */

function logout(){

    clearCurrentUser();

    clearRememberUser();

    showToast(

        "Logged out successfully.",

        "success"

    );

    setTimeout(() => {

        window.location.href = "login.html";

    }, 1000);

}