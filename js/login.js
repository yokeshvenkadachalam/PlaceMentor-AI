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

        loginForm.addEventListener(

            "submit",

            loginUser

        );

    }

    /* ==========================
       REMEMBER ME
    ========================== */

    const rememberedUser =

        getRememberUser();

    if (rememberedUser) {

        document.getElementById(

            "loginEmail"

        ).value = rememberedUser.email;

        document.getElementById(

            "remember"

        ).checked = true;

    }

    /* ==========================
       FORGOT PASSWORD
    ========================== */

    const forgotBtn =

        document.getElementById(

            "forgotPassword"

        );

    if (forgotBtn) {

        forgotBtn.addEventListener(

            "click",

            forgotPassword

        );

    }

});

/* ==========================================
   LOGIN USER
========================================== */

async function loginUser(e) {

    e.preventDefault();

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

    if (!email || !password) {

        showToast(

            "Please enter Email and Password.",

            "warning"

        );

        return;

    }

    try {

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

        const data = await response.json();

        if (!response.ok) {

            showToast(

                data.message || "Login Failed",

                "error"

            );

            return;

        }

        /* ==========================
           SAVE JWT TOKEN
        ========================== */

        saveToken(

            data.token

        );

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

        saveCurrentUser(

            currentUser

        );

        /* ==========================
           REMEMBER ME
        ========================== */

        if (remember) {

            saveRememberUser(

                currentUser

            );

        } else {

            clearRememberUser();

        }

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

    if (data.masterAdmin) {

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

        }, 1000);

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to connect to the server.",

            "error"

        );

    }

}

/* ==========================================
   FORGOT PASSWORD
========================================== */

function forgotPassword(e){

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

    if (

    user.role &&
    user.role.toUpperCase() === "ADMIN"

) {

    if (user.masterAdmin) {

        alert("Going to Master Admin Dashboard");
window.location.href =
    "master-admin/dashboard.html";

    }

    else {

        window.location.href =
            "admin/dashboard.html";

    }

} else {

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