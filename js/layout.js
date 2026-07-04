/* ==========================================
   PlaceMentor AI
   Layout Manager
   Part 1

   Layout Initialization
   Current User
   Dashboard Routing
   Page Title
   Sidebar Activation
========================================== */

/* ==========================================
   CURRENT PAGE
========================================== */

let CURRENT_PAGE = "";

/* ==========================================
   INITIALIZE LAYOUT
========================================== */

function initializeLayout(pageName) {

    CURRENT_PAGE = pageName;

    setPageTitle(pageName);

    loadCurrentUser();

    setupDashboardLink();

    activateSidebar(pageName);

}

/* ==========================================
   LOAD CURRENT USER
========================================== */

function loadCurrentUser() {

    const user = getLoggedInUser();

    if (!user) {

        return;

    }

    const adminName =

        document.getElementById("adminName");

    if (adminName) {

        adminName.textContent =

            user.name;

    }

}

/* ==========================================
   DASHBOARD ROUTING
========================================== */

function getDashboardRoute() {

    const user = getLoggedInUser();

    if (!user) {

        return "../login.html";

    }

    if (

        user.role === ROLES.ADMIN &&

        user.masterAdmin === true

    ) {

        return "../master-admin/dashboard.html";

    }

    if (

        user.role === ROLES.ADMIN

    ) {

        return "dashboard.html";

    }

    return "../dashboard.html";

}

/* ==========================================
   SET DASHBOARD LINK
========================================== */

function setupDashboardLink() {

    const dashboardRoute = getDashboardRoute();

    document
        .querySelectorAll(".dashboard-link")
        .forEach(element => {

            if (element.tagName.toUpperCase() === "A") {

    element.href = dashboardRoute;

}

            else {

                element.onclick = () => {

                    window.location.href = dashboardRoute;

                };

            }

        });

}

/* ==========================================
   PAGE TITLE
========================================== */

function setPageTitle(pageName) {

    let title =

        pageName

            .replace(/-/g, " ")

            .replace(/\b\w/g, c => c.toUpperCase());

    document.title =

        title +

        " | PlaceMentor AI";

}

/* ==========================================
   SIDEBAR ACTIVE MENU
========================================== */

function activateSidebar(pageName) {

    const sidebar =

        document.querySelector(".sidebar");

    if (!sidebar) {

        return;

    }

    document

        .querySelectorAll(

            ".sidebar li"

        )

        .forEach(item => {

            item.classList.remove(

                "active"

            );

        });

    const activeLink =

        document.querySelector(

            `[data-page="${pageName}"]`

        );

    if (

        activeLink &&

        activeLink.parentElement

    ) {

        activeLink.parentElement

            .classList.add(

                "active"

            );

    }

}
document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const page = body.dataset.page;

    if (page) {

        initializeLayout(page);

    }

});

console.log(

    "Layout.js Part 1 Loaded"

);