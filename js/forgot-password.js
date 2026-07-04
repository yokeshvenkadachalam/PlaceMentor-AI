/* ==========================================
   PlaceMentor AI
   Forgot Password
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       SECTIONS
    ========================== */

    const emailSection = document.getElementById("step1");
    const otpSection = document.getElementById("step2");
    const passwordSection = document.getElementById("step3");

    /* ==========================
       STEP INDICATORS
    ========================== */

    const step1Indicator = document.getElementById("step1Indicator");
    const step2Indicator = document.getElementById("step2Indicator");
    const step3Indicator = document.getElementById("step3Indicator");

    /* ==========================
       INPUTS
    ========================== */

    const emailInput = document.getElementById("email");
    const otpInput = document.getElementById("otp");
    const passwordInput = document.getElementById("newPassword");
    const confirmInput = document.getElementById("confirmPassword");

    /* ==========================
       BUTTONS
    ========================== */

    document.getElementById("sendOtpBtn")
        .addEventListener("click", sendOtp);

    document.getElementById("verifyOtpBtn")
        .addEventListener("click", verifyOtp);

    document.getElementById("resetPasswordBtn")
        .addEventListener("click", resetPassword);

    /* ==========================================
       SEND OTP
    ========================================== */

    async function sendOtp() {

        const email = emailInput.value.trim().toLowerCase();

        if (email === "") {

            showToast("Enter your email.", "warning");
            return;

        }

        try {

            const response = await fetch(

                API.BASE_URL + "/auth/forgot-password",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        email: email

                    })

                }

            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(data.message);

            }

            showToast(data.message, "success");

            emailSection.style.display = "none";
            otpSection.style.display = "block";

            step2Indicator.classList.add("active");

        }

        catch (error) {

            showToast(error.message, "error");

        }

    }

    /* ==========================================
       VERIFY OTP
    ========================================== */

    async function verifyOtp() {

        const email = emailInput.value.trim().toLowerCase();
        const otp = otpInput.value.trim();

        if (otp === "") {

            showToast("Enter OTP.", "warning");
            return;

        }

        try {

            const response = await fetch(

                API.BASE_URL + "/auth/verify-reset-otp",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        email,
                        otp

                    })

                }

            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(data.message);

            }

            showToast(data.message, "success");

            otpSection.style.display = "none";
            passwordSection.style.display = "block";

            step3Indicator.classList.add("active");

        }

        catch (error) {

            showToast(error.message, "error");

        }

    }

    /* ==========================================
       RESET PASSWORD
    ========================================== */

    async function resetPassword() {

        const email = emailInput.value.trim().toLowerCase();
        const otp = otpInput.value.trim();
        const password = passwordInput.value;
        const confirm = confirmInput.value;

        if (password.length < 8) {

            showToast(
                "Password must be at least 8 characters.",
                "warning"
            );

            return;

        }

        if (password !== confirm) {

            showToast(
                "Passwords do not match.",
                "error"
            );

            return;

        }

        try {

            const response = await fetch(

                API.BASE_URL + "/auth/reset-password",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        email,
                        otp,
                        newPassword: password

                    })

                }

            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(data.message);

            }

            showToast(
                "Password reset successfully.",
                "success"
            );

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        }

        catch (error) {

            showToast(error.message, "error");

        }

    }

});