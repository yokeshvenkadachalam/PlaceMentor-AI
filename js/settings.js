/* ==========================================
   PlaceMentor AI
   Settings Page
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeSettings();

});

/* ==========================================
   INITIALIZE
========================================== */

async function initializeSettings() {

    const token = getToken();

    if (!token) {

        showToast("Please login first.", "error");

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1000);

        return;

    }

    await loadSettings();

}

/* ==========================================
   LOAD SETTINGS
========================================== */

async function loadSettings() {

    try {

        const response = await fetch(

            API.BASE_URL + "/settings",

            {

                method: "GET",

                headers: {

                    Authorization:

                        "Bearer " + getToken()

                }

            }

        );

       if (!response.ok) {

    const error = await response.json();

    throw new Error(error.message);

}

        const data = await response.json();

        document.getElementById("settingName").value =
            data.fullName || "";

        document.getElementById("settingId").value =
            data.studentId || "";

        document.getElementById("settingEmail").value =
            data.email || "";

        document.getElementById("newPassword").value = "";

        document.getElementById("confirmPassword").value = "";

        if (data.theme === "dark") {

            document.getElementById("themeDark").checked = true;

            applyTheme("dark");

        }

        else {

            document.getElementById("themeLight").checked = true;

            applyTheme("light");

        }

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load settings.",

            "error"

        );

    }

}

/* ==========================================
   SAVE SETTINGS
========================================== */

document

.getElementById("saveSettingsBtn")

.addEventListener(

    "click",

    saveSettings

);

async function saveSettings() {

    const fullName =

        document

        .getElementById("settingName")

        .value

        .trim();

    const email =

        document

        .getElementById("settingEmail")

        .value

        .trim();

    const password =
       document.getElementById("newPassword").value;

    const confirmPassword =

        document

        .getElementById("confirmPassword")

        .value;

    if (
    password.length > 0 &&
    password.length < 6
) {

    showToast(
        "Password must be at least 6 characters.",
        "error"
    );

    return;
}

    const theme =

        document

        .getElementById("themeDark")

        .checked

            ? "dark"

            : "light";

    const body = {

        fullName,

        email,

        password,

        theme

    };

    try {

        const response = await fetch(

            API.BASE_URL + "/settings",

            {

                method: "PUT",

                headers: {

                    Authorization:

                        "Bearer " + getToken(),

                    "Content-Type":

                        "application/json"

                },

                body:

                    JSON.stringify(body)

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Unable to save."

            );

        }

        applyTheme(theme);

        showToast(

            "Settings updated successfully.",

            "success"

        );

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message,

            "error"

        );

    }

}

/* ==========================================
   APPLY THEME
========================================== */

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(

            "dark-mode"

        );

    }

    else {

        document.body.classList.remove(

            "dark-mode"

        );

    }

    if (typeof setTheme === "function") {

        setTheme(theme);

    }

}

/* ==========================================
   LOGOUT
========================================== */

document

.getElementById("logoutBtn")

.addEventListener(

    "click",

    logout

);

function logout() {

    logoutUser();

    showToast(

        "Logged out successfully.",

        "success"

    );

    setTimeout(() => {

        window.location.href =

            "login.html";

    }, 800);

}

/* ==========================================
   DELETE ACCOUNT
========================================== */

document

.getElementById("deleteAccountBtn")

.addEventListener(

    "click",

    deleteAccount

);

async function deleteAccount() {

    const confirmed = confirm(

        "Delete your account permanently?"

    );

    if (!confirmed) {

        return;

    }

    try {

        const response = await fetch(

            API.BASE_URL + "/settings",

            {

                method: "DELETE",

                headers: {

                    Authorization:

                        "Bearer " + getToken()

                }

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Delete failed."

            );

        }

        showToast(

            "Account deleted successfully.",

            "success"

        );

        logoutUser();

        setTimeout(() => {

            window.location.href =

                "register.html";

        }, 1000);

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message,

            "error"

        );

    }

}

/* ==========================================
   THEME SWITCH
========================================== */

document

.getElementById("themeLight")

.addEventListener(

    "change",

    () => {

        applyTheme("light");

    }

);

document

.getElementById("themeDark")

.addEventListener(

    "change",

    () => {

        applyTheme("dark");

    }

);