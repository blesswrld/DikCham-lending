// js/modules/uiHelpers.js

/**
 * Creates and shows a toast notification.
 * @param {string} message - The message to display in the toast.
 * @param {string} [type='success'] - The type of toast ('success', 'error', 'info').
 * @param {number} [duration=3500] - How long the toast should be visible in milliseconds.
 * @param {HTMLElement} toastContainer - The container element for toasts.
 */
function showToast(message, type = "success", duration = 3500, toastContainer) {
    if (!toastContainer) {
        console.error("Toast container not provided to showToast function.");
        return;
    }

    const toast = document.createElement("div");
    toast.classList.add("toast", type);

    let icon = "✔";
    if (type === "error") icon = "✖";
    if (type === "info") icon = "ℹ";

    toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
    toastContainer.appendChild(toast);

    // Use a small timeout to allow the element to be added to the DOM before triggering the transition
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        // Listen for the transition to end before removing the element
        toast.addEventListener(
            "transitionend",
            () => {
                if (toast.parentNode === toastContainer) {
                    toastContainer.removeChild(toast);
                }
            },
            { once: true }
        ); // Ensure the event listener is removed after it fires once
    }, duration);
}
