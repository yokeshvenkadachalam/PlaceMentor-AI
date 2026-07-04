/* ==========================================
   PlaceMentor AI
   Admin Sidebar
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    highlightCurrentPage();

});

/* ==========================================
   ACTIVE MENU
========================================== */

function highlightCurrentPage(){

    const currentPage =

        window.location.pathname.split("/").pop();

    document.querySelectorAll("aside a").forEach(link=>{

        const href =

            link.getAttribute("href");

        if(href===currentPage){

            link.classList.add("active");

        }

    });

}

/* ==========================================
   LOGOUT
========================================== */

function logoutAdmin(){

    if(

        !confirm(

            "Are you sure you want to logout?"

        )

    ){

        return;

    }

    sessionStorage.removeItem(

        "adminUser"

    );

    localStorage.removeItem(

        "rememberAdmin"

    );

    if(typeof showToast==="function"){

        showToast(

            "Logged out successfully.",

            "success"

        );

    }

    setTimeout(()=>{

       window.location.href = "../login.html";

    },800);

}