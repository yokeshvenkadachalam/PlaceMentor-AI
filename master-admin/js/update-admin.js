/* ==========================================
   PlaceMentor AI
   Update Admin
========================================== */

const UPDATE_ADMIN_API =
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

        document

            .getElementById(

                "updateAdminForm"

            )

            .addEventListener(

                "submit",

                updateAdmin

            );

        await loadAdminDetails();

    }

);

/* ==========================================
   LOAD ADMIN DETAILS
========================================== */

async function loadAdminDetails() {

    try {

        const response = await fetch(

            UPDATE_ADMIN_API +

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

        populateForm(admin);

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message ||

            "Unable to load admin.",

            "error"

        );

        setTimeout(() => {

            window.location.href =

                "admin-management.html";

        }, 1500);

    }

}
/* ==========================================
   POPULATE FORM
========================================== */

function populateForm(admin) {

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
        "active"
    ).value = String(admin.active);

    document.getElementById(
        "adminType"
    ).value =
        admin.masterAdmin
            ? "Master Admin"
            : "Normal Admin";

}

/* ==========================================
   UPDATE ADMIN
========================================== */

async function updateAdmin(event) {

    event.preventDefault();

    const fullName =
        document.getElementById(
            "fullName"
        ).value.trim();

    const email =
        document.getElementById(
            "email"
        ).value.trim().toLowerCase();

    const active =
        document.getElementById(
            "active"
        ).value === "true";

    /* ==========================
       REQUIRED VALIDATION
    ========================== */

    if (

        fullName === "" ||

        email === ""

    ) {

        showToast(

            "Please fill all required fields.",

            "warning"

        );

        return;

    }

    if (fullName.length < 3) {

        showToast(

            "Full Name must contain at least 3 characters.",

            "warning"

        );

        return;

    }

    /* ==========================
       EMAIL VALIDATION
    ========================== */

    const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (

        !emailPattern.test(email)

    ) {

        showToast(

            "Invalid Email Address.",

            "error"

        );

        return;

    }

    /* ==========================
       REQUEST BODY
    ========================== */

    const requestBody = {

        fullName: fullName,

        email: email,

        active: active

    };

    /* ==========================
       CONTINUE
       (Part 3)
    ========================== */
        try {

        const response = await fetch(

            UPDATE_ADMIN_API +

            "/" +

            adminId,

            {

                method: "PUT",

                headers: {

                    ...API.getHeaders(),

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(requestBody)

            }

        );

        let result;

        const contentType =

            response.headers.get("content-type");

        if (

            contentType &&

            contentType.includes("application/json")

        ) {

            result = await response.json();

        }

        else {

            result = await response.text();

        }

        if (!response.ok) {

            throw new Error(

                typeof result === "string"

                    ? result

                    : (

                        result.message ||

                        "Unable to update admin."

                    )

            );

        }

        showToast(

            "Admin updated successfully.",

            "success"

        );

        setTimeout(() => {

            window.location.href =

                "admin-management.html";

        }, 1200);

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message ||

            "Server Error.",

            "error"

        );

    }

}
/* ==========================================
   RESET FORM
========================================== */

document

.getElementById(

    "updateAdminForm"

)

.addEventListener(

    "reset",

    function (event) {

        event.preventDefault();

        loadAdminDetails();

        showToast(

            "Form restored successfully.",

            "success"

        );

    }

);

/* ==========================================
   RELOAD ADMIN DETAILS
========================================== */

async function reloadAdmin() {

    try {

        await loadAdminDetails();

        showToast(

            "Admin details reloaded.",

            "success"

        );

    }

    catch (error) {

        console.error(error);

    }

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
   REFRESH EVERY 60 SECONDS
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

    function (event) {

        if (

            event.key === "Escape"

        ) {

            document.activeElement.blur();

        }

    }

);

/* ==========================================
   END
========================================== */

console.log(

    "Update Admin Loaded Successfully."

);

