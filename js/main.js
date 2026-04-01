document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // CLICK OUTSIDE NAVBAR TO CLOSE
    // ============================================
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbar = document.querySelector('.navbar');

    if (navbar && navbarCollapse && navbarToggler) {
        document.addEventListener('click', function (event) {
            const isClickInsideNavbar = navbar.contains(event.target);
            if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }

    // ============================================
    // AUTO ACTIVE NAV LINK
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ============================================
    // SCROLL FADE-IN ANIMATIONS
    // ============================================
    const fadeElements = document.querySelectorAll(
        '.expertise-card, .ops-card, .story-card, .tool-card, .hobby-feed-card, .project-block, .stat-item, .rec-card, .coming-soon-wrapper, .timeline-item, .social-link-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(el => {
        el.classList.add('fade-in-ready');
        observer.observe(el);
    });

    // ============================================
    // BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // TYPEWRITER ANIMATION
    // ============================================
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const phrases = [
            'Insurance Operations Specialist',
            'Commercial Lines · AMS Platforms',
            'Transitioning into Cybersecurity',
            'Remote · North American Timezone',
            'Available for Work'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 55;

        function type() {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                typewriterEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 25;
            } else {
                typewriterEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 55;
            }
            if (!isDeleting && charIndex === current.length) {
                typingSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 300;
            }
            setTimeout(type, typingSpeed);
        }
        setTimeout(type, 800);
    }

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
        counter.textContent = currentGallery.length > 1 ? `${currentIndex + 1} / ${currentGallery.length}` : '';
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
        if (e.target === lightboxOverlay || e.target.classList.contains('lightbox-img-wrapper')) {
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