/**
 * Настраивает анимации при прокрутке для элементов с использованием Intersection Observer.
 * @param {string} selector - CSS-селектор для анимируемых элементов.
 * @param {object} [customOptions] - Пользовательские опции.
 * @param {number|number[]} [customOptions.threshold=0.15] - Порог видимости.
 * @param {boolean} [customOptions.unobserveAfterAnimation=true] - Отписываться ли после анимации.
 */
export function setupScrollAnimations(selector, customOptions = {}) {
    const animatedElements = document.querySelectorAll(selector);

    if (animatedElements.length === 0) return;

    const options = {
        threshold: 0.15,
        unobserveAfterAnimation: true,
        ...customOptions,
    };

    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            rootMargin: customOptions.rootMargin || "0px",
            threshold: options.threshold,
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                const el = entry.target;
                if (entry.isIntersecting) {
                    const animationFullName =
                        el.dataset.animation || "fadeInUp 1s ease-out forwards"; // Анимация по умолчанию
                    const animationDelay = el.dataset.animationDelay || "0s";

                    // Применяем стили анимации напрямую
                    const parts = animationFullName.split(" ");
                    el.style.animationName = parts[0];
                    el.style.animationDuration = parts[1] || "1s";
                    el.style.animationTimingFunction = parts[2] || "ease-out";
                    el.style.animationFillMode = parts[3] || "forwards"; // Важно
                    el.style.animationDelay = animationDelay;

                    el.style.opacity = "1"; // Делаем элемент видимым

                    if (options.unobserveAfterAnimation) {
                        observer.unobserve(el);
                    }
                } else {
                    if (!options.unobserveAfterAnimation) {
                        // Если нужно повторять анимацию, скрываем элемент снова
                        el.style.opacity = "0";
                        el.style.animationName = ""; // Сбрасываем анимацию для повторного запуска
                    }
                }
            });
        };

        const scrollObserver = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        animatedElements.forEach((el) => {
            el.style.opacity = "0"; // Изначально скрываем все анимируемые элементы
            scrollObserver.observe(el);
        });
    } else {
        // Резервный вариант: просто показываем все элементы
        animatedElements.forEach((el) => {
            el.style.opacity = "1";
        });
    }
}
