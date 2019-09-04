const PROFILE = (function() {
    const profileMenu = document.getElementById('profile-menu-list'),
        menuItems = document.querySelectorAll('#profile-menu-list li'),
        menuHolder = document.getElementById('menuShadow');

    const _listenMenuScroll = () => {
        _scrollValidation();
        profileMenu.addEventListener('scroll', function() {
            _scrollValidation();
        });
    };

    const _menuProfileValidation = () => {
        _listenMenuScroll();
        if (window.innerWidth < 768) {
            _profileMenuResponsive();
        }
    };

    const _profileMenuResponsive = () => {
        const pMenuSize = profileMenu.offsetWidth * 0.6;
        menuItems.forEach((item, i) => {
            if (item.classList.contains('active')) {
                profileMenu.scrollLeft = pMenuSize * i;
            }
        });
    };

    const _scrollValidation = () => {
        let xPosition = profileMenu.scrollLeft;
        if (xPosition < 100) {
            menuHolder.classList.add('right-shadow');
            menuHolder.classList.remove('left-shadow');
        } else if (xPosition > 99 && xPosition < 382) {
            menuHolder.classList.add('right-shadow');
            menuHolder.classList.add('left-shadow');
        } else if (xPosition > 381) {
            menuHolder.classList.remove('right-shadow');
            menuHolder.classList.add('left-shadow');
        }
    };

    const _toggleClose = (object, target) => {
        if (object.classList.contains('open')) {
            object.classList.remove('open');
            document.getElementById(target).classList.remove('open');
        } else {
            object.classList.add('open');
            document.getElementById(target).classList.add('open');
        }
    };

    return {
        canOpen: function() {
            const $profileOpener = document.querySelectorAll(
                '.can-close-object'
            );
            $profileOpener.forEach(object => {
                object.addEventListener('click', function() {
                    const target = this.getAttribute('data-target');
                    _toggleClose(this, target);
                });
            });
        },
        profileMenu: function() {
            _menuProfileValidation();
            window.addEventListener('resize', _menuProfileValidation);
        }
    };
})();
