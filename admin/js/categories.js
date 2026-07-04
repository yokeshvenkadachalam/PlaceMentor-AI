/* ==========================================
   PlaceMentor AI
   Category Management
========================================== */

let editingCategoryId = null;

document.addEventListener("DOMContentLoaded", async () => {

    await checkAdminAuth();

    initializeEvents();

    await loadCategories();

});

/* ==========================================
   EVENTS
========================================== */

function initializeEvents() {

    document
        .getElementById("searchCategory")
        .addEventListener("keyup", filterCategories);

    document
        .getElementById("statusFilter")
        .addEventListener("change", filterCategories);

    document
        .getElementById("addCategoryBtn")
        .addEventListener("click", openModal);

    document
        .getElementById("closeCategoryModal")
        .addEventListener("click", closeModal);

    document
        .getElementById("saveCategoryBtn")
        .addEventListener("click", saveCategory);

}

/* ==========================================
   LOAD CATEGORIES
========================================== */

async function loadCategories() {

    try {

        const response = await fetch(

            API.BASE_URL + "/admin/categories",

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(
                "Unable to load categories."
            );

        }

        const data = await response.json();

        document.getElementById(
            "totalCategories"
        ).textContent = data.totalCategories;

        document.getElementById(
            "activeCategories"
        ).textContent = data.activeCategories;

        document.getElementById(
            "inactiveCategories"
        ).textContent = data.inactiveCategories;

        const table =
            document.getElementById(
                "categoryTable"
            );

        table.innerHTML = "";

        if (

            !data.categories ||

            data.categories.length === 0

        ) {

            table.innerHTML = `

                <tr>

                    <td colspan="6"
                        class="empty-row">

                        No Categories Found

                    </td>

                </tr>

            `;

            return;

        }

        data.categories.forEach(category => {

            table.innerHTML += `

                <tr>

                    <td>${category.name}</td>

                    <td>${category.description}</td>

                    <td>

                        <span class="status ${category.active ? "active" : "inactive"}">

                            ${category.active ? "Active" : "Inactive"}

                        </span>

                    </td>

                    <td>${category.totalTopics}</td>

                    <td>${category.totalQuestions}</td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="view-btn"
                                onclick="viewCategory(${category.id})">

                                <i class="fa-solid fa-eye"></i>

                            </button>

                            <button
                                class="edit-btn"
                                onclick="editCategory(${category.id})">

                                <i class="fa-solid fa-pen"></i>

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteCategory(${category.id})">

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load categories.",

            "error"

        );

    }

}

/* ==========================================
   FILTER
========================================== */

function filterCategories() {

    const search =

        document
            .getElementById("searchCategory")
            .value
            .toLowerCase();

    const status =

        document
            .getElementById("statusFilter")
            .value
            .toLowerCase();

    document

        .querySelectorAll("#categoryTable tr")

        .forEach(row => {

            const text =

                row.innerText.toLowerCase();

            const matchSearch =

                text.includes(search);

            const matchStatus =

                status === "all" ||

                text.includes(status);

            row.style.display =

                matchSearch && matchStatus

                    ? ""

                    : "none";

        });

}

/* ==========================================
   VIEW CATEGORY
========================================== */

function viewCategory(id) {

    window.location.href =

        "category-details.html?id=" + id;

}

/* ==========================================
   EDIT CATEGORY
========================================== */

async function editCategory(id) {

    try {

        const response = await fetch(

            API.BASE_URL +

            "/admin/categories/" +

            id,

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

        editingCategoryId = id;

        document.getElementById(

            "modalTitle"

        ).textContent =

            "✏️ Edit Category";

        document.getElementById(

            "saveCategoryBtn"

        ).textContent =

            "💾 Update Category";

        document.getElementById(

            "categoryName"

        ).value = category.name;

        document.getElementById(

            "categoryDescription"

        ).value = category.description;

        document.getElementById(

            "categoryStatus"

        ).value =

            category.active.toString();

        document.getElementById(

            "categoryModal"

        ).style.display = "flex";

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load category.",

            "error"

        );

    }

}

/* ==========================================
   DELETE CATEGORY
========================================== */

async function deleteCategory(id) {

    if (!confirm("Delete this category?")) {

        return;

    }

    try {

        const response = await fetch(

            API.BASE_URL +

            "/admin/categories/" +

            id,

            {

                method: "DELETE",

                headers: API.getHeaders()

            }

        );

        const message = await response.text();

        if (!response.ok) {

            throw new Error(message);

        }

        showToast(

            message,

            "success"

        );

        await loadCategories();

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
   SAVE CATEGORY
========================================== */

async function saveCategory() {

    const name =

        document.getElementById(
            "categoryName"
        ).value.trim();

    const description =

        document.getElementById(
            "categoryDescription"
        ).value.trim();

    const active =

        document.getElementById(
            "categoryStatus"
        ).value === "true";

    if (!name || !description) {

        showToast(

            "Please fill all fields.",

            "error"

        );

        return;

    }

    const requestBody = {

        name: name,

        description: description,

        active: active

    };

    try {

        let response;

        /* ==========================
           UPDATE CATEGORY
        ========================== */

        if (editingCategoryId) {

            response = await fetch(

                API.BASE_URL +

                "/admin/categories/" +

                editingCategoryId,

                {

                    method: "PUT",

                    headers: API.getHeaders(),

                    body: JSON.stringify(

                        requestBody

                    )

                }

            );

        }

        /* ==========================
           CREATE CATEGORY
        ========================== */

        else {

            response = await fetch(

                API.BASE_URL +

                "/admin/categories",

                {

                    method: "POST",

                    headers: API.getHeaders(),

                    body: JSON.stringify(

                        requestBody

                    )

                }

            );

        }

        if (!response.ok) {

            throw new Error(

                "Unable to save category."

            );

        }

        showToast(

            editingCategoryId

                ? "Category Updated Successfully"

                : "Category Created Successfully",

            "success"

        );

        editingCategoryId = null;

        closeModal();

        clearForm();

        await loadCategories();

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to save category.",

            "error"

        );

    }

}

/* ==========================================
   OPEN MODAL
========================================== */

function openModal() {

    editingCategoryId = null;

    document.getElementById(
        "modalTitle"
    ).textContent =
        "➕ Add Category";

    document.getElementById(
        "saveCategoryBtn"
    ).textContent =
        "💾 Save Category";

    clearForm();

    document.getElementById(
        "categoryModal"
    ).style.display = "flex";

}

/* ==========================================
   CLOSE MODAL
========================================== */

function closeModal() {

    editingCategoryId = null;

    clearForm();

    document.getElementById(
        "categoryModal"
    ).style.display = "none";

}

/* ==========================================
   CLEAR FORM
========================================== */

function clearForm() {


    document.getElementById(
        "categoryName"
    ).value = "";

    document.getElementById(
        "categoryDescription"
    ).value = "";

    document.getElementById(
        "categoryStatus"
    ).value = "true";

}