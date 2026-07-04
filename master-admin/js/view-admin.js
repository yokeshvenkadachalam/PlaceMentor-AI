/* ==========================================
   PlaceMentor AI
   View Admin
========================================== */

const VIEW_ADMIN_API =
    API.BASE_URL + "/admins";

/* ==========================================
   ADMIN ID
========================================== */

const adminId =

    new URLSearchParams(

        window.location.search

    ).get("id");

/* ==========================================
   START
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        const authenticated =

            await checkMasterAdminAuth();

        if (!authenticated) {

            return;

        }

        if (!adminId) {

            showToast(

                "Invalid Admin ID.",

                "error"

            );

            setTimeout(() => {

                window.location.href =

                    "admin-management.html";

            }, 1500);

            return;

        }

        await loadAdminDetails();

    }

);

/* ==========================================
   LOAD ADMIN DETAILS
========================================== */

async function loadAdminDetails() {

    try {

        const response = await fetch(

            VIEW_ADMIN_API +

            "/" +

            adminId,

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                await response.text()

            );

        }

        const admin =

            await response.json();

        populateAdmin(admin);

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message ||

            "Unable to load admin details.",

            "error"

        );

        setTimeout(() => {

            window.location.href =

                "admin-management.html";

        }, 1500);

    }

}
/* ==========================================
   POPULATE ADMIN DETAILS
========================================== */

function populateAdmin(admin) {

    /* ==========================
       FORM FIELDS
    ========================== */

    document.getElementById(
        "userId"
    ).value = admin.userId;

    document.getElementById(
        "role"
    ).value =
        admin.masterAdmin
            ? "MASTER_ADMIN"
            : "ADMIN";

    document.getElementById(
        "fullName"
    ).value = admin.fullName;

    document.getElementById(
        "email"
    ).value = admin.email;

    document.getElementById(
        "status"
    ).value =
        admin.active
            ? "Active"
            : "Inactive";

    document.getElementById(
        "adminType"
    ).value =
        admin.masterAdmin
            ? "Master Admin"
            : "Normal Admin";

    /* ==========================
       STATUS SUMMARY CARD
    ========================== */

    const statusBadge =
        document.getElementById(
            "statusBadge"
        );

    statusBadge.textContent =
        admin.active
            ? "🟢 Active"
            : "🔴 Inactive";

    statusBadge.className =
        admin.active
            ? "badge badge-success"
            : "badge badge-danger";

    /* ==========================
       ADMIN TYPE SUMMARY CARD
    ========================== */

    const typeBadge =
        document.getElementById(
            "typeBadge"
        );

    typeBadge.textContent =
        admin.masterAdmin
            ? "👑 Master Admin"
            : "👤 Normal Admin";

    typeBadge.className =
        admin.masterAdmin
            ? "badge badge-primary"
            : "badge badge-secondary";

}
/* ==========================================
   REFRESH ADMIN DETAILS
========================================== */

async function refreshAdmin() {

    try {

        await loadAdminDetails();

        showToast(

            "Admin details refreshed successfully.",

            "success"

        );

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================
   BACK
========================================== */

function goBack() {

    window.location.href =

        "admin-management.html";

}

/* ==========================================
   LOGOUT
========================================== */

function logoutMasterAdmin() {

    API.logout();

}

/* ==========================================
   PAGE VISIBILITY
========================================== */

document.addEventListener(

    "visibilitychange",

    () => {

        if (

            document.visibilityState === "visible"

        ) {

            loadAdminDetails();

        }

    }

);

/* ==========================================
   AUTO REFRESH
========================================== */

setInterval(

    () => {

        loadAdminDetails();

    },

    60000

);

/* ==========================================
   ESC KEY SUPPORT
========================================== */

document.addEventListener(

    "keydown",

    function(event){

        if(event.key === "Escape"){

            window.location.href =

                "admin-management.html";

        }

    }

);

/* ==========================================
   END
========================================== */

console.log(

    "View Admin Page Loaded Successfully."

);