document.addEventListener("DOMContentLoaded", function () {
    // Query DOM elements once
    const navbar = document.querySelector(".navbar");
    const navLinksContainer = document.querySelector(".nav-links");
    const burgerMenu = document.querySelector(".burger-menu");
    const toastContainer = document.getElementById("toast-container");
    const currentYearSpan = document.getElementById("currentYear");
    const sections = document.querySelectorAll("section[id]"); // For nav highlighter

    const initialNavbarHeight = navbar ? navbar.offsetHeight : 70; // Default if navbar not found early

    // --- Initialize Footer Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Initialize Navbar Controller Modules ---
    if (navbar && navLinksContainer) {
        setupSmoothScroll(
            navbar,
            initialNavbarHeight,
            navLinksContainer,
            burgerMenu
        );
        setupNavHighlighter(
            navbar,
            initialNavbarHeight,
            navLinksContainer,
            sections
        );
    }
    if (navbar) {
        setupNavbarScrollListener(navbar);
    }
    if (burgerMenu && navLinksContainer) {
        setupBurgerMenu(burgerMenu, navLinksContainer);
    }

    // --- Initialize Scroll Animator Module ---
    setupScrollAnimations(
        ".feature-item, .menu-item, .review-item, .delivery-text, .delivery-image, .contact-details, .contact-map"
    );

    // --- Initialize Cart Handler Module ---
    // The showToast function is defined in uiHelpers.js and will be globally available
    // if uiHelpers.js is loaded before main.js
    if (typeof showToast === "function" && toastContainer) {
        setupOrderButtons(
            ".menu-item .btn-secondary",
            showToast,
            toastContainer
        );
    } else {
        console.warn(
            "showToast function or toastContainer not available for order buttons."
        );
        // Fallback if showToast is not available
        setupOrderButtons(
            ".menu-item .btn-secondary",
            (message) => console.log(message),
            null
        );
    }
});
