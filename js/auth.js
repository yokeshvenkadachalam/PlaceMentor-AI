/* ==========================================
   PlaceMentor AI
   Student Registration
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", registerStudent);

});

/* ==========================================
   REGISTER STUDENT
========================================== */

async function registerStudent(e) {

    e.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const college = document.getElementById("college").value.trim();
    const department = document.getElementById("department").value.trim();
    const yearOfStudy =
    document.getElementById("yearOfStudy").value;
    const email = document.getElementById("email").value.trim().toLowerCase();
    const mobile = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    /* ==========================
       VALIDATION
    ========================== */

    if (
        fullName === "" ||
        college === "" ||
        department === "" ||
        email === "" ||
        mobile === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        showToast("Please fill all fields.", "warning");
        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showToast("Invalid Email Address.", "error");
        return;

    }

    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(mobile)) {

        showToast("Invalid Mobile Number.", "error");
        return;

    }

    if (password.length < 8) {

        showToast(
            "Password must contain at least 8 characters.",
            "error"
        );

        return;

    }

    if (password !== confirmPassword) {

        showToast("Passwords do not match.", "error");
        return;

    }

    /* ==========================
       REQUEST BODY
    ========================== */

    const requestBody = {

        fullName: fullName,
        email: email,
        password: password,
        role: "STUDENT",

        college: college,
        department: department,
        yearOfStudy: yearOfStudy,
        mobile: mobile

    };

    try {

        const response = await fetch(

            API.BASE_URL + API.AUTH.REGISTER,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(requestBody)

            }

        );

        const data = await response.json();

        if (!response.ok) {

            showToast(

                data.message || "Registration Failed",

                "error"

            );

            return;

        }

        showToast(

            "Registration Successful!",

            "success"

        );

        console.log(data);

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1500);

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to connect to server.",

            "error"

        );

    }

}