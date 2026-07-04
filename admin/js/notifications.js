/* ==========================================
   PlaceMentor AI
   Notification Management
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    checkAdminLogin();

    initializeEvents();

    loadNotifications();

});

/* ==========================================
   EVENTS
========================================== */

function initializeEvents(){

    document
    .getElementById("addNotificationBtn")
    .addEventListener("click", openModal);

    document
    .getElementById("closeNotificationModal")
    .addEventListener("click", closeModal);

    document
    .getElementById("saveNotificationBtn")
    .addEventListener("click", saveNotification);

    document
    .getElementById("searchNotification")
    .addEventListener("keyup", filterNotifications);

    document
    .getElementById("typeFilter")
    .addEventListener("change", filterNotifications);

}

/* ==========================================
   STORAGE
========================================== */

function getNotifications(){

    return JSON.parse(

        localStorage.getItem("notifications")

    ) || [];

}

function saveNotifications(notifications){

    localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

    );

}

/* ==========================================
   LOAD
========================================== */

function loadNotifications(){

    const notifications = getNotifications();

    const table =

        document.getElementById(

            "notificationTable"

        );

    table.innerHTML = "";

    document.getElementById(

        "notificationCount"

    ).textContent = notifications.length;

    if(notifications.length===0){

        table.innerHTML =

        `<tr>

            <td colspan="6" class="empty-row">

                No Notifications

            </td>

        </tr>`;

        return;

    }

    notifications
    .slice()
    .reverse()
    .forEach(notification=>{

        table.innerHTML +=

        `<tr>

            <td>${notification.title}</td>

            <td>${notification.message}</td>

            <td>${notification.type}</td>

            <td>${notification.date}</td>

            <td>

                <span class="badge ${notification.read ? 'read':'unread'}">

                    ${notification.read ? 'Read':'Unread'}

                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                    class="view-btn"
                    onclick="viewNotification('${notification.id}')">

                    <i class="fa-solid fa-eye"></i>

                    </button>

                    <button
                    class="edit-btn"
                    onclick="editNotification('${notification.id}')">

                    <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteNotification('${notification.id}')">

                    <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        </tr>`;

    });

}

/* ==========================================
   SAVE
========================================== */

function saveNotification(){

    const title =

        document.getElementById(

            "notificationTitle"

        ).value.trim();

    const message =

        document.getElementById(

            "notificationMessage"

        ).value.trim();

    const type =

        document.getElementById(

            "notificationType"

        ).value;

    if(!title || !message){

        showToast(

            "Fill all fields.",

            "error"

        );

        return;

    }

    const notifications = getNotifications();

    notifications.push({

        id:Date.now().toString(),

        title,

        message,

        type,

        date:new Date().toLocaleDateString(),

        read:false

    });

    saveNotifications(notifications);

    clearForm();

    closeModal();

    loadNotifications();

    showToast(

        "Notification Created",

        "success"

    );

}

/* ==========================================
   SEARCH
========================================== */

function filterNotifications(){

    const keyword =

        document
        .getElementById("searchNotification")
        .value
        .toLowerCase();

    const type =

        document
        .getElementById("typeFilter")
        .value
        .toLowerCase();

    const rows =

        document.querySelectorAll(

            "#notificationTable tr"

        );

    rows.forEach(row=>{

        const text =

            row.innerText.toLowerCase();

        const searchMatch =

            text.includes(keyword);

        const typeMatch =

            type==="all"

            ||

            text.includes(type);

        row.style.display =

            searchMatch && typeMatch

            ? ""

            : "none";

    });

}

/* ==========================================
   VIEW
========================================== */

function viewNotification(id){

    const notifications = getNotifications();

    const notification = notifications.find(

        n=>n.id===id

    );

    if(!notification) return;

    notification.read = true;

    saveNotifications(notifications);

    loadNotifications();

    alert(

`Title

${notification.title}

-------------------------

${notification.message}

-------------------------

Type : ${notification.type}

Date : ${notification.date}`

    );

}

/* ==========================================
   EDIT
========================================== */

function editNotification(id){

    showToast(

        "Edit Notification will be implemented in the next phase.",

        "info"

    );

}

/* ==========================================
   DELETE
========================================== */

function deleteNotification(id){

    if(

        !confirm(

            "Delete this notification?"

        )

    ){

        return;

    }

    const notifications =

        getNotifications().filter(

            n=>n.id!==id

        );

    saveNotifications(notifications);

    loadNotifications();

    showToast(

        "Notification Deleted",

        "success"

    );

}

/* ==========================================
   MODAL
========================================== */

function openModal(){

    document.getElementById(

        "notificationModal"

    ).style.display="flex";

}

function closeModal(){

    document.getElementById(

        "notificationModal"

    ).style.display="none";

}

/* ==========================================
   CLEAR FORM
========================================== */

function clearForm(){

    document.getElementById(

        "notificationTitle"

    ).value="";

    document.getElementById(

        "notificationMessage"

    ).value="";

    document.getElementById(

        "notificationType"

    ).selectedIndex=0;

}

/* ==========================================
   ADMIN LOGIN
========================================== */

function checkAdminLogin(){

    const admin = JSON.parse(

        sessionStorage.getItem(

            "adminUser"

        )

    );

    if(!admin){

        window.location.href="login.html";

    }

}