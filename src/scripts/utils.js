const UTILS = (function() {
    const menu = document.getElementById('menu-item-selector'),
        background = document.getElementById('background-menu');

    const _closeMenu = () => {
        document.querySelector('body').classList.remove('no-scroll');
        menu.classList.remove('active');
        background.classList.remove('active');
    };

    const _closeSOS = () => {
        document.querySelector('body').classList.remove('no-scroll');
        document.getElementById('sos-holder-div').classList.remove('active');
    };

    const _openMenu = () => {
        document.querySelector('body').classList.add('no-scroll');
        menu.classList.add('active');
        background.classList.add('active');
    };

    const _openSOS = object => {
        document.querySelector('body').classList.add('no-scroll');
        object.classList.add('active');
    };

    return {
        menu: function() {
            document
                .getElementById('menu-listener')
                .addEventListener('click', () => {
                    _openMenu();
                });
            document
                .getElementById('close-menu')
                .addEventListener('click', () => {
                    _closeMenu();
                });
            document
                .getElementById('background-menu')
                .addEventListener('click', () => {
                    _closeMenu();
                });
        },
        sos: function() {
            const sosBtn = document.querySelectorAll('.triggers-sos');
            sosBtn.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    _openSOS(document.getElementById('sos-holder-div'));
                });
            });
            document
                .getElementById('close-sos')
                .addEventListener('click', function() {
                    _closeSOS();
                });
        }
    };
})();
