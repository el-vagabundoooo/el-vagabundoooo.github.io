// ============================================
// CLICK OUTSIDE NAVBAR TO CLOSE
// ============================================
document.addEventListener('DOMContentLoaded', function () {

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbar = document.querySelector('.navbar');

    document.addEventListener('click', function (event) {
        const isClickInsideNavbar = navbar.contains(event.target);
        if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });

    // ============================================
    // SCROLL FADE-IN ANIMATIONS
    // ============================================
    const fadeElements = document.querySelectorAll(
        '.expertise-card, .ops-card, .story-card, .tool-card, .hobby-card, .project-block, .stat-item, .rec-card, .coming-soon-wrapper'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => {
        el.classList.add('fade-in-ready');
        observer.observe(el);
    });

    // ============================================
    // LIGHTBOX
    // ============================================
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
        <button class="lightbox-close">✕</button>
        <button class="lightbox-prev">‹</button>
        <button class="lightbox-next">›</button>
        <div class="lightbox-img-wrapper">
            <img class="lightbox-img" src="" alt="">
        </div>
        <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(lightboxOverlay);

    let currentGallery = [];
    let currentIndex = 0;

    function openLightbox(images, index) {
        currentGallery = images;
        currentIndex = index;
        updateLightbox();
        lightboxOverlay.classList.add('lightbox-active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('lightbox-active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const img = lightboxOverlay.querySelector('.lightbox-img');
        const counter = lightboxOverlay.querySelector('.lightbox-counter');
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = currentGallery[currentIndex].src;
            img.alt = currentGallery[currentIndex].alt;
            img.style.opacity = '1';
        }, 150);
        counter.textContent = currentGallery.length > 1
            ? `${currentIndex + 1} / ${currentGallery.length}`
            : '';
        lightboxOverlay.querySelector('.lightbox-prev').style.display = currentGallery.length > 1 ? 'flex' : 'none';
        lightboxOverlay.querySelector('.lightbox-next').style.display = currentGallery.length > 1 ? 'flex' : 'none';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightbox();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightbox();
    }

    lightboxOverlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightboxOverlay.querySelector('.lightbox-prev').addEventListener('click', prevImage);
    lightboxOverlay.querySelector('.lightbox-next').addEventListener('click', nextImage);

    lightboxOverlay.addEventListener('click', function (e) {
        if (e.target === lightboxOverlay || e.target === lightboxOverlay.querySelector('.lightbox-img-wrapper')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (!lightboxOverlay.classList.contains('lightbox-active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    document.querySelectorAll('[data-lightbox]').forEach(trigger => {
        trigger.style.cursor = 'pointer';
        trigger.addEventListener('click', function () {
            const group = this.dataset.lightbox;
            const allInGroup = Array.from(document.querySelectorAll(`[data-lightbox="${group}"]`));
            const images = allInGroup.map(el => ({
                src: el.dataset.src || el.src,
                alt: el.alt || ''
            }));
            const index = allInGroup.indexOf(this);
            openLightbox(images, index);
        });
    });

});