/* ==========================================
   PlaceMentor AI
   Master Admin Management
========================================== */

const ADMIN_API = API.BASE_URL + "/admins";

let admins = [];

let filteredAdmins = [];

let currentPage = 1;

const pageSize = 10;

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

        await loadAdmins();

    }

);

/* ==========================================
   LOAD ADMINS
========================================== */

async function loadAdmins() {

    try {

        const response = await fetch(

            ADMIN_API,

            {

                method: "GET",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                "Unable to load admins."

            );

        }

        admins = await response.json();

        filteredAdmins = [...admins];

        loadStatistics();

renderTable();

updatePagination();

    }

    catch (error) {

        console.error(error);

        showToast(

            "Failed to load admins.",

            "error"

        );

    }

}

/* ==========================================
   LOAD STATISTICS
========================================== */

function loadStatistics() {

    const total = admins.length;

    const active = admins.filter(

        admin => admin.active

    ).length;

    const inactive = admins.filter(

        admin => !admin.active

    ).length;

    document.getElementById(

        "totalAdmins"

    ).textContent = total;

    document.getElementById(

        "activeAdmins"

    ).textContent = active;

    document.getElementById(

        "inactiveAdmins"

    ).textContent = inactive;

    document.getElementById(

        "recordCount"

    ).textContent =

        total + " Records";

}

/* ==========================================
   RENDER TABLE
========================================== */

function renderTable() {

    const tbody =

        document.getElementById(

            "adminTable"

        );

    tbody.innerHTML = "";

    if (

        filteredAdmins.length === 0

    ) {

        tbody.innerHTML = `

        <tr>

            <td colspan="6"

                style="text-align:center;">

                No Admins Found

            </td>

        </tr>

        `;

        return;

    }

    const start =

        (currentPage - 1) * pageSize;

    const end =

        start + pageSize;

    const pageAdmins =

        filteredAdmins.slice(

            start,

            end

        );

    pageAdmins.forEach(admin => {

        tbody.innerHTML += `

<tr>

<td>

${admin.userId}

</td>

<td>

${admin.fullName}

</td>

<td>

${admin.email}

</td>

<td>

<span class="${
admin.active

?

'status-active'

:

'status-inactive'

}">

${

admin.active

?

'Active'

:

'Inactive'

}

</span>

</td>

<td>

<span class="${

admin.masterAdmin

?

'role-master'

:

'role-admin'

}">

${

admin.masterAdmin

?

'Master Admin'

:

'Admin'

}

</span>

</td>

<td>

<div class="action-buttons">

<button

class="action-btn view-btn"

onclick="viewAdmin(${admin.id})"

title="View">

<i class="fa-solid fa-eye"></i>

</button>

${

!admin.masterAdmin

?

`

<button

class="action-btn edit-btn"

onclick="updateAdmin(${admin.id})"

title="Update">

<i class="fa-solid fa-pen"></i>

</button>

${

admin.active

?

`

<button

class="action-btn deactivate-btn"

onclick="deactivateAdmin(${admin.id})"

title="Deactivate">

<i class="fa-solid fa-user-slash"></i>

</button>

`

:

`

<button

class="action-btn activate-btn"

onclick="activateAdmin(${admin.id})"

title="Activate">

<i class="fa-solid fa-user-check"></i>

</button>

`

}

<button

class="action-btn reset-btn"

onclick="resetPassword(${admin.id})"

title="Reset Password">

<i class="fa-solid fa-key"></i>

</button>

<button

class="action-btn delete-btn"

onclick="deleteAdmin(${admin.id})"

title="Delete">

<i class="fa-solid fa-trash"></i>

</button>

`

:

``

}

</div>

</td>

</tr>

`;

    });

}
/* ==========================================
   SEARCH ADMIN
========================================== */

document.getElementById("searchInput")
.addEventListener("input", searchAdmins);

function searchAdmins() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    filteredAdmins = admins.filter(admin => {

        return (

            admin.fullName.toLowerCase().includes(keyword) ||

            admin.email.toLowerCase().includes(keyword) ||

            admin.userId.toLowerCase().includes(keyword)

        );

    });

    applyStatusFilter(false);

}

/* ==========================================
   STATUS FILTER
========================================== */

document.getElementById("statusFilter")
.addEventListener("change", () => {

    applyStatusFilter(true);

});

function applyStatusFilter(resetPage = true) {

    const keyword = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const status = document
        .getElementById("statusFilter")
        .value;

    filteredAdmins = admins.filter(admin => {

        const matchesKeyword =

            admin.fullName.toLowerCase().includes(keyword) ||

            admin.email.toLowerCase().includes(keyword) ||

            admin.userId.toLowerCase().includes(keyword);

        let matchesStatus = true;

        if (status === "ACTIVE") {

            matchesStatus = admin.active;

        }

        if (status === "INACTIVE") {

            matchesStatus = !admin.active;

        }

        return matchesKeyword && matchesStatus;

    });

    if (resetPage) {

        currentPage = 1;

    }

    renderTable();

    updatePagination();

}

/* ==========================================
   PAGINATION
========================================== */

function updatePagination() {

    const totalPages =

        Math.max(

            1,

            Math.ceil(

                filteredAdmins.length /

                pageSize

            )

        );

    document.getElementById(

        "pageInfo"

    ).textContent =

        "Page " +

        currentPage +

        " of " +

        totalPages;

    document.getElementById(

        "prevPage"

    ).disabled =

        currentPage === 1;

    document.getElementById(

        "nextPage"

    ).disabled =

        currentPage >= totalPages;

}

/* ==========================================
   PREVIOUS PAGE
========================================== */

function previousPage() {

    if (currentPage > 1) {

        currentPage--;

        renderTable();

        updatePagination();

    }

}

/* ==========================================
   NEXT PAGE
========================================== */

function nextPage() {

    const totalPages =

        Math.ceil(

            filteredAdmins.length /

            pageSize

        );

    if (currentPage < totalPages) {

        currentPage++;

        renderTable();

        updatePagination();

    }

}

/* ==========================================
   REFRESH
========================================== */

async function refreshAdmins() {

    document.getElementById(

        "searchInput"

    ).value = "";

    document.getElementById(

        "statusFilter"

    ).value = "ALL";

    currentPage = 1;

    await loadAdmins();

    showToast(

        "Admin list refreshed.",

        "success"

    );

}
/* ==========================================
   VIEW ADMIN
========================================== */

async function viewAdmin(id) {

    window.location.href =
        "view-admin.html?id=" + id;

}

/* ==========================================
   UPDATE ADMIN
========================================== */

async function updateAdmin(id) {

    window.location.href =
        "update-admin.html?id=" + id;

}

/* ==========================================
   DELETE ADMIN
========================================== */

let selectedAdminId = null;

function deleteAdmin(id) {

    selectedAdminId = id;

    document
        .getElementById("deleteModal")
        .classList
        .add("show");

}

/* ==========================================
   CLOSE DELETE MODAL
========================================== */

function closeDeleteModal() {

    selectedAdminId = null;

    document
        .getElementById("deleteModal")
        .classList
        .remove("show");

}

/* ==========================================
   CONFIRM DELETE
========================================== */

document
.getElementById("confirmDeleteBtn")
.addEventListener("click", confirmDelete);

async function confirmDelete() {

    if (selectedAdminId == null) {

        return;

    }

    try {

        const response = await fetch(

            ADMIN_API + "/" + selectedAdminId,

            {

                method: "DELETE",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            const message =
                await response.text();

            throw new Error(message);

        }

        showToast(

            "Admin deleted successfully.",

            "success"

        );

        closeDeleteModal();

        await loadAdmins();

    }

    catch (error) {

        console.error(error);

        showToast(

            error.message ||

            "Unable to delete admin.",

            "error"

        );

    }

}
/* ==========================================
   STATUS MODAL
========================================== */

let selectedStatusAdminId = null;

let selectedStatus = true;

/* ==========================================
   ACTIVATE ADMIN
========================================== */

function activateAdmin(id) {

    selectedStatusAdminId = id;

    selectedStatus = true;

    document.getElementById(
        "statusTitle"
    ).textContent = "Activate Admin";

    document.getElementById(
        "statusMessage"
    ).textContent =
        "Are you sure you want to activate this admin?";

    document.getElementById(
        "statusModal"
    ).classList.add("show");

}

/* ==========================================
   DEACTIVATE ADMIN
========================================== */

function deactivateAdmin(id) {

    selectedStatusAdminId = id;

    selectedStatus = false;

    document.getElementById(
        "statusTitle"
    ).textContent = "Deactivate Admin";

    document.getElementById(
        "statusMessage"
    ).textContent =
        "Are you sure you want to deactivate this admin?";

    document.getElementById(
        "statusModal"
    ).classList.add("show");

}

/* ==========================================
   CLOSE STATUS MODAL
========================================== */

function closeStatusModal() {

    selectedStatusAdminId = null;

    document.getElementById(
        "statusModal"
    ).classList.remove("show");

}

/* ==========================================
   CONFIRM STATUS CHANGE
========================================== */

document.getElementById(
    "confirmStatusBtn"
).addEventListener(

    "click",

    confirmStatusChange

);

async function confirmStatusChange() {

    if (selectedStatusAdminId == null) {

        return;

    }

    const endpoint =

        selectedStatus

        ?

        "/activate"

        :

        "/deactivate";

    try {

        const response = await fetch(

            ADMIN_API +

            "/" +

            selectedStatusAdminId +

            endpoint,

            {

                method: "PUT",

                headers: API.getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                await response.text()

            );

        }

        showToast(

            selectedStatus

            ?

            "Admin Activated Successfully."

            :

            "Admin Deactivated Successfully.",

            "success"

        );

        closeStatusModal();

        await loadAdmins();

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
   RESET PASSWORD
========================================== */

async function resetPassword(id) {

    try {

        const response = await fetch(

            ADMIN_API +

            "/" +

            id +

            "/reset-password",

            {

                method: "PUT",

                headers: API.getHeaders()

            }

        );

        const result = await response.text();

        if (!response.ok) {

            throw new Error(result);

        }

        document.getElementById(

            "temporaryPassword"

        ).textContent = result;

        document.getElementById(

            "resetPasswordModal"

        ).classList.add("show");

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
   CLOSE RESET MODAL
========================================== */

function closeResetModal() {

    document.getElementById(

        "resetPasswordModal"

    ).classList.remove("show");

}
/* ==========================================
   LOGOUT
========================================== */

function logoutMasterAdmin() {

    API.logout();

}

/* ==========================================
   CLOSE MODAL WHEN CLICK OUTSIDE
========================================== */

window.addEventListener("click", function (event) {

    const deleteModal =
        document.getElementById("deleteModal");

    const statusModal =
        document.getElementById("statusModal");

    const resetModal =
        document.getElementById("resetPasswordModal");

    if (event.target === deleteModal) {

        closeDeleteModal();

    }

    if (event.target === statusModal) {

        closeStatusModal();

    }

    if (event.target === resetModal) {

        closeResetModal();

    }

});

/* ==========================================
   ESC KEY SUPPORT
========================================== */

document.addEventListener(

    "keydown",

    function (event) {

        if (event.key === "Escape") {

            closeDeleteModal();

            closeStatusModal();

            closeResetModal();

        }

    }

);

/* ==========================================
   AUTO REFRESH EVERY 60 SECONDS
========================================== */

setInterval(async () => {

    try {

        await loadAdmins();

    }

    catch (e) {

        console.error(e);

    }

}, 60000);

/* ==========================================
   RELOAD CURRENT PAGE
========================================== */

function reloadCurrentPage() {

    loadAdmins();

}

/* ==========================================
   PAGE VISIBILITY
========================================== */

document.addEventListener(

    "visibilitychange",

    () => {

        if (

            document.visibilityState === "visible"

        ) {

            loadAdmins();

        }

    }

);

/* ==========================================
   SHOW LOADING
========================================== */

function showLoading() {

    document.body.style.cursor = "wait";

}

/* ==========================================
   HIDE LOADING
========================================== */

function hideLoading() {

    document.body.style.cursor = "default";

}

/* ==========================================
   FORMAT DATE
========================================== */

function formatDate(date) {

    return new Date(date)

        .toLocaleString();

}

/* ==========================================
   END
========================================== */

console.log(

    "Master Admin Management Loaded Successfully."

);