/* ==========================================
   PlaceMentor AI
   Category Details
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await checkAdminAuth();

    loadCategoryDetails();

});

/* ==========================================
   LOAD CATEGORY DETAILS
========================================== */

async function loadCategoryDetails() {

    try {

        const params = new URLSearchParams(

            window.location.search

        );

        const categoryId = params.get("id");

        if (!categoryId) {

            showToast(

                "Category ID not found.",

                "error"

            );

            return;

        }

        const response = await fetch(

            API.BASE_URL +

            "/admin/categories/" +

            categoryId,

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                "Unable to load category."

            );

        }

        const category = await response.json();

        document.getElementById(

            "categoryName"

        ).textContent = category.name;

        document.getElementById(

            "categoryDescription"

        ).textContent = category.description;

        document.getElementById(

            "totalTopics"

        ).textContent = category.totalTopics;

        document.getElementById(

            "totalQuestions"

        ).textContent = category.totalQuestions;

        document.getElementById(

            "categoryStatus"

        ).innerHTML =

            category.active

            ? `<span class="status active">

                    Active

               </span>`

            : `<span class="status inactive">

                    Inactive

               </span>`;

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load category.",

            "error"

        );

    }

}