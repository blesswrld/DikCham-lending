// /**
//  * Sets up event listeners for "Order" buttons on menu items.
//  * @param {string} buttonSelector - The CSS selector for order buttons.
//  * @param {Function} toastFn - The function to call to show a toast notification.
//  * @param {HTMLElement} toastContainer - The container element for toasts.
//  */
// function setupOrderButtons(buttonSelector, toastFn, toastContainer) {
//     document.querySelectorAll(buttonSelector).forEach((button) => {
//         button.addEventListener("click", function () {
//             const menuItem = this.closest(".menu-item");
//             if (!menuItem) return;

//             const itemNameElement = menuItem.querySelector("h4");
//             const itemName = itemNameElement
//                 ? itemNameElement.textContent
//                 : "Неизвестный товар";

//             // Placeholder for actual cart logic
//             // let cart = JSON.parse(localStorage.getItem('merzChamCart')) || [];
//             // cart.push({ name: itemName, price: /* find price */, quantity: 1 });
//             // localStorage.setItem('merzChamCart', JSON.stringify(cart));
//             // updateCartIndicator(); // Function to update cart indicator in navbar

//             if (toastFn && toastContainer) {
//                 toastFn(
//                     `"${itemName}" добавлен в корзину!`,
//                     "success",
//                     3500,
//                     toastContainer
//                 );
//             } else {
//                 console.log(
//                     `"${itemName}" добавлен в корзину! (Toast function not available)`
//                 );
//             }
//         });
//     });
// }
