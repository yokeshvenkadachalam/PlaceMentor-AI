/* ==========================================
   PlaceMentor AI
   Login System (Spring Boot + JWT)
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       LOGIN FORM
    ========================== */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", loginUser);

    }

    /* ==========================
       REMEMBER ME
    ========================== */

    const rememberedUser = getRememberUser();

    if (rememberedUser) {

        const emailInput = document.getElementById("loginEmail");
        const rememberCheckbox = document.getElementById("remember");

        if (emailInput) {
            emailInput.value = rememberedUser.email || "";
        }

        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }

    }

    /* ==========================
       FORGOT PASSWORD
    ========================== */

    const forgotBtn = document.getElementById("forgotPassword");

    if (forgotBtn) {

        forgotBtn.addEventListener("click", forgotPassword);

    }

});


/* ==========================================
   LOGIN USER
========================================== */

let loginInProgress = false;

async function loginUser(e) {
    console.count("LOGIN USER CALLED");

    e.preventDefault();

    /* ==========================
       PREVENT MULTIPLE REQUESTS
    ========================== */

    if (loginInProgress) {

        console.log("Login already in progress. Ignoring duplicate request.");

        return;

    }

    loginInProgress = true;

    const loginForm = document.getElementById("loginForm");

    const submitButton =
        loginForm?.querySelector('button[type="submit"]');

    if (submitButton) {

        submitButton.disabled = true;

    }


    try {

        /* ==========================
           GET FORM VALUES
        ========================== */

        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("loginPassword")
                .value
                .trim();

        const remember =
            document
                .getElementById("remember")
                .checked;


        /* ==========================
           VALIDATION
        ========================== */

        if (!email || !password) {

            showToast(
                "Please enter Email and Password.",
                "warning"
            );

            return;

        }


        console.log("Sending login request...");


        /* ==========================
           LOGIN API
        ========================== */

        const response = await fetch(

            API.BASE_URL + API.AUTH.LOGIN,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email: email,

                    password: password

                })

            }

        );


        /* ==========================
           READ RESPONSE SAFELY
        ========================== */

        const responseText = await response.text();

        console.log(
            "Login response status:",
            response.status
        );

        console.log(
            "Login response:",
            responseText
        );


        let data = {};

        try {

            data = responseText
                ? JSON.parse(responseText)
                : {};

        }

        catch (jsonError) {

            console.error(
                "Server returned non-JSON response:",
                responseText
            );

            showToast(

                responseText ||
                "Invalid response from server.",

                "error"

            );

            return;

        }


        /* ==========================
           LOGIN FAILED
        ========================== */

        if (!response.ok) {

            showToast(

                data.message ||
                data.error ||
                "Login Failed",

                "error"

            );

            return;

        }


        /* ==========================
           CHECK TOKEN
        ========================== */

        if (!data.token) {

            console.error(
                "Login succeeded but JWT token is missing."
            );

            showToast(
                "Login response does not contain a token.",
                "error"
            );

            return;

        }


        /* ==========================
           SAVE JWT TOKEN
        ========================== */

        saveToken(data.token);


        /* ==========================
           SAVE CURRENT USER
        ========================== */

        const currentUser = {

            studentId: data.studentId,

            name: data.name,

            email: data.email,

            role: data.role,

            masterAdmin: data.masterAdmin

        };

        saveCurrentUser(currentUser);


        /* ==========================
           REMEMBER ME
        ========================== */

        if (remember) {

            saveRememberUser(currentUser);

        }

        else {

            clearRememberUser();

        }


        /* ==========================
           SUCCESS
        ========================== */

        showToast(
            "Login Successful",
            "success"
        );


        /* ==========================
           REDIRECT
        ========================== */

        setTimeout(() => {

            if (
                data.role &&
                data.role.toUpperCase() === "ADMIN"
            ) {

                if (data.masterAdmin === true) {

                    window.location.href =
                        "master-admin/dashboard.html";

                }

                else {

                    window.location.href =
                        "admin/dashboard.html";

                }

            }

            else {

                window.location.href =
                    "dashboard.html";

            }

        }, 500);

    }


    catch (error) {

        console.error(
            "Login error:",
            error
        );

        showToast(
            "Unable to connect to the server.",
            "error"
        );

    }


    finally {

        loginInProgress = false;

        if (submitButton) {

            submitButton.disabled = false;

        }

    }

}


/* ==========================================
   FORGOT PASSWORD
========================================== */

function forgotPassword(e) {

    e.preventDefault();

    showToast(

        "Forgot Password module will be connected with Spring Boot later.",

        "info"

    );

}


/* ==========================================
   AUTO LOGIN
========================================== */

(function () {

    const token = getToken();

    const user = getCurrentUser();

    if (!token || !user) {

        return;

    }


    /* ==========================
       AUTO REDIRECT
    ========================== */

    if (
        user.role &&
        user.role.toUpperCase() === "ADMIN"
    ) {

        if (user.masterAdmin === true) {

            window.location.href =
                "master-admin/dashboard.html";

        }

        else {

            window.location.href =
                "admin/dashboard.html";

        }

    }

    else {

        window.location.href =
            "dashboard.html";

    }

})();


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    removeToken();

    clearCurrentUser();

    clearRememberUser();

    showToast(
        "Logged Out Successfully",
        "success"
    );

    setTimeout(() => {

        window.location.href =
            "login.html";

    }, 1000);

}