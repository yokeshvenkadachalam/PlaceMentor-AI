/* ==========================================
   PlaceMentor AI
   Admin API Configuration
========================================== */

const API = {

    BASE_URL: "http://localhost:8080/api",

    /* ================= TOKEN ================= */

    getToken() {

        return localStorage.getItem("token");

    },

    /* ================= HEADERS ================= */

    getHeaders() {

        return {

            "Content-Type": "application/json",

            "Authorization": "Bearer " + this.getToken()

        };

    },

    /* ================= LOGIN CHECK ================= */

    isLoggedIn() {

        return this.getToken() !== null;

    },

    /* ================= LOGOUT ================= */

    logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");

    window.location.href = "../login.html";

    }

};