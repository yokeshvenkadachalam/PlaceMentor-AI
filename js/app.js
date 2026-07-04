/*==================================================
            PlaceMentor AI
            Landing Page
            Part 1 - Foundation
==================================================*/

/*==================================================
                SELECT ELEMENTS
==================================================*/

const body =
    document.body;

const navbar =
    document.querySelector(".navbar");

const themeButton =
    document.getElementById("theme-btn");

const scrollTopButton =
    document.getElementById("scrollTop");

const navLinks =
    document.querySelectorAll(".nav-links a");


/*==================================================
                THEME MANAGER
==================================================*/

const THEME_KEY =
    "placementor-theme";


/*==================================================
                GET THEME
==================================================*/

function getTheme() {

    return localStorage.getItem(THEME_KEY)
        || "light";

}


/*==================================================
                SAVE THEME
==================================================*/

function saveTheme(theme) {

    localStorage.setItem(

        THEME_KEY,

        theme

    );

}


/*==================================================
                APPLY THEME
==================================================*/

function applyTheme(theme) {

    if (theme === "dark") {

        body.classList.add(

            "dark-mode"

        );

        if (themeButton) {

            themeButton.innerHTML =

                '<i class="fa-solid fa-sun"></i>';

        }

    }

    else {

        body.classList.remove(

            "dark-mode"

        );

        if (themeButton) {

            themeButton.innerHTML =

                '<i class="fa-solid fa-moon"></i>';

        }

    }

}


/*==================================================
                TOGGLE THEME
==================================================*/

function toggleTheme() {

    const darkMode =

        body.classList.contains(

            "dark-mode"

        );

    const theme =

        darkMode

            ? "light"

            : "dark";

    applyTheme(theme);

    saveTheme(theme);

}


/*==================================================
            RESTORE SAVED THEME
==================================================*/

function restoreTheme() {

    applyTheme(

        getTheme()

    );

}


/*==================================================
                SMOOTH SCROLL
==================================================*/

function initializeSmoothScroll() {

    navLinks.forEach(link => {

        link.addEventListener(

            "click",

            function (event) {

                const href =

                    this.getAttribute("href");

                if (

                    !href ||

                    !href.startsWith("#")

                ) {

                    return;

                }

                event.preventDefault();

                const target =

                    document.querySelector(href);

                if (target) {

                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }

        );

    });

}


/*==================================================
            ACTIVE NAV LINK
==================================================*/

function updateActiveLink() {

    const sections =

        document.querySelectorAll("section");

    let current = "";

    sections.forEach(section => {

        const top =

            section.offsetTop - 120;

        if (

            window.scrollY >= top

        ) {

            current =

                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove(

            "active"

        );

        if (

            link.getAttribute("href") ===

            "#" + current

        ) {

            link.classList.add(

                "active"

            );

        }

    });

}


/*==================================================
            STICKY NAVBAR
==================================================*/

function updateNavbar() {

    if (

        window.scrollY > 50

    ) {

        navbar?.classList.add(

            "scrolled"

        );

    }

    else {

        navbar?.classList.remove(

            "scrolled"

        );

    }

}


/*==================================================
            SCROLL TO TOP
==================================================*/

function updateScrollButton() {

    if (

        window.scrollY > 400

    ) {

        scrollTopButton?.classList.add(

            "show"

        );

    }

    else {

        scrollTopButton?.classList.remove(

            "show"

        );

    }

}


/*==================================================
            SCROLL TOP CLICK
==================================================*/

function initializeScrollTop() {

    if (!scrollTopButton) {

        return;

    }

    scrollTopButton.addEventListener(

        "click",

        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    );

}


/*==================================================
            WINDOW SCROLL
==================================================*/

window.addEventListener(

    "scroll",

    () => {

        updateNavbar();

        updateScrollButton();

        updateActiveLink();

    }

);


/*==================================================
            THEME BUTTON
==================================================*/

if (themeButton) {

    themeButton.addEventListener(

        "click",

        toggleTheme

    );

}


/*==================================================
            COMMON UTILITIES
==================================================*/

function $(selector) {

    return document.querySelector(

        selector

    );

}

function $$(selector) {

    return document.querySelectorAll(

        selector

    );

}


/*==================================================
            INITIALIZE
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        restoreTheme();

        initializeSmoothScroll();

        initializeScrollTop();

        updateNavbar();

        updateScrollButton();

        updateActiveLink();

    }

);
/*==================================================
            PlaceMentor AI
            Part 2 - Navigation
==================================================*/


/*==================================================
                SELECT ELEMENTS
==================================================*/

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.querySelector(".nav-links");


/*==================================================
                OPEN / CLOSE MENU
==================================================*/

function toggleMenu() {

    if (!navMenu) {

        return;

    }

    navMenu.classList.toggle("active");

}


/*==================================================
                CLOSE MENU
==================================================*/

function closeMenu() {

    if (!navMenu) {

        return;

    }

    navMenu.classList.remove("active");

}


/*==================================================
            MENU BUTTON CLICK
==================================================*/

if (menuToggle) {

    menuToggle.addEventListener(

        "click",

        function (event) {

            event.stopPropagation();

            toggleMenu();

        }

    );

}


/*==================================================
        CLOSE MENU AFTER LINK CLICK
==================================================*/

if (navMenu) {

    navMenu

        .querySelectorAll("a")

        .forEach(link => {

            link.addEventListener(

                "click",

                () => {

                    closeMenu();

                }

            );

        });

}


/*==================================================
        CLICK OUTSIDE MENU
==================================================*/

document.addEventListener(

    "click",

    function (event) {

        if (

            !navMenu ||

            !menuToggle

        ) {

            return;

        }

        if (

            !navMenu.contains(event.target) &&

            !menuToggle.contains(event.target)

        ) {

            closeMenu();

        }

    }

);


/*==================================================
            ESC KEY CLOSE
==================================================*/

document.addEventListener(

    "keydown",

    function (event) {

        if (

            event.key === "Escape"

        ) {

            closeMenu();

        }

    }

);


/*==================================================
        WINDOW RESIZE
==================================================*/

window.addEventListener(

    "resize",

    function () {

        if (

            window.innerWidth > 768

        ) {

            closeMenu();

        }

    }

);


/*==================================================
            NAVBAR LINK HIGHLIGHT
==================================================*/

function setActiveNavLink(currentLink) {

    if (!navMenu) {

        return;

    }

    navMenu

        .querySelectorAll("a")

        .forEach(link => {

            link.classList.remove("active");

        });

    currentLink.classList.add("active");

}


/*==================================================
        ACTIVE LINK CLICK
==================================================*/

if (navMenu) {

    navMenu

        .querySelectorAll("a")

        .forEach(link => {

            link.addEventListener(

                "click",

                function () {

                    setActiveNavLink(this);

                }

            );

        });

}


/*==================================================
            SCROLL ACTIVE LINK
==================================================*/

function updateNavigationOnScroll() {

    const sections =

        document.querySelectorAll("section[id]");

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =

            section.offsetTop - 120;

        if (

            window.scrollY >= sectionTop

        ) {

            currentSection =

                section.getAttribute("id");

        }

    });

    if (!navMenu) {

        return;

    }

    navMenu

        .querySelectorAll("a")

        .forEach(link => {

            link.classList.remove("active");

            if (

                link.getAttribute("href") ===

                "#" + currentSection

            ) {

                link.classList.add("active");

            }

        });

}


/*==================================================
        WINDOW SCROLL EVENT
==================================================*/

window.addEventListener(

    "scroll",

    updateNavigationOnScroll

);


/*==================================================
        INITIALIZE NAVIGATION
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        updateNavigationOnScroll();

    }

);
/*==================================================
            PlaceMentor AI
            Part 3 - Animations
==================================================*/


/*==================================================
                ANIMATION SETTINGS
==================================================*/

const OBSERVER_OPTIONS = {

    threshold: 0.15,

    rootMargin: "0px 0px -80px 0px"

};


/*==================================================
            REVEAL ON SCROLL
==================================================*/

function initializeRevealAnimations() {

    const elements = document.querySelectorAll(

        ".feature-card, " +

        ".roadmap-card, " +

        ".category-card, " +

        ".highlight-card, " +

        ".preview-card, " +

        ".about-box, " +

        ".contact-card"

    );

    elements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform = "translateY(50px)";

        element.style.transition =

            "all .8s ease";

    });

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =

                        "translateY(0)";

                    observer.unobserve(

                        entry.target

                    );

                }

            });

        },

        OBSERVER_OPTIONS

    );

    elements.forEach(element => {

        observer.observe(element);

    });

}


/*==================================================
            STAGGER ANIMATION
==================================================*/

function staggerCards(selector) {

    const cards =

        document.querySelectorAll(selector);

    cards.forEach((card, index) => {

        card.style.transitionDelay =

            `${index * 120}ms`;

    });

}


/*==================================================
            COUNTER ANIMATION
==================================================*/

function animateCounter(element) {

    const target =

        parseInt(

            element.dataset.count

        );

    if (isNaN(target)) {

        return;

    }

    let current = 0;

    const speed =

        Math.max(

            10,

            Math.ceil(target / 80)

        );

    function update() {

        current += speed;

        if (current >= target) {

            current = target;

        }

        element.textContent = current;

        if (current < target) {

            requestAnimationFrame(update);

        }

    }

    update();

}


/*==================================================
        INITIALIZE COUNTERS
==================================================*/

function initializeCounters() {

    const counters =

        document.querySelectorAll(

            "[data-count]"

        );

    const observer =

        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(

                            entry.target

                        );

                        observer.unobserve(

                            entry.target

                        );

                    }

                });

            },

            OBSERVER_OPTIONS

        );

    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/*==================================================
            FLOATING HERO IMAGE
==================================================*/

function initializeHeroFloat() {

    const heroImage =

        document.querySelector(

            ".hero-image img"

        );

    if (!heroImage) {

        return;

    }

    heroImage.style.animation =

        "float 5s ease-in-out infinite";

}


/*==================================================
        HERO PARALLAX EFFECT
==================================================*/

function initializeParallax() {

    const heroImage =

        document.querySelector(

            ".hero-image img"

        );

    if (!heroImage) {

        return;

    }

    window.addEventListener(

        "scroll",

        () => {

            const y =

                window.scrollY * 0.08;

            heroImage.style.transform =

                `translateY(${y}px)`;

        }

    );

}


/*==================================================
        BUTTON RIPPLE EFFECT
==================================================*/

function initializeRippleButtons() {

    document

        .querySelectorAll(

            ".primary-btn,.secondary-btn"

        )

        .forEach(button => {

            button.addEventListener(

                "click",

                function (event) {

                    const ripple =

                        document.createElement(

                            "span"

                        );

                    const rect =

                        this.getBoundingClientRect();

                    const size =

                        Math.max(

                            rect.width,

                            rect.height

                        );

                    ripple.style.width =

                        ripple.style.height =

                        size + "px";

                    ripple.style.left =

                        event.clientX -

                        rect.left -

                        size / 2 +

                        "px";

                    ripple.style.top =

                        event.clientY -

                        rect.top -

                        size / 2 +

                        "px";

                    ripple.className =

                        "ripple";

                    this.appendChild(

                        ripple

                    );

                    setTimeout(() => {

                        ripple.remove();

                    }, 600);

                }

            );

        });

}


/*==================================================
        HOVER LIFT EFFECT
==================================================*/

function initializeHoverCards() {

    document

        .querySelectorAll(

            ".feature-card,.roadmap-card,.category-card,.highlight-card,.preview-card"

        )

        .forEach(card => {

            card.addEventListener(

                "mouseenter",

                () => {

                    card.style.willChange =

                        "transform";

                }

            );

            card.addEventListener(

                "mouseleave",

                () => {

                    card.style.willChange =

                        "auto";

                }

            );

        });

}


/*==================================================
            INITIALIZE
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeRevealAnimations();

        initializeCounters();

        initializeHeroFloat();

        initializeParallax();

        initializeRippleButtons();

        initializeHoverCards();

        staggerCards(".feature-card");

        staggerCards(".roadmap-card");

        staggerCards(".category-card");

        staggerCards(".highlight-card");

        staggerCards(".preview-card");

    }

);

/*==================================================
        PlaceMentor AI
        Part 4 - Interactive Components
        Final Initialization
==================================================*/


/*==================================================
            LOADING SCREEN
==================================================*/

function hideLoader() {

    const loader =

        document.getElementById(

            "loader"

        );

    if (!loader) {

        return;

    }

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.remove();

    }, 500);

}


/*==================================================
            MOUSE GLOW EFFECT
==================================================*/

function initializeMouseGlow() {

    const glow =

        document.createElement("div");

    glow.className =

        "mouse-glow";

    document.body.appendChild(glow);

    document.addEventListener(

        "mousemove",

        event => {

            glow.style.left =

                event.clientX + "px";

            glow.style.top =

                event.clientY + "px";

        }

    );

}


/*==================================================
            BUTTON PRESS EFFECT
==================================================*/

function initializeButtons() {

    document

        .querySelectorAll("button,a")

        .forEach(element => {

            element.addEventListener(

                "mousedown",

                () => {

                    element.style.transform +=

                        " scale(.96)";

                }

            );

            element.addEventListener(

                "mouseup",

                () => {

                    element.style.transform =

                        "";

                }

            );

            element.addEventListener(

                "mouseleave",

                () => {

                    element.style.transform =

                        "";

                }

            );

        });

}


/*==================================================
            IMAGE LAZY FADE
==================================================*/

function initializeImages() {

    document

        .querySelectorAll("img")

        .forEach(image => {

            image.onload = () => {

                image.style.opacity = "1";

            };

        });

}


/*==================================================
            SECTION PARALLAX
==================================================*/

function initializeSectionParallax() {

    const hero =

        document.querySelector(

            ".hero"

        );

    if (!hero) {

        return;

    }

    window.addEventListener(

        "scroll",

        () => {

            hero.style.backgroundPositionY =

                -(window.scrollY * .15) +

                "px";

        }

    );

}


/*==================================================
            PERFORMANCE
==================================================*/

function optimizePerformance() {

    let ticking = false;

    window.addEventListener(

        "scroll",

        () => {

            if (!ticking) {

                requestAnimationFrame(() => {

                    updateNavbar();

                    updateScrollButton();

                    updateActiveLink();

                    ticking = false;

                });

                ticking = true;

            }

        }

    );

}


/*==================================================
            PAGE VISIBILITY
==================================================*/

document.addEventListener(

    "visibilitychange",

    () => {

        if (

            document.hidden

        ) {

            console.log(

                "Page Hidden"

            );

        }

        else {

            console.log(

                "Welcome Back"

            );

        }

    }

);


/*==================================================
            WINDOW RESIZE
==================================================*/

window.addEventListener(

    "resize",

    () => {

        updateNavbar();

        updateScrollButton();

    }

);


/*==================================================
            GLOBAL ERROR
==================================================*/

window.addEventListener(

    "error",

    event => {

        console.error(

            "Application Error:",

            event.message

        );

    }

);


/*==================================================
            WELCOME MESSAGE
==================================================*/

function welcomeConsole() {

    console.clear();

    console.log(

        "%cPlaceMentor AI",

        "font-size:28px;font-weight:bold;color:#2563eb"

    );

    console.log(

        "%cPlacement Preparation Platform",

        "font-size:15px;color:#7c3aed"

    );

    console.log(

        "%cDeveloped by Yokesh V",

        "font-size:14px;color:#16a34a"

    );

}


/*==================================================
            APPLICATION START
==================================================*/

function initializeApplication() {

    restoreTheme();

    initializeSmoothScroll();

    initializeScrollTop();

    initializeRevealAnimations();

    initializeCounters();

    initializeHeroFloat();

    initializeParallax();

    initializeRippleButtons();

    initializeHoverCards();

    initializeMouseGlow();

    initializeButtons();

    initializeImages();

    initializeSectionParallax();

    optimizePerformance();

    hideLoader();

    welcomeConsole();

}


/*==================================================
            DOM READY
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeApplication();

    }

);


/*==================================================
                END OF APP.JS
==================================================*/

