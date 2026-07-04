/* ==========================================
   PlaceMentor AI
   Common Utility Functions
   Part 1
   Current User
   Login Helpers
   Role Helpers
   Dashboard Routing
========================================== */

/* ==========================================
   GET CURRENT USER
========================================== */

function getLoggedInUser() {

    const user = getCurrentUser();

    return user ? user : null;

}

/* ==========================================
   IS USER LOGGED IN
========================================== */

function isUserLoggedIn() {

    return getLoggedInUser() !== null;

}

/* ==========================================
   HAS JWT TOKEN
========================================== */

function hasValidToken() {

    return getToken() !== null;

}

/* ==========================================
   GET USER ROLE
========================================== */

function getUserRole() {

    const user = getLoggedInUser();

    return user ? user.role : null;

}

/* ==========================================
   CHECK STUDENT
========================================== */

function isStudent() {

    return getUserRole() === ROLES.STUDENT;

}

/* ==========================================
   CHECK ADMIN
========================================== */

function isAdmin() {

    return getUserRole() === ROLES.ADMIN;

}

/* ==========================================
   CHECK MASTER ADMIN
========================================== */

function isMasterAdmin() {

    const user = getLoggedInUser();

    return user &&
           user.role === ROLES.ADMIN &&
           user.masterAdmin === true;

}

/* ==========================================
   CHECK NORMAL ADMIN
========================================== */

function isNormalAdmin() {

    const user = getLoggedInUser();

    return user &&
           user.role === ROLES.ADMIN &&
           user.masterAdmin === false;

}

/* ==========================================
   GET DASHBOARD URL
========================================== */

function getDashboardUrl() {

    if (isMasterAdmin()) {

        return DASHBOARD.MASTER_ADMIN;

    }

    if (isAdmin()) {

        return DASHBOARD.ADMIN;

    }

    return DASHBOARD.STUDENT;

}

/* ==========================================
   GO TO DASHBOARD
========================================== */

function goToDashboard() {

    window.location.href =

        getDashboardUrl();

}

/* ==========================================
   SET DASHBOARD LINK
========================================== */

function setDashboardLink() {

    const dashboardLink =

        document.getElementById(

            "dashboardBtn"

        );

    if (!dashboardLink) {

        return;

    }

    dashboardLink.href =

        getDashboardUrl();

}

/* ==========================================
   CURRENT USER NAME
========================================== */

function getCurrentUserName() {

    const user = getLoggedInUser();

    return user ? user.name : "";

}

/* ==========================================
   CURRENT USER EMAIL
========================================== */

function getCurrentUserEmail() {

    const user = getLoggedInUser();

    return user ? user.email : "";

}

/* ==========================================
   CURRENT USER ID
========================================== */

function getCurrentUserId() {

    const user = getLoggedInUser();

    return user ? user.studentId : "";

}

/* ==========================================
   UPDATE USER NAME
========================================== */

function setCurrentUserName(elementId) {

    const element =

        document.getElementById(

            elementId

        );

    if (!element) {

        return;

    }

    element.textContent =

        getCurrentUserName();

}

/* ==========================================
   UPDATE USER EMAIL
========================================== */

function setCurrentUserEmail(elementId) {

    const element =

        document.getElementById(

            elementId

        );

    if (!element) {

        return;

    }

    element.textContent =

        getCurrentUserEmail();

}

/* ==========================================
   UPDATE USER ID
========================================== */

function setCurrentUserId(elementId) {

    const element =

        document.getElementById(

            elementId

        );

    if (!element) {

        return;

    }

    element.textContent =

        getCurrentUserId();

}

console.log("Common.js Part 1 Loaded");
/* ==========================================
   PlaceMentor AI
   Common Utility Functions
   Part 2
   Navigation
   Logout
   Page Helpers
   DOM Helpers
========================================== */

/* ==========================================
   LOGOUT USER
========================================== */

function logoutUser() {

    removeToken();

    clearCurrentUser();

    clearRememberUser();

    window.location.href =

        AUTH_ROUTES.LOGIN;

}

/* ==========================================
   PAGE TITLE
========================================== */

function setPageTitle(title) {

    document.title =

        title +

        " | " +

        APP.NAME;

}

/* ==========================================
   PAGE HEADER
========================================== */

function setPageHeader(id, title) {

    const element =

        document.getElementById(id);

    if (!element) {

        return;

    }

    element.textContent =

        title;

}

/* ==========================================
   GET ELEMENT
========================================== */

function $(id) {

    return document.getElementById(id);

}

/* ==========================================
   QUERY SELECTOR
========================================== */

function $$(selector) {

    return document.querySelector(selector);

}

/* ==========================================
   QUERY SELECTOR ALL
========================================== */

function $$$ (selector) {

    return document.querySelectorAll(selector);

}

/* ==========================================
   SHOW ELEMENT
========================================== */

function showElement(id) {

    const element = $(id);

    if (!element) {

        return;

    }

    element.style.display = "";

}

/* ==========================================
   HIDE ELEMENT
========================================== */

function hideElement(id) {

    const element = $(id);

    if (!element) {

        return;

    }

    element.style.display = "none";

}

/* ==========================================
   TOGGLE ELEMENT
========================================== */

function toggleElement(id) {

    const element = $(id);

    if (!element) {

        return;

    }

    if (

        element.style.display === "none"

    ) {

        element.style.display = "";

    }

    else {

        element.style.display = "none";

    }

}

/* ==========================================
   SET TEXT
========================================== */

function setText(id, value) {

    const element = $(id);

    if (!element) {

        return;

    }

    element.textContent = value;

}

/* ==========================================
   SET HTML
========================================== */

function setHTML(id, value) {

    const element = $(id);

    if (!element) {

        return;

    }

    element.innerHTML = value;

}

/* ==========================================
   SET VALUE
========================================== */

function setValue(id, value) {

    const element = $(id);

    if (!element) {

        return;

    }

    element.value = value;

}

/* ==========================================
   GET VALUE
========================================== */

function getValue(id) {

    const element = $(id);

    if (!element) {

        return "";

    }

    return element.value.trim();

}

/* ==========================================
   ENABLE BUTTON
========================================== */

function enableButton(id) {

    const button = $(id);

    if (!button) {

        return;

    }

    button.disabled = false;

}

/* ==========================================
   DISABLE BUTTON
========================================== */

function disableButton(id) {

    const button = $(id);

    if (!button) {

        return;

    }

    button.disabled = true;

}

/* ==========================================
   SET ACTIVE SIDEBAR
========================================== */

function setActiveSidebar(page) {

    document

        .querySelectorAll(

            ".sidebar li"

        )

        .forEach(item => {

            item.classList.remove(

                "active"

            );

        });

    const active =

        document.getElementById(page);

    if (active) {

        active.classList.add(

            "active"

        );

    }

}

/* ==========================================
   CONFIRM DELETE
========================================== */

function confirmDelete(message) {

    return confirm(

        message ||

        "Are you sure you want to delete this record?"

    );

}

console.log("Common.js Part 2 Loaded");

/* ==========================================
   PlaceMentor AI
   Common Utility Functions
   Part 3 (Final)
   Validation
   Loading
   Formatting
   Utilities
========================================== */

/* ==========================================
   EMAIL VALIDATION
========================================== */

function isValidEmail(email) {

    return REGEX.EMAIL.test(email);

}

/* ==========================================
   PASSWORD VALIDATION
========================================== */

function isValidPassword(password) {

    return REGEX.PASSWORD.test(password);

}

/* ==========================================
   MOBILE VALIDATION
========================================== */

function isValidMobile(mobile) {

    return REGEX.MOBILE.test(mobile);

}

/* ==========================================
   EMPTY CHECK
========================================== */

function isEmpty(value) {

    return value === null ||

           value === undefined ||

           value.toString().trim() === "";

}

/* ==========================================
   SHOW LOADING
========================================== */

function showLoading() {

    document.body.style.cursor =

        "progress";

}

/* ==========================================
   HIDE LOADING
========================================== */

function hideLoading() {

    document.body.style.cursor =

        "default";

}

/* ==========================================
   FORMAT DATE
========================================== */

function formatDate(date) {

    if (!date) {

        return "-";

    }

    return new Date(date)

        .toLocaleDateString(

            "en-IN"

        );

}

/* ==========================================
   FORMAT DATE & TIME
========================================== */

function formatDateTime(date) {

    if (!date) {

        return "-";

    }

    return new Date(date)

        .toLocaleString(

            "en-IN"

        );

}

/* ==========================================
   DEBOUNCE
========================================== */

function debounce(callback, delay = 300) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback.apply(

                this,

                args

            );

        }, delay);

    };

}

/* ==========================================
   SEARCH TABLE
========================================== */

function searchTable(inputId, tableId) {

    const input =

        $(inputId);

    const table =

        $(tableId);

    if (!input || !table) {

        return;

    }

    const filter =

        input.value.toLowerCase();

    const rows =

        table.querySelectorAll(

            "tbody tr"

        );

    rows.forEach(row => {

        row.style.display =

            row.innerText

                .toLowerCase()

                .includes(filter)

            ? ""

            : "none";

    });

}

/* ==========================================
   SCROLL TO TOP
========================================== */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* ==========================================
   SAFE FETCH
========================================== */

async function safeFetch(url, options = {}) {

    try {

        showLoading();

        const response =

            await fetch(

                url,

                options

            );

        hideLoading();

        return response;

    }

    catch (error) {

        hideLoading();

        console.error(error);

        throw error;

    }

}

/* ==========================================
   INITIALIZE COMMON
========================================== */

function initializeCommon() {

    setDashboardLink();

}

console.log(

    "Common.js Loaded Successfully."

);