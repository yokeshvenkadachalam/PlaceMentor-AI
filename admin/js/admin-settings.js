/* ==========================================
   PlaceMentor AI
   Admin Settings
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    checkAdminLogin();

    loadSettings();

    initializeEvents();

});

/* ==========================================
   EVENTS
========================================== */

function initializeEvents(){

    document
    .getElementById("changePhotoBtn")
    .addEventListener("click",()=>{

        document
        .getElementById("photoInput")
        .click();

    });

    document
    .getElementById("photoInput")
    .addEventListener("change",changePhoto);

    document
    .getElementById("savePasswordBtn")
    .addEventListener("click",savePassword);

    document
    .getElementById("exportDataBtn")
    .addEventListener("click",exportData);

    document
    .getElementById("importDataBtn")
    .addEventListener("click",()=>{

        document
        .getElementById("importFile")
        .click();

    });

    document
    .getElementById("importFile")
    .addEventListener("change",importData);

    document
    .getElementById("resetDataBtn")
    .addEventListener("click",resetData);

    document
    .getElementsByName("theme")
    .forEach(radio=>{

        radio.addEventListener("change",saveSettings);

    });

    document
    .getElementById("emailNotification")
    .addEventListener("change",saveSettings);

    document
    .getElementById("pushNotification")
    .addEventListener("change",saveSettings);

    document
    .getElementById("soundNotification")
    .addEventListener("change",saveSettings);

    document
    .getElementById("adminName")
    .addEventListener("input",saveSettings);

}

/* ==========================================
   LOAD SETTINGS
========================================== */

function loadSettings(){

    const admin = JSON.parse(

        sessionStorage.getItem("adminUser")

    );

    if(admin){

        document.getElementById("adminName").value =
            admin.name || "";

        document.getElementById("adminEmail").value =
            admin.email || "";

    }

    const settings = JSON.parse(

        localStorage.getItem("adminSettings")

    ) || {};

    if(settings.photo){

        document.getElementById("adminPhoto").src =
            settings.photo;

    }

    document.getElementById("adminName").value =
        settings.name || document.getElementById("adminName").value;

    document.getElementById("emailNotification").checked =
        settings.emailNotification ?? true;

    document.getElementById("pushNotification").checked =
        settings.pushNotification ?? true;

    document.getElementById("soundNotification").checked =
        settings.soundNotification ?? true;

    if(settings.theme==="dark"){

        document.body.classList.add("dark-mode");

        document.querySelector(

            "input[value='dark']"

        ).checked = true;

    }

    else{

        document.body.classList.remove("dark-mode");

        document.querySelector(

            "input[value='light']"

        ).checked = true;

    }

}

/* ==========================================
   SAVE SETTINGS
========================================== */

function saveSettings(){

    const theme =

        document.querySelector(

            "input[name='theme']:checked"

        ).value;

    if(theme==="dark"){

        document.body.classList.add("dark-mode");

    }

    else{

        document.body.classList.remove("dark-mode");

    }

    const settings = {

        name:

        document.getElementById("adminName").value,

        photo:

        document.getElementById("adminPhoto").src,

        theme,

        emailNotification:

        document.getElementById("emailNotification").checked,

        pushNotification:

        document.getElementById("pushNotification").checked,

        soundNotification:

        document.getElementById("soundNotification").checked

    };

    localStorage.setItem(

        "adminSettings",

        JSON.stringify(settings)

    );

}

/* ==========================================
   CHANGE PHOTO
========================================== */

function changePhoto(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        document.getElementById(

            "adminPhoto"

        ).src = event.target.result;

        saveSettings();

        showToast(

            "Profile photo updated.",

            "success"

        );

    };

    reader.readAsDataURL(file);

}

/* ==========================================
   CHANGE PASSWORD
========================================== */

function savePassword(){

    const pass =

        document.getElementById(

            "newPassword"

        ).value;

    const confirm =

        document.getElementById(

            "confirmPassword"

        ).value;

    if(pass.length<6){

        showToast(

            "Password must contain at least 6 characters.",

            "error"

        );

        return;

    }

    if(pass!==confirm){

        showToast(

            "Passwords do not match.",

            "error"

        );

        return;

    }

    localStorage.setItem(

        "adminPassword",

        pass

    );

    document.getElementById(

        "newPassword"

    ).value="";

    document.getElementById(

        "confirmPassword"

    ).value="";

    showToast(

        "Password updated successfully.",

        "success"

    );

}

/* ==========================================
   EXPORT DATA
========================================== */

function exportData(){

    const data = JSON.stringify(

        localStorage,

        null,

        2

    );

    const blob = new Blob(

        [data],

        {

            type:"application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "placementor-backup.json";

    a.click();

    URL.revokeObjectURL(url);

}

/* ==========================================
   IMPORT DATA
========================================== */

function importData(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        try{

            const data = JSON.parse(

                event.target.result

            );

            Object.keys(data).forEach(key=>{

                localStorage.setItem(

                    key,

                    data[key]

                );

            });

            showToast(

                "Backup restored successfully.",

                "success"

            );

            location.reload();

        }

        catch{

            showToast(

                "Invalid backup file.",

                "error"

            );

        }

    };

    reader.readAsText(file);

}

/* ==========================================
   RESET DATA
========================================== */

function resetData(){

    if(

        !confirm(

            "Delete all demo data?"

        )

    ){

        return;

    }

    localStorage.clear();

    sessionStorage.clear();

    showToast(

        "Demo data cleared.",

        "success"

    );

    setTimeout(()=>{

        window.location.href="login.html";

    },1000);

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