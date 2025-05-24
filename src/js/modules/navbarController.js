/**
 * Настраивает плавную прокрутку для якорных ссылок.
 * @param {HTMLElement} navbar - Элемент навигационной панели.
 * @param {number} initialNavbarHeight - Изначальная высота навигационной панели.
 * @param {HTMLElement} navLinksContainer - Контейнер для навигационных ссылок.
 * @param {HTMLElement} burgerMenu - Кнопка бургер-меню.
 */
export function setupSmoothScroll( // Добавлено export
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
 * Подсвечивает активную навигационную ссылку в зависимости от положения прокрутки.
 * @param {HTMLElement} navbar - Элемент навигационной панели.
 * @param {number} initialNavbarHeight - Изначальная высота навигационной панели.
 * @param {HTMLElement} navLinksContainer - Контейнер для навигационных ссылок.
 * @param {NodeListOf<HTMLElement>} sections - NodeList всех элементов секций с ID.
 */
export function setupNavHighlighter( // Добавлено export
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
    highlight();
}

/**
 * Добавляет слушатель прокрутки для изменения внешнего вида навигационной панели.
 * @param {HTMLElement} navbar - Элемент навигационной панели.
 */
export function setupNavbarScrollListener(navbar) {
    // Добавлено export
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
 * Настраивает функциональность переключения для бургер-меню.
 * @param {HTMLElement} burgerMenu - Кнопка бургер-меню.
 * @param {HTMLElement} navLinksContainer - Контейнер для навигационных ссылок.
 */
export function setupBurgerMenu(burgerMenu, navLinksContainer) {
    // Добавлено export
    if (burgerMenu && navLinksContainer) {
        burgerMenu.addEventListener("click", () => {
            burgerMenu.classList.toggle("active");
            navLinksContainer.classList.toggle("active");
        });
    }
}
