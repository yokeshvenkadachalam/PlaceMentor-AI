/* ==========================================
   PlaceMentor AI
   Master Admin Authentication
========================================== */

async function checkMasterAdminAuth() {

    const token = API.getToken();

    if (!token) {

        showToast(
            "Please login first.",
            "warning"
        );

        setTimeout(() => {

            window.location.href = "../login.html";

        }, 1000);

        return false;

    }

    try {

        const response = await fetch(

            API.BASE_URL + "/auth/profile",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            logoutMasterAdmin();

            return false;

        }

        const user = await response.json();

        /* ==========================================
           ONLY MASTER ADMIN ALLOWED
        ========================================== */

        if (

            user.role !== "ADMIN" ||

            user.masterAdmin !== true

        ) {

            showToast(

                "Access Denied.",

                "error"

            );

            logoutMasterAdmin();

            return false;

        }

        /* ==========================================
           SAVE CURRENT USER
        ========================================== */

        localStorage.setItem(

            "currentUser",

            JSON.stringify(user)

        );

        sessionStorage.setItem(

            "currentUser",

            JSON.stringify(user)

        );

        return true;

    }

    catch (error) {

        console.error(error);

        showToast(

            "Authentication Failed.",

            "error"

        );

        logoutMasterAdmin();

        return false;

    }

}

/* ==========================================
   GET MASTER ADMIN
========================================== */

function getMasterAdmin() {

    return JSON.parse(

        localStorage.getItem(

            "currentUser"

        )

    );

}

/* ==========================================
   MASTER ADMIN LOGOUT
========================================== */

function logoutMasterAdmin() {

    clearCurrentUser();

    clearRememberUser();

    removeToken();

    showToast(

        "Logged out successfully.",

        "success"

    );

    setTimeout(() => {

        window.location.href = "../login.html";

    }, 1000);

}