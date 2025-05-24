// Импортируем функции из модулей
import {
    setupSmoothScroll,
    setupNavHighlighter,
    setupNavbarScrollListener,
    setupBurgerMenu,
} from "./modules/navbarController.js";
import { initProductPageGallery } from "./modules/productPageController.js";
import { setupScrollAnimations } from "./modules/scrollAnimator.js";

document.addEventListener("DOMContentLoaded", function () {
    // Запрашиваем DOM-элементы один раз
    const navbar = document.querySelector(".navbar");
    const navLinksContainer = document.querySelector(".nav-links");
    const burgerMenu = document.querySelector(".burger-menu");
    const currentYearSpan = document.getElementById("currentYear"); // <<<--- Элемент для года
    const sections = document.querySelectorAll("section[id]");

    const initialNavbarHeight = navbar ? navbar.offsetHeight : 70;

    // --- Инициализация Года в Футере ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear(); // <<<--- ПЕРЕНЕСЕННЫЙ КОД
    }

    // --- Инициализация Модулей Контроллера Навигационной Панели ---
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

    // --- Инициализация Модуля Аниматора Прокрутки ---
    setupScrollAnimations(
        ".feature-item, .menu-item, .review-item, .delivery-text, .delivery-image, .contact-details, .contact-map"
    );

    // --- Инициализация Галереи на Странице Товара ---
    if (document.querySelector(".product-page-section")) {
        initProductPageGallery();
    }
});
