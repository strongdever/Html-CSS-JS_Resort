!(function ($) {
    // Mobile Navigation
    $(document).on('click', '.mobile-toggle', function (e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-toggle').toggleClass('toggle-active');
    });

    //fixed-bar
    $(window).on('load scroll', function () {
        var fixedBar = $(".fixed-bar");
        if ($(this).scrollTop() > $(window).height() && $(this).scrollTop() < $('#footer').offset().top - $(window).height()) {
            fixedBar.addClass('fixed');
        } else {
            fixedBar.removeClass('fixed');
        }
    });

    //fixed-action
    $(window).on('load scroll', function () {
        var FixedAction = $(".fixed-action");
        if ($(this).scrollTop() < $('#footer').offset().top - $(window).height() && FixedAction.hasClass('fixed') == false) {
            FixedAction.addClass('fixed');
        } else if ($(this).scrollTop() > $('#footer').offset().top - $(window).height() && FixedAction.hasClass('fixed') == true) {
            FixedAction.removeClass('fixed');
        }
    });

    //sp-fixed-bar
    $(window).on('load scroll', function () {
        var spFixedBar = $(".sp-fixed-bar");
        if ($(this).scrollTop() < $('#footer').offset().top - $(window).height() && spFixedBar.hasClass('fixed') == false) {
            spFixedBar.addClass('fixed');
        } else if ($(this).scrollTop() > $('#footer').offset().top - $(window).height() && spFixedBar.hasClass('fixed') == true) {
            spFixedBar.removeClass('fixed');
        }
    });



    // Toggle .header-scrolled
    var headNav = $(".header-fixed");

    $(window).on('load scroll', function () {
        if ($(this).scrollTop() > 100 && headNav.hasClass('fixed') == false) {
            // headNav.css({ "top": '-8.0rem' });
            headNav.addClass('fixed');
            // headNav.animate({ "top": 0 }, 300);
        } else if ($(this).scrollTop() < 100 && headNav.hasClass('fixed') == true) {
            headNav.removeClass('fixed');
            // headNav.animate({ "top": '-8.0rem' }, 300);
        }
    });

    //Toggle fixed-bar
    $(window).on('load scroll', function () {
        var fixedBar = $(".fixed-bar");
        if ($(this).scrollTop() > $(window).height() && $(this).scrollTop() < $('#footer').offset().top - $(window).height()) {
            fixedBar.addClass('fixed');
        } else {
            fixedBar.removeClass('fixed');
        }
    });

    // modal

    var $modal = $(".modal");

    $(document).on('click', '[data-toggle="modal"]', function (e) {
        var target = $(this).attr("href") ? $(this).attr("href") : $(this).attr("data-target");
        if (target.length !== 0 && $(document).has(target).length !== 0) {
            e.preventDefault();
            var $selecedModal = $(target);
            $('body').toggleClass('modal-open');
            $selecedModal.show();
            setTimeout(function () {
                $selecedModal.toggleClass('show');
            }, 100);
            return false;
        }
    });

    $(document).click(function (e) {
        var container = $(".modal .modal-content");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('modal-open')) {
                $('body').removeClass('modal-open');
                $modal.removeClass('show');
                setTimeout(function () {
                    $modal.hide();
                }, 300);
            }
        }
    });

    $(document).on('click', '.modal .close, [data-dismiss="modal"]', function (e) {
        $('body').removeClass('modal-open');
        $modal.removeClass('show');
        setTimeout(function () {
            $modal.hide();
        }, 300);
    });


    // picker
    function pickupImage() {
        const $this = $(this);
        const currentIndex = $this.data('index');
        const $imagePicker = $this.parent();
        const $images = $imagePicker.find('img');
        const maxIndex = $imagePicker.data('max-index');
        const $target = $('.' + $imagePicker.data('target'));
        const $target1 = $('.' + $imagePicker.data('target1'));
        const $target2 = $('.' + $imagePicker.data('target2'));
        const $target3 = $('.' + $imagePicker.data('target3'));
        var newIndex = currentIndex;

        if ($target.length > 0) {
            $target.prop('src', $this.prop('src')).prop('srcset', $this.prop('srcset'));
        }
        if ($target1.length > 0) {
            $target1.prop('src', $($images.get(newIndex)).prop('src')).prop('srcset', $($images.get(newIndex)).prop('srcset'));
        }
        if ($target2.length > 0) {
            newIndex = currentIndex + 1;
            if (newIndex > maxIndex) { newIndex = 0 }
            $target2.prop('src', $($images.get(newIndex)).prop('src')).prop('srcset', $($images.get(newIndex)).prop('srcset'));
        }
        if ($target3.length > 0) {
            newIndex = currentIndex + 1;
            if (newIndex > maxIndex) { newIndex = 0 }
            newIndex = newIndex + 1;
            if (newIndex > maxIndex) { newIndex = 0 }
            $target3.prop('src', $($images.get(newIndex)).prop('src')).prop('srcset', $($images.get(newIndex)).prop('srcset'));
        }
    }
    $('.picker').each(function (index, element) {
        const $imagePicker = $(element);
        var lastIndex = 0;

        $imagePicker.find('img').each(function (index, img) {
            $(img).data('index', index);
            lastIndex = index;
        });
        $imagePicker.data('maxIndex', lastIndex);
    });
    $('.picker img').on('click', pickupImage);

    // lightbox
    const $lightbox = $('#lightbox');
    const $lightboxImage = $('#lightbox img');
    const $lightboxSource = $('.photos .pickup img, img.lightbox');

    $lightboxSource.on('click', function () {
        const $this = $(this);

        $('body').css({ 'overflow-y': 'hidden' });
        $lightboxImage.css({ opacity: 0.0 }).prop('src', $this.prop('src')).prop('srcset', $this.prop('srcset'));
        $lightbox.css({ display: 'flex' });
        $lightboxImage.css({ opacity: 1.0 });
    });
    $lightbox.on('click', function () {
        $('body').css({ 'overflow-y': 'scroll' });
        $lightbox.css({ display: 'none' });
        $lightboxImage.css({ opacity: 0.0 });
    });

    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $('.header-fixed').outerHeight() - 1;

    $(document).on('click', '.nav-menu a, .mobile-nav-menu a, .scrollto, .link-btn, .link, #toc_container a', function (e) {

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                var scrollto = target.offset().top - scrolltoOffset;

                if ($(this).attr("href") == '#header') {
                    scrollto = 0;
                }

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1000);

                if ($(this).parents('.nav-menu, .mobile-nav-menu').length) {
                    $('.nav-menu .active, .mobile-nav-menu .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle').toggleClass('toggle-active');
                    $('.mobile-nav-overly').fadeOut();
                }

                return false;
            }
        }
    });


    //vegas
    var responsiveImages = [
        { src: './assets/img/mainvisual.webp' },
        { src: './assets/img/mainvisual.webp' },
        { src: './assets/img/mainvisual.webp' }
    ];
    if (window.matchMedia("(max-width: 768px)").matches) {
        responsiveImages = [
            { src: './assets/img/mainvisual-sp@2x.webp' },
            { src: './assets/img/mainvisual-sp@2x.webp' },
            { src: './assets/img/mainvisual-sp@2x.webp' }
        ];
    }

    $('.back-slider').vegas({
        overlay: false,
        transition: 'blur',
        timer: false,
        transitionDuration: 2000,
        delay: 10000,
        animationDuration: 20000,
        animation: 'kenburns',
        slides: responsiveImages,
    });

    // Init AOS
    function aos_init() {
        AOS.init({
            duration: 300,
            once: true
        });
    }
    $(window).on('load', function () {
        aos_init();
    });

    //slider
    if ($('.spslider').length > 0) {
        var $slide = $('.spslider').slick({
            infinite: false,
            autoplay: true,
            speed: 600,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 9999,
                    settings: "unslick",
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: true,
                        centerMode: true,
                        centerPadding: '3.0rem',
                        spaceBetween: '2.0rem',
                    }
                },
            ]
        });
    }
})(jQuery);