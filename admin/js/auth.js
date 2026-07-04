/* ==========================================
   PlaceMentor AI
   Admin Authentication
========================================== */

async function checkAdminAuth() {

    const token = API.getToken();

    if (!token) {

        alert("Please login first.");

        window.location.href = "../login.html";

        return;

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

            logoutAdmin();

            return;

        }

        const user = await response.json();

        if (user.role !== "ADMIN") {

            alert("Access Denied");

            logoutAdmin();

            return;

        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

    }

    catch (error) {

        console.error(error);

        logoutAdmin();

    }

}