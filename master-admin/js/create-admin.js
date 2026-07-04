/* ==========================================
   PlaceMentor AI
   Create Admin
========================================== */

const CREATE_ADMIN_API =
    API.BASE_URL + "/admins";

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

        const form =

            document.getElementById(

                "createAdminForm"

            );

        form.addEventListener(

            "submit",

            createAdmin

        );

    }

);

/* ==========================================
   CREATE ADMIN
========================================== */

async function createAdmin(event) {

    event.preventDefault();

    const fullName =

        document.getElementById(

            "fullName"

        ).value.trim();

    const email =

        document.getElementById(

            "email"

        ).value.trim().toLowerCase();

    const password =

        document.getElementById(

            "password"

        ).value;

    const confirmPassword =

        document.getElementById(

            "confirmPassword"

        ).value;

    /* ==========================
       REQUIRED VALIDATION
    ========================== */

    if (

        fullName === "" ||

        email === "" ||

        password === "" ||

        confirmPassword === ""

    ) {

        showToast(

            "Please fill all required fields.",

            "warning"

        );

        return;

    }

    /* ==========================
       NAME VALIDATION
    ========================== */

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
       PASSWORD MATCH
    ========================== */

    if (

        password !== confirmPassword

    ) {

        showToast(

            "Passwords do not match.",

            "error"

        );

        return;

    }
        /* ==========================
       PASSWORD VALIDATION
    ========================== */

    if (password.length < 8) {

        showToast(

            "Password must contain at least 8 characters.",

            "error"

        );

        return;

    }

    const upperCase =
        /[A-Z]/.test(password);

    const lowerCase =
        /[a-z]/.test(password);

    const number =
        /[0-9]/.test(password);

    const special =
        /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (

        !upperCase ||

        !lowerCase ||

        !number ||

        !special

    ) {

        showToast(

            "Password must contain uppercase, lowercase, number and special character.",

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

        password: password

    };

        try {

        const response = await fetch(

            CREATE_ADMIN_API,

            {

                method: "POST",

                headers: {

                    ...API.getHeaders(),

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(requestBody)

            }

        );

        let result;

        const contentType = response.headers.get("content-type");

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

                    : (result.message || "Unable to create admin.")

            );

        }

        showToast(

            "Admin created successfully.",

            "success"

        );

        document.getElementById(

            "createAdminForm"

        ).reset();

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
   TOGGLE PASSWORD
========================================== */

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    const icon = button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}

    
    

