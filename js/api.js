/* ==========================================
   PlaceMentor AI
   Backend API Configuration
========================================== */

const API = {

    /* ==========================
       BASE URL
    ========================== */

    BASE_URL: "https://placementor-backend-5lv4.onrender.com/api",

    /* ==========================
       AUTH APIs
    ========================== */

    AUTH: {

        LOGIN: "/auth/login",

        REGISTER: "/auth/register",

        PROFILE: "/auth/profile"

    },

    /* ==========================
       STUDENT APIs
    ========================== */

    STUDENT: {

        PROFILE: "/student/profile",

        ALL: "/student/all"

    },

    /* ==========================
       ADMIN APIs
    ========================== */

    ADMIN: {

        DASHBOARD: "/admin/dashboard",

        STUDENTS: "/student/all"

    },

    /* ==========================
       QUIZ APIs
    ========================== */

    QUIZ: {

        START: "/quiz/start",

        SUBMIT: "/quiz/submit",

        RESULT: "/quiz/result"

    }

};

/* ==========================================
   JWT TOKEN
========================================== */

function saveToken(token) {

    localStorage.setItem(

        "token",

        token

    );

}

function getToken() {

    return localStorage.getItem(

        "token"

    );

}

function removeToken() {

    localStorage.removeItem(

        "token"

    );

}

/* ==========================================
   REQUEST HEADERS
========================================== */

function getHeaders() {

    return {

        "Content-Type": "application/json",

        "Authorization":

            "Bearer " + getToken()

    };

}

/* ==========================================
   AUTH CHECK
========================================== */

function isLoggedIn() {

    return getToken() !== null;

}

/* ==========================================
   EXPOSE API METHODS
========================================== */

API.saveToken = saveToken;

API.getToken = getToken;

API.removeToken = removeToken;

API.getHeaders = getHeaders;

API.isLoggedIn = isLoggedIn;