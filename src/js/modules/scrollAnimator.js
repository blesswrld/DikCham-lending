// js/modules/scrollAnimator.js

/**
 * Sets up scroll-triggered animations for elements using Intersection Observer.
 * @param {string} selector - The CSS selector for elements to animate.
 */
function setupScrollAnimations(selector) {
    const animatedElements = document.querySelectorAll(selector);

    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15, // Element should be visible by 15%
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animationName =
                        el.dataset.animation || "fadeInUp 1s ease-out forwards";
                    el.style.animation = animationName;
                    el.style.opacity = "1"; // Make visible
                    observer.unobserve(el); // Stop observing once animated
                }
            });
        };

        const scrollObserver = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        animatedElements.forEach((el) => {
            el.style.opacity = "0"; // Initially hide
            scrollObserver.observe(el);
        });
    } else {
        // Fallback for older browsers or if no elements are found
        animatedElements.forEach((el) => (el.style.opacity = "1"));
    }
}
