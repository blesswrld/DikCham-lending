/**
 * Инициализирует галерею изображений на странице товара.
 */
export function initProductPageGallery() {
    // Добавлено export
    const mainImage = document.querySelector(".main-product-image");
    const thumbnails = document.querySelectorAll(
        ".thumbnail-image, .thumbnail"
    );
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.querySelector(".lightbox-close");

    if (!mainImage || !lightbox || !lightboxImage || !lightboxClose) {
        return;
    }

    function updateActiveThumbnail(currentSrc) {
        if (thumbnails.length === 0) return;
        thumbnails.forEach((thumb) => {
            if (thumb.src === currentSrc) {
                thumb.classList.add("active");
            } else {
                thumb.classList.remove("active");
            }
        });
    }

    if (thumbnails.length > 0 && mainImage.src) {
        let initialActiveFound = false;
        thumbnails.forEach((thumb) => {
            if (thumb.src === mainImage.src) {
                thumb.classList.add("active");
                initialActiveFound = true;
            }
        });
        if (!initialActiveFound) {
            thumbnails[0].classList.add("active");
        }
    }

    function openLightbox(src, alt) {
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        if (lightboxCaption) {
            lightboxCaption.textContent = alt;
        }
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    mainImage.addEventListener("click", function () {
        openLightbox(this.src, this.alt);
    });
    mainImage.style.cursor = "zoom-in";

    if (thumbnails.length > 0) {
        thumbnails.forEach((thumbnail) => {
            thumbnail.style.cursor = "pointer";
            thumbnail.addEventListener("click", function () {
                const newSrc = this.src;
                const newAlt = this.alt;

                mainImage.src = newSrc;
                mainImage.alt = newAlt;

                updateActiveThumbnail(newSrc);
            });
        });
    }

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
}
