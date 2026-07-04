/* ==========================================
   PlaceMentor AI
   Global Constants
   constants.js
========================================== */

/* ==========================================
   APP INFORMATION
========================================== */

const APP = {

    NAME: "PlaceMentor AI",

    VERSION: "1.0.0"

};

/* ==========================================
   USER ROLES
========================================== */

const ROLES = {

    STUDENT: "STUDENT",

    ADMIN: "ADMIN"

};

/* ==========================================
   ADMIN TYPES
========================================== */

const ADMIN_TYPE = {

    MASTER: "MASTER_ADMIN",

    NORMAL: "ADMIN"

};

/* ==========================================
   USER STATUS
========================================== */

const STATUS = {

    ACTIVE: "Active",

    INACTIVE: "Inactive"

};

/* ==========================================
   DASHBOARD ROUTES
========================================== */

const DASHBOARD = {

    STUDENT: "../dashboard.html",

    ADMIN: "dashboard.html",

    MASTER_ADMIN: "../master-admin/dashboard.html"

};

/* ==========================================
   AUTH ROUTES
========================================== */

const AUTH_ROUTES = {

    LOGIN: "../login.html",

    REGISTER: "../register.html",

    FORGOT_PASSWORD: "../forgot-password.html"

};

/* ==========================================
   MASTER ADMIN ROUTES
========================================== */

const MASTER_ADMIN_ROUTES = {

    DASHBOARD: "../master-admin/dashboard.html",

    ADMIN_MANAGEMENT: "../master-admin/admin-management.html",

    CREATE_ADMIN: "../master-admin/create-admin.html",

    UPDATE_ADMIN: "../master-admin/update-admin.html",

    VIEW_ADMIN: "../master-admin/view-admin.html"

};

/* ==========================================
   ADMIN ROUTES
========================================== */

const ADMIN_ROUTES = {

    DASHBOARD: "dashboard.html",

    STUDENTS: "students.html",

    QUESTIONS: "questions.html",

    CATEGORIES: "categories.html",

    TOPICS: "topics.html",

    REPORTS: "reports.html",

    SETTINGS: "settings.html"

};

/* ==========================================
   STUDENT ROUTES
========================================== */

const STUDENT_ROUTES = {

    DASHBOARD: "../dashboard.html",

    PROFILE: "../profile.html",

    QUIZ: "../quiz.html",

    RESULT: "../result.html"

};

/* ==========================================
   LOCAL STORAGE KEYS
========================================== */

const STORAGE = {

    TOKEN: "token",

    CURRENT_USER: "currentUser",

    REMEMBER_USER: "rememberUser",

    QUIZ_SETTINGS: "quizSettings"

};

/* ==========================================
   API RESPONSE
========================================== */

const RESPONSE = {

    SUCCESS: "success",

    ERROR: "error"

};

/* ==========================================
   TOAST TYPES
========================================== */

const TOAST = {

    SUCCESS: "success",

    ERROR: "error",

    WARNING: "warning",

    INFO: "info"

};

/* ==========================================
   DEFAULT VALUES
========================================== */

const DEFAULTS = {

    PAGE_SIZE: 10,

    CHART_ANIMATION: 800,

    REQUEST_TIMEOUT: 10000

};

/* ==========================================
   REGULAR EXPRESSIONS
========================================== */

const REGEX = {

    EMAIL:

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    PASSWORD:

        /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,

    MOBILE:

        /^[6-9]\d{9}$/

};

/* ==========================================
   FREEZE CONSTANTS
========================================== */

Object.freeze(APP);

Object.freeze(ROLES);

Object.freeze(ADMIN_TYPE);

Object.freeze(STATUS);

Object.freeze(DASHBOARD);

Object.freeze(AUTH_ROUTES);

Object.freeze(MASTER_ADMIN_ROUTES);

Object.freeze(ADMIN_ROUTES);

Object.freeze(STUDENT_ROUTES);

Object.freeze(STORAGE);

Object.freeze(RESPONSE);

Object.freeze(TOAST);

Object.freeze(DEFAULTS);

Object.freeze(REGEX);

console.log("constants.js Loaded Successfully.");