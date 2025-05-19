// js/modules/navbarController.js

/**
 * Sets up smooth scrolling for anchor links.
 * @param {HTMLElement} navbar - The navigation bar element.
 * @param {number} initialNavbarHeight - The initial height of the navbar.
 * @param {HTMLElement} navLinksContainer - The container for navigation links.
 * @param {HTMLElement} burgerMenu - The burger menu button.
 */
function setupSmoothScroll(
    navbar,
    initialNavbarHeight,
    navLinksContainer,
    burgerMenu
) {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                let currentNavbarHeight = initialNavbarHeight;
                if (navbar && navbar.classList.contains("scrolled")) {
                    // Recalculate if navbar height changes when scrolled
                    currentNavbarHeight = navbar.offsetHeight;
                } else if (navbar) {
                    currentNavbarHeight = navbar.offsetHeight;
                }

                let targetPosition =
                    targetElement.offsetTop - currentNavbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                // Close mobile menu if open
                if (
                    burgerMenu &&
                    navLinksContainer &&
                    burgerMenu.classList.contains("active")
                ) {
                    burgerMenu.classList.remove("active");
                    navLinksContainer.classList.remove("active");
                }
            }
        });
    });
}

/**
 * Highlights the active navigation link based on scroll position.
 * @param {HTMLElement} navbar - The navigation bar element.
 * @param {number} initialNavbarHeight - The initial height of the navbar.
 * @param {HTMLElement} navLinksContainer - The container for navigation links.
 * @param {NodeListOf<HTMLElement>} sections - A NodeList of all section elements with IDs.
 */
function setupNavHighlighter(
    navbar,
    initialNavbarHeight,
    navLinksContainer,
    sections
) {
    if (!sections.length || !navLinksContainer) return;

    function highlight() {
        let scrollY = window.pageYOffset;
        let currentSectionId = "";
        let currentNavbarHeight = navbar
            ? navbar.offsetHeight
            : initialNavbarHeight;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            // Adjust sectionTop to account for the current navbar height and add a small offset
            const sectionTop = current.offsetTop - currentNavbarHeight - 50;

            if (
                scrollY >= sectionTop &&
                scrollY <= sectionTop + sectionHeight
            ) {
                currentSectionId = current.getAttribute("id");
            }
        });

        navLinksContainer.querySelectorAll("a").forEach((link) => {
            link.classList.remove("active");
            if (
                link.getAttribute("href") &&
                link.getAttribute("href").substring(1) === currentSectionId
            ) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", highlight);
    highlight(); // Initial call
}

/**
 * Adds a scroll listener to change the navbar's appearance.
 * @param {HTMLElement} navbar - The navigation bar element.
 */
function setupNavbarScrollListener(navbar) {
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }
}

/**
 * Sets up the toggle functionality for the burger menu.
 * @param {HTMLElement} burgerMenu - The burger menu button.
 * @param {HTMLElement} navLinksContainer - The container for navigation links.
 */
function setupBurgerMenu(burgerMenu, navLinksContainer) {
    if (burgerMenu && navLinksContainer) {
        burgerMenu.addEventListener("click", () => {
            burgerMenu.classList.toggle("active");
            navLinksContainer.classList.toggle("active");
        });
    }
}
