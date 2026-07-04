/* ==========================================
   PlaceMentor AI
   Toast Notification
========================================== */

function showToast(message, type = "success") {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {

        oldToast.remove();

    }

    const toast = document.createElement("div");

    toast.className = "toast " + type;

    let icon = "✅";

    if (type === "error") {

        icon = "❌";

    }

    if (type === "warning") {

        icon = "⚠";

    }

    if (type === "info") {

        icon = "ℹ";

    }

    toast.innerHTML = `

        <span class="toast-icon">

            ${icon}

        </span>

        <span>

            ${message}

        </span>

    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 50);

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

    setTimeout(() => {

        toast.remove();

    }, 3500);

}