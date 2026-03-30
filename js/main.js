// ============================================
// CLICK OUTSIDE NAVBAR TO CLOSE
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    document.addEventListener('click', function (event) {
        const isClickInsideNavbar = navbarCollapse.contains(event.target);
        const isClickOnToggler = navbarToggler.contains(event.target);

        if (!isClickInsideNavbar && !isClickOnToggler) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });

});