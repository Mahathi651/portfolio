/* =========================================================
   MAHATHI PANGULURI — PORTFOLIO
   Vanilla JavaScript
========================================================= */


/* ================= ELEMENTS ================= */

const loader = document.getElementById("loader");
const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const revealElements = document.querySelectorAll(".reveal");

const backToTop = document.getElementById("backToTop");

const contactForm = document.getElementById("contactForm");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const currentYear = document.getElementById("currentYear");


/* ================= PAGE LOADER ================= */

window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 650);

});


/* ================= CURRENT YEAR ================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ================= MOBILE MENU ================= */

function closeMenu() {

    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");

}


function openMenu() {

    navMenu.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");

}


menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.contains("open");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

});


navLinks.forEach((link) => {

    link.addEventListener("click", () => {
        closeMenu();
    });

});


/* ================= HEADER SCROLL ================= */

function handleHeader() {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}


window.addEventListener("scroll", handleHeader, {
    passive: true
});

handleHeader();


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("main section[id]");


function updateActiveNav() {

    const scrollPosition = window.scrollY + 180;

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }

    });


    navLinks.forEach((link) => {

        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${currentSection}`
        );

    });

}


window.addEventListener("scroll", updateActiveNav, {
    passive: true
});

updateActiveNav();


/* ================= SCROLL REVEAL ================= */

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);


revealElements.forEach((element) => {

    observer.observe(element);

});


/* ================= BACK TO TOP ================= */

function updateBackToTop() {

    if (window.scrollY > 700) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener("scroll", updateBackToTop, {
    passive: true
});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= TOAST ================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


/* ================= FORM HELPERS ================= */

function setError(input, errorElement, message) {

    const parent = input.closest(".form-group");

    parent.classList.add("invalid");

    errorElement.textContent = message;

}


function clearError(input, errorElement) {

    const parent = input.closest(".form-group");

    parent.classList.remove("invalid");

    errorElement.textContent = "";

}


/* ================= EMAIL VALIDATION ================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* ================= CONTACT FORM ================= */

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");


    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();


    let valid = true;


    /* NAME */

    if (name.length < 2) {

        setError(
            nameInput,
            nameError,
            "Please enter your name."
        );

        valid = false;

    } else {

        clearError(nameInput, nameError);

    }


    /* EMAIL */

    if (!isValidEmail(email)) {

        setError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );

        valid = false;

    } else {

        clearError(emailInput, emailError);

    }


    /* MESSAGE */

    if (message.length < 10) {

        setError(
            messageInput,
            messageError,
            "Please enter at least 10 characters."
        );

        valid = false;

    } else {

        clearError(messageInput, messageError);

    }


    if (!valid) {

        showToast("Please correct the highlighted fields.");

        return;

    }


    /*
        This is a static portfolio, so there is no backend.
        Instead, the visitor's email client opens with the
        validated message.
    */

    const recipient = "vu.241fa04651@gmail.com";

    const subject = encodeURIComponent(
        `Portfolio Contact — ${name}`
    );

    const body = encodeURIComponent(
        `Hello Mahathi,\n\n` +
        `${message}\n\n` +
        `From: ${name}\n` +
        `Email: ${email}`
    );


    const mailtoURL =
        `mailto:${recipient}?subject=${subject}&body=${body}`;


    window.location.href = mailtoURL;


    showToast(
        "Opening your email client..."
    );


    contactForm.reset();

});


/* ================= INPUT CLEANUP ================= */

const formInputs = contactForm.querySelectorAll(
    "input, textarea"
);


formInputs.forEach((input) => {

    input.addEventListener("input", () => {

        const parent = input.closest(".form-group");

        if (parent) {
            parent.classList.remove("invalid");
        }

    });

});


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (navMenu.classList.contains("open")) {
            closeMenu();
        }

    }

});


/* ================= CLOSE MENU ON RESIZE ================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 760) {
        closeMenu();
    }

});


/* ================= SMOOTH ANCHOR FALLBACK ================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            targetId === "#" ||
            targetId.length <= 1
        ) {
            return;
        }


        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }


        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ================= PROJECT LINK SAFETY ================= */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach((link) => {

    link.addEventListener("click", () => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

});


/* ================= INITIAL STATE ================= */

updateBackToTop();