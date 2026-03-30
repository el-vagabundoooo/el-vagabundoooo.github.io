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

});