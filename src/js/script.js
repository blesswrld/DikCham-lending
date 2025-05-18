document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 70; // Значение по умолчанию, если навбар не найден
    const navLinksContainer = document.querySelector(".nav-links");
    const burgerMenu = document.querySelector(".burger-menu");
    const toastContainer = document.getElementById("toast-container");
    const currentYearSpan = document.getElementById("currentYear");

    // Установка текущего года в футере
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                let targetPosition = targetElement.offsetTop - navbarHeight;
                // Если навбар уменьшается при скролле, нужно это учесть
                if (navbar.classList.contains("scrolled")) {
                    targetPosition =
                        targetElement.offsetTop - navbarHeight * 0.8; // Примерно, если паддинг уменьшается
                }

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                // Закрыть мобильное меню при клике на ссылку
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

    // Активная ссылка в навбаре при скролле
    const sections = document.querySelectorAll("section[id]");
    function navHighlighter() {
        if (!sections.length || !navLinksContainer) return;

        let scrollY = window.pageYOffset;
        let currentSectionId = "";

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - navbarHeight - 50; // Смещение для более ранней активации

            if (
                scrollY >= sectionTop &&
                scrollY <= sectionTop + sectionHeight
            ) {
                currentSectionId = current.getAttribute("id");
            }
        });

        navLinksContainer.querySelectorAll("a").forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSectionId) {
                link.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", navHighlighter);
    navHighlighter();

    // Изменение фона навбара при скролле
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // Бургер-меню для мобильных устройств
    if (burgerMenu && navLinksContainer) {
        burgerMenu.addEventListener("click", () => {
            burgerMenu.classList.toggle("active");
            navLinksContainer.classList.toggle("active");
        });
    }

    // Анимация появления элементов при скролле (Intersection Observer API)
    const animatedElements = document.querySelectorAll(
        ".feature-item, .menu-item, .review-item, .delivery-text, .delivery-image, .contact-details, .contact-map"
    );
    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15, // Элемент должен быть виден на 15%
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animationName =
                        el.dataset.animation || "fadeInUp 1s ease-out forwards";
                    el.style.animation = animationName;
                    el.style.opacity = "1"; // Делаем видимым
                    observer.unobserve(el);
                }
            });
        };

        const scrollObserver = new IntersectionObserver(
            observerCallback,
            observerOptions
        );
        animatedElements.forEach((el) => {
            el.style.opacity = "0"; // Изначально скрываем
            scrollObserver.observe(el);
        });
    } else {
        // Fallback для старых браузеров или если нет элементов
        animatedElements.forEach((el) => (el.style.opacity = "1"));
    }

    // Функция для создания и показа toast уведомления
    function showToast(message, type = "success", duration = 3500) {
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.classList.add("toast", type);

        let icon = "✔";
        if (type === "error") icon = "✖";
        if (type === "info") icon = "ℹ";

        toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        setTimeout(() => {
            toast.classList.remove("show");
            toast.addEventListener(
                "transitionend",
                () => {
                    if (toast.parentNode === toastContainer) {
                        // Убедимся, что удаляем нужный элемент
                        toastContainer.removeChild(toast);
                    }
                },
                { once: true }
            ); // Обработчик сработает один раз
        }, duration);
    }

    // Обработчик кнопок "Заказать"
    document.querySelectorAll(".menu-item .btn-secondary").forEach((button) => {
        button.addEventListener("click", function () {
            const menuItem = this.closest(".menu-item");
            if (!menuItem) return;
            const itemNameElement = menuItem.querySelector("h4");
            const itemName = itemNameElement
                ? itemNameElement.textContent
                : "Неизвестный товар";

            // TODO: Реальная логика добавления в корзину
            // let cart = JSON.parse(localStorage.getItem('merzChamCart')) || [];
            // cart.push({ name: itemName, price: /* найти цену */, quantity: 1 });
            // localStorage.setItem('merzChamCart', JSON.stringify(cart));
            // updateCartIndicator(); // Функция для обновления индикатора корзины в навбаре

            showToast(`"${itemName}" добавлен в корзину!`, "success");
        });
    });
});
