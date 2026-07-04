/* ==========================================
   PlaceMentor AI
   Profile Module
   Part 1
   Globals + Initialization + Load Profile
========================================== */

"use strict";

/* ==========================================
   GLOBAL VARIABLES
========================================== */

let student = null;

let isEditing = false;

let uploadedProfileImage = "";

let uploadedResume = "";

/* ==========================================
   API
========================================== */

const PROFILE_API =
    API.BASE_URL + API.STUDENT.PROFILE;

/* ==========================================
   DOM ELEMENTS
========================================== */

// Header

const studentName =
    document.getElementById("studentName");

const studentRole =
    document.getElementById("studentRole");

const studentCollegeHeader =
    document.getElementById("studentCollegeHeader");

// Completion

const completionFill =
    document.getElementById("completionFill");

const completionPercent =
    document.getElementById("completionPercent");

const completionMessage =
    document.getElementById("completionMessage");

// Image

const profileImage =
    document.getElementById("profileImage");

const photoInput =
    document.getElementById("photoInput");

const changePhotoBtn =
    document.getElementById("changePhotoBtn");

// Resume

const resumeInput =
    document.getElementById("resumeInput");

const uploadResumeBtn =
    document.getElementById("uploadResumeBtn");

const previewResumeBtn =
    document.getElementById("previewResumeBtn");

const resumeName =
    document.getElementById("resumeName");

// Buttons

const saveProfileBtn =
    document.getElementById("saveProfileBtn");

const resetProfileBtn =
    document.getElementById("resetProfileBtn");

// Form Fields

const firstName =
    document.getElementById("firstName");

const lastName =
    document.getElementById("lastName");

const studentId =
    document.getElementById("studentId");

const studentEmail =
    document.getElementById("studentEmail");

const mobile =
    document.getElementById("mobile");

const gender =
    document.getElementById("gender");

const dateOfBirth =
    document.getElementById("dateOfBirth");

const address =
    document.getElementById("address");

const city =
    document.getElementById("city");

const state =
    document.getElementById("state");

const country =
    document.getElementById("country");

const college =
    document.getElementById("college");

const department =
    document.getElementById("department");

const yearOfStudy =
    document.getElementById("yearOfStudy");

const skills =
    document.getElementById("skills");

const about =
    document.getElementById("about");

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeProfile

);

/* ==========================================
   INITIALIZE PROFILE
========================================== */

async function initializeProfile() {

    if (!getToken()) {

        showToast(

            "Please login first.",

            "warning"

        );

        window.location.href =

            "login.html";

        return;

    }

    disableEditing();

    registerEvents();

    await loadProfile();

}

/* ==========================================
   LOAD PROFILE
========================================== */

async function loadProfile() {

    try {

        const response = await fetch(

            PROFILE_API,

            {

                method: "GET",

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error(

                "Unable to load profile."

            );

        }

        student = await response.json();

        uploadedProfileImage =
            student.profileImage || "";

        uploadedResume =
            student.resumeFile || "";

        populateProfile();

        await loadProfileCompletion();

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to load profile.",

            "error"

        );

    }

}

/* ==========================================
   POPULATE PROFILE
========================================== */

function populateProfile() {

    /* ==========================
       HEADER
    ========================== */

    studentName.textContent =

        `${student.firstName || ""} ${student.lastName || ""}`

            .trim() || "Student";

    studentRole.textContent =

        student.department || "Student";

    studentCollegeHeader.textContent =

        student.college || "College";

    /* ==========================
       PERSONAL
    ========================== */

    firstName.value =
        student.firstName || "";

    lastName.value =
        student.lastName || "";

    studentId.value =
        student.studentId || "";

    studentEmail.value =
        student.email || "";

    mobile.value =
        student.mobile || "";

    gender.value =
        student.gender || "";

    dateOfBirth.value =
        student.dateOfBirth || "";

    /* ==========================
       ADDRESS
    ========================== */

    address.value =
        student.address || "";

    city.value =
        student.city || "";

    state.value =
        student.state || "";

    country.value =
        student.country || "";

    /* ==========================
       EDUCATION
    ========================== */

    college.value =
        student.college || "";

    department.value =
        student.department || "";

    yearOfStudy.value =
        student.yearOfStudy || "";

    /* ==========================
       PROFESSIONAL
    ========================== */

    skills.value =
        student.skills || "";

    about.value =
        student.about || "";

    /* ==========================
       PROFILE IMAGE
    ========================== */

    if (uploadedProfileImage) {

        profileImage.src =

            "http://localhost:8080/uploads/profiles/"

            +

            uploadedProfileImage

            +

            "?t="

            +

            Date.now();

    }

    else {

        profileImage.src =

            "images/default-profile.png";

    }

    /* ==========================
       RESUME
    ========================== */

    resumeName.textContent =

        uploadedResume ||

        "No Resume Uploaded";

}
/* ==========================================
   PlaceMentor AI
   Profile Module
   Part 2
   Edit Mode + Events + Save Profile
========================================== */

/* ==========================================
   REGISTER EVENTS
========================================== */

function registerEvents() {

    /* ==========================
       EDIT / SAVE BUTTON
    ========================== */

    saveProfileBtn.addEventListener(

        "click",

        async () => {

            if (!isEditing) {

                enableEditing();

                return;

            }

            await saveProfile();

        }

    );

    /* ==========================
       RESET / CANCEL BUTTON
    ========================== */

    resetProfileBtn.addEventListener(

        "click",

        () => {

            if (isEditing) {

                if (

                    confirm(

                        "Discard all unsaved changes?"

                    )

                ) {

                    populateProfile();

                    disableEditing();

                }

            }

            else {

                populateProfile();

            }

        }

    );

}

/* ==========================================
   ENABLE EDIT MODE
========================================== */

function enableEditing() {

    isEditing = true;

    toggleFields(false);

    saveProfileBtn.innerHTML =

        `<i class="fa-solid fa-floppy-disk"></i>

        Save Profile`;

    resetProfileBtn.innerHTML =

        `<i class="fa-solid fa-xmark"></i>

        Cancel`;

    changePhotoBtn.disabled = false;

    uploadResumeBtn.disabled = false;

}

/* ==========================================
   DISABLE EDIT MODE
========================================== */

function disableEditing() {

    isEditing = false;

    toggleFields(true);

    saveProfileBtn.innerHTML =

        `<i class="fa-solid fa-pen"></i>

        Edit Profile`;

    resetProfileBtn.innerHTML =

        `<i class="fa-solid fa-rotate-left"></i>

        Reset`;

    changePhotoBtn.disabled = true;

    uploadResumeBtn.disabled = true;

}

/* ==========================================
   TOGGLE INPUTS
========================================== */

function toggleFields(readonly) {

    const fields = [

        firstName,

        lastName,

        mobile,

        gender,

        dateOfBirth,

        address,

        city,

        state,

        country,

        college,

        department,

        yearOfStudy,

        skills,

        about

    ];

    fields.forEach(field => {

        if (

            field.tagName === "SELECT"

        ) {

            field.disabled = readonly;

        }

        else {

            field.readOnly = readonly;

        }

    });

}

/* ==========================================
   SAVE PROFILE
========================================== */

async function saveProfile() {

    const profileData = {

        firstName:

            firstName.value.trim(),

        lastName:

            lastName.value.trim(),

        mobile:

            mobile.value.trim(),

        gender:

            gender.value,

        dateOfBirth:

            dateOfBirth.value,

        address:

            address.value.trim(),

        city:

            city.value.trim(),

        state:

            state.value.trim(),

        country:

            country.value.trim(),

        college:

            college.value.trim(),

        department:

            department.value.trim(),

        yearOfStudy:

            yearOfStudy.value,

        skills:

            skills.value.trim(),

        about:

            about.value.trim(),

        profileImage:

            uploadedProfileImage,

        resumeFile:

            uploadedResume

    };

    /* ==========================
       BASIC VALIDATION
    ========================== */

    if (

        profileData.firstName === ""

    ) {

        showToast(

            "First Name is required.",

            "warning"

        );

        firstName.focus();

        return;

    }

    if (

        profileData.college === ""

    ) {

        showToast(

            "College is required.",

            "warning"

        );

        college.focus();

        return;

    }

    if (

        profileData.department === ""

    ) {

        showToast(

            "Department is required.",

            "warning"

        );

        department.focus();

        return;

    }

    try {

        const response = await fetch(

            PROFILE_API,

            {

                method: "PUT",

                headers: getHeaders(),

                body: JSON.stringify(

                    profileData

                )

            }

        );

        const data =

            await response.json();

        if (!response.ok) {

            showToast(

                data.message ||

                "Unable to save profile.",

                "error"

            );

            return;

        }

        showToast(

            "Profile updated successfully.",

            "success"

        );

        student = data;

        populateProfile();

        await loadProfileCompletion();

        disableEditing();

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to connect to server.",

            "error"

        );

    }

}
/* ==========================================
   PlaceMentor AI
   Profile Module
   Part 3
   Image Upload + Resume Upload + Preview
========================================== */

/* ==========================================
   IMAGE / RESUME EVENTS
========================================== */

changePhotoBtn.addEventListener("click", () => {

    if (!isEditing) return;

    photoInput.click();

});

photoInput.addEventListener(

    "change",

    uploadProfileImage

);

uploadResumeBtn.addEventListener(

    "click",

    () => {

        if (!isEditing) return;

        resumeInput.click();

    }

);

resumeInput.addEventListener(

    "change",

    uploadResume

);

previewResumeBtn.addEventListener(

    "click",

    previewResume

);

/* ==========================================
   UPLOAD PROFILE IMAGE
========================================== */

async function uploadProfileImage(event) {

    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append(

        "file",

        file

    );

    try {

        const response = await fetch(

            API.BASE_URL +

            "/student/profile-image",

            {

                method: "POST",

                headers: {

                    Authorization:

                        "Bearer " +

                        getToken()

                },

                body: formData

            }

        );

        if (!response.ok) {

            throw new Error();

        }

        const data = await response.json();

        uploadedProfileImage =

            data.filename;

        profileImage.src =

            data.url +

            "?t=" +

            Date.now();

        showToast(

            "Profile photo uploaded.",

            "success"

        );

        await loadProfileCompletion();

    }

    catch (error) {

        console.error(error);

        showToast(

            "Unable to upload image.",

            "error"

        );

    }

}

/* ==========================================
   UPLOAD RESUME
========================================== */

async function uploadResume(event) {

    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append(

        "file",

        file

    );

    try {

        const response = await fetch(

            API.BASE_URL +

            "/student/resume",

            {

                method: "POST",

                headers: {

                    Authorization:

                        "Bearer " +

                        getToken()

                },

                body: formData

            }

        );

        if (!response.ok) {

            throw new Error();

        }

        const data = await response.json();

        uploadedResume =

            data.filename;

        resumeName.textContent =

            data.filename;

        showToast(

            "Resume uploaded.",

            "success"

        );

        await loadProfileCompletion();

    }

    catch (error) {

        console.error(error);

        showToast(

            "Resume upload failed.",

            "error"

        );

    }

}

/* ==========================================
   PREVIEW RESUME
========================================== */

function previewResume() {

    if (!uploadedResume) {

        showToast(

            "No resume uploaded.",

            "warning"

        );

        return;

    }

    window.open(

        "http://localhost:8080/uploads/resumes/" +

        uploadedResume,

        "_blank"

    );

}

/* ==========================================
   RESET PROFILE
========================================== */

function resetProfile() {

    populateProfile();

    showToast(

        "Changes discarded.",

        "info"

    );

}

resetProfileBtn.addEventListener(

    "click",

    () => {

        if (!isEditing) {

            resetProfile();

            return;

        }

        if (

            confirm(

                "Discard all changes?"

            )

        ) {

            resetProfile();

            disableEditing();

        }

    }

);
/* ==========================================
   PlaceMentor AI
   Profile Module
   Part 4
   Profile Completion + Utilities
========================================== */

/* ==========================================
   LOAD PROFILE COMPLETION
========================================== */

async function loadProfileCompletion() {

    try {

        const response = await fetch(

            API.BASE_URL +

            "/profile/completion",

            {

                headers: getHeaders()

            }

        );

        if (!response.ok) {

            throw new Error();

        }

        const completion =

            await response.json();

        updateCompletionUI(completion);

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================
   UPDATE COMPLETION UI
========================================== */

function updateCompletionUI(completion) {

    completionPercent.textContent =

        completion.percentage + "%";

    completionFill.style.width =

        completion.percentage + "%";

    completionFill.style.background =

        getCompletionColor(

            completion.percentage

        );

    if (

        completion.percentage >= 100

    ) {

        completionMessage.textContent =

            "🎉 Your profile is complete.";

    }

    else if (

        completion.percentage >= 80

    ) {

        completionMessage.textContent =

            "Almost done! Complete the remaining fields.";

    }

    else if (

        completion.percentage >= 50

    ) {

        completionMessage.textContent =

            "Your profile looks good. Add more details.";

    }

    else {

        completionMessage.textContent =

            "Complete your profile to unlock all features.";

    }

}

/* ==========================================
   COMPLETION COLOR
========================================== */

function getCompletionColor(percent) {

    if (percent >= 90)

        return "#16a34a";

    if (percent >= 70)

        return "#22c55e";

    if (percent >= 50)

        return "#f59e0b";

    return "#ef4444";

}

/* ==========================================
   GET AUTH HEADERS
========================================== */

function getHeaders() {

    return {

        "Content-Type":

            "application/json",

        "Authorization":

            "Bearer " +

            getToken()

    };

}

/* ==========================================
   LOGOUT
========================================== */

function logout() {

    clearCurrentUser();

    clearRememberUser();

    window.location.href =

        "login.html";

}

/* ==========================================
   WINDOW BEFORE UNLOAD
========================================== */

window.addEventListener(

    "beforeunload",

    function (event) {

        if (!isEditing) {

            return;

        }

        event.preventDefault();

        event.returnValue = "";

    }

);

/* ==========================================
   ESC CANCEL EDIT
========================================== */

document.addEventListener(

    "keydown",

    function (event) {

        if (

            event.key === "Escape" &&

            isEditing

        ) {

            if (

                confirm(

                    "Discard changes?"

                )

            ) {

                populateProfile();

                disableEditing();

            }

        }

    }

);

/* ==========================================
   ENTER KEY SAVE
========================================== */

document.addEventListener(

    "keydown",

    async function (event) {

        if (

            event.ctrlKey &&

            event.key === "s"

        ) {

            event.preventDefault();

            if (isEditing) {

                await saveProfile();

            }

        }

    }

);

/* ==========================================
   IMAGE FALLBACK
========================================== */

profileImage.onerror = function () {

    profileImage.src =

        "images/default-profile.png";

};

/* ==========================================
   SUCCESS
========================================== */

console.log(

    "%cPlaceMentor AI Profile Loaded",

    "color:#2563EB;font-size:16px;font-weight:bold"

);