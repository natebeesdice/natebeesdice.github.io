(function() {
        // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    menuToggle && menuToggle.addEventListener('click', () => navList.classList.toggle('open'));
})();