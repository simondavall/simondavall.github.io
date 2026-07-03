// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

$(function () {
    //caches a jQuery object containing the header element
    var header = $(".navbar");
    var borderTimeout;
    var borderActionCompleted = false;

    var makeMenuOpaque = function (transitionType) {
        header.removeClass("navbar-" + transitionType + "-transition-back")
            .addClass("navbar-" + transitionType + "-transition");
        // As the border is darker the following is set to add the border class
        // after the background has fadded in.
        if (!borderTimeout) {
            borderTimeout = setTimeout(function () {
                    header.addClass("navbar-default-border");
                    borderActionCompleted = true;
                },
                700);
        }
    }
    var makeMenuTransparent = function(transitionType) {
        header.removeClass("navbar-" + transitionType + "-transition").addClass("navbar-" + transitionType + "-transition-back");
        clearTimeout(borderTimeout);
        borderTimeout = null;
        header.removeClass("navbar-default-border");
    }

    // the following fades the opaque navbar in and out when the user scrolls down a bit.
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 10) {
            makeMenuOpaque("default");
        } else {
            makeMenuTransparent("default");
        }
    });

    // The following two functions toggle the background trasparency for the mobile menu
    // when clicked
    $('#menu .navbar-collapse').on('show.bs.collapse', function () {
        makeMenuOpaque("fast");
    });

    $('#menu .navbar-collapse').on('hidden.bs.collapse', function () {
        makeMenuTransparent("fast");
    });

    // The following two functions toggles the indicator up/down the icon on a collapse panel.
    $('#workExperience .cvJobDetail').on('shown.bs.collapse', function () {
        $(this).prev().find(".fa").removeClass("fa-angle-down").addClass("fa-angle-right");
        $(this).prev().find(".client-weblink").removeClass("hidden");
    });

    //The reverse of the above on hidden event:

    $('#workExperience .cvJobDetail').on('hidden.bs.collapse',
        function () {
            $(this).prev().find(".fa").removeClass("fa-angle-right").addClass("fa-angle-down");
            $(this).prev().find(".client-weblink").addClass("hidden");
        });

    // This function enables smooth scrolling to a page anchor
    // Note. The calling item must have the 'smoothscroll' class set.
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if ($(this).hasClass("smoothscroll")
                && location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                && location.hostname == this.hostname) {
                // Figure out element to scroll to
                var menuHeightOffset = 110;
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - menuHeightOffset
                    }, 1000, function () {
                        return false;
                    });
                }
            }
        });
});
