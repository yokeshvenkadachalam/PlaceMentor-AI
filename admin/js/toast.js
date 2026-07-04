"use strict";

/* ==========================================
   PlaceMentor AI Toast
========================================== */

const toastIcons = {

    success:

        "fa-circle-check",

    error:

        "fa-circle-xmark",

    warning:

        "fa-triangle-exclamation",

    info:

        "fa-circle-info"

};

function showToast(

    message,

    type = "info",

    duration = 3000

){

    let container =

        document.querySelector(

            ".toast-container"

        );

    if(!container){

        container =

            document.createElement("div");

        container.className =

            "toast-container";

        document.body.appendChild(

            container

        );

    }

    const toast =

        document.createElement("div");

    toast.className =

        `toast ${type}`;

    toast.innerHTML = `

        <i class="fa-solid ${toastIcons[type]}"></i>

        <div class="toast-content">

            <div class="toast-title">

                ${type.toUpperCase()}

            </div>

            <div class="toast-message">

                ${message}

            </div>

        </div>

        <i class="fa-solid fa-xmark toast-close"></i>

    `;

    container.appendChild(toast);

    toast

        .querySelector(".toast-close")

        .onclick = () =>

            removeToast(toast);

    setTimeout(

        () =>

            removeToast(toast),

        duration

    );

}

function removeToast(toast){

    toast.style.animation =

        "toastOut .35s forwards";

    setTimeout(

        () =>

            toast.remove(),

        350

    );

}