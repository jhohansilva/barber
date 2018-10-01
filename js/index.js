$(document).ready(function () {

    /// Paginación HASH
    if (location.hash.length < 1) {
        window.location.href = '#dashboard';
        var elemento = $("a[href$='dashboard']").closest("li");
        elemento.find("li.item-main").addClass('active');
    } else { haschChange(); }

    // Evento Scroll
    scrollNav();
    touch();

    //Cerrar pop-ups
    $('html').click(function (e) {
        var container = $('[data-boton-box~="opciones"]');
        var container2 = $('[data-boton]');
        if ((!container2.is(e.target) && container2.has(e.target).length === 0)) {
            if ((!container.is(e.target) && container.has(e.target).length === 0)) {
                $('[data-boton-box~="opciones"]').remove();
            }
        }

        var container3 = $('[data-tooltip~="tools-user-box"]');
        var container4 = $('[data-tooltip~="tools-user"]');
        if ((!container4.is(e.target) && container4.has(e.target).length === 0)) {
            if ((!container3.is(e.target) && container3.has(e.target).length === 0)) {
                $('[data-tooltip~="tools-user-box"]').hide();
            }
        }
    });


    PullToRefresh.init({
        mainElement: 'main',
        onRefresh: function () {
            // What do you want to do when the user does the pull-to-refresh gesture
            window.location.reload();
        },
        iconArrow: '<i class="material-icons">keyboard_arrow_down</i>',
        instructionsPullToRefresh: "",
        instructionsReleaseToRefresh: ""
    });
});


window.onhashchange = haschChange;

function haschChange() {
    $(".active").removeClass("active");
    var jash = location.hash;
    if (jash.length > 2) {
        $('.pace').remove();
        if (screen.width < 426) {
            $('#navegacion').hide();
            $('#bg-black').hide();
        }
        var href = jash.slice(1, jash.length);
        $("main").load("content/" + href + ".html", function (response, status, xhr) {
            if (status == "error") {
                var msg = "<h4>Ha ocurrido un error: </h4>";
                $("main").html(msg + "<h1 style='color:#f44336'>" + xhr.status + " " + xhr.statusText + "</h1>");
            }
        })
            .fadeIn('slow');
        var elemento = $("a[href$='" + jash + "']");
        elemento.find("li").addClass('active');
    }
}

$(function () {
    $(document).on('click', '[data-boton]', function (e) {
        var elemento = $(this).closest('tr');
        if (elemento.find('div.tooltip-box-list').length == 0) {
            $('[data-boton-box~="opciones"]').remove();
            $(this).closest('tr').append(
                '<div class="tooltip-box-list" style="display:block!important" data-boton-box="opciones">' +
                '<ul class="ripple">' +
                '<li>Perfil</li>' +
                '<li>Configuración</li>' +
                '<li>Privacidad</li>' +
                '</ul>' +
                '</div>'
            );
        } else {
            $('[data-boton-box~="opciones"]').remove();
        }

    });
});

$(function () {
    $(document).on('click', '[data-tooltip]', function (event) {
        var elemento = $(this).data().tooltip;
        $('[data-tooltip~="' + elemento + '-box"]').fadeToggle('fast');
    });
});

$(function () {
    $(document).on('click', '#boton-menu', function (event) { toggleNav(); });
});

$(function () {
    $(document).on('click', '#bg-black', function (event) { toggleNav(); });
});

function toggleNav() {
    var options = {};
    $('#navegacion').toggle("slide", 300);
    $('#bg-black').toggle("fade");
}

function scrollNav() {
    (function ($) {
        "use strict";
        if (screen.width > 425) {
            var $navbar = $("#navegacion"),
                y_pos = $navbar.offset().top,
                height = $navbar.height();
        } else {
            var $navbar = $(".header-top"),
                y_pos = $navbar.offset().top,
                height = $navbar.height();
        }
        var lastScrollTop = 0;

        $(window).scroll(function (event) {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > lastScrollTop) {
                $navbar.removeClass("navbar-fixed").clearQueue().css({
                    top: "-48px"
                });
            } else {
                if (scrollTop > y_pos + height) {
                    $navbar.addClass("navbar-fixed").animate({
                        top: 0
                    });
                } else if (scrollTop <= y_pos) {
                    $navbar.removeClass("navbar-fixed").clearQueue();
                }
            }
            lastScrollTop = scrollTop;
        });
    })(jQuery, undefined);
}

function touch() {
    var xIni;
    var yIni;
    var canvas = document.getElementById('touch');
    canvas.addEventListener('touchstart', function (e) {
        if (e.targetTouches.length == 1) {
            var touch = e.targetTouches[0];
            xIni = touch.pageX;
            yIni = touch.pageY;
        }
    }, false);

    canvas.addEventListener('touchmove', function (e) {
        if (e.targetTouches.length == 1) {
            var touch = e.targetTouches[0];
            if ((touch.pageX > xIni + 70) && (touch.pageY > yIni - 50) && (touch.pageY < yIni + 50)) {
                $('#navegacion').show('slide', 500);
                $('#bg-black').show('fade', 500);
            }
            if ((touch.pageX < xIni - 40) && (touch.pageY > yIni - 20) && (touch.pageY < yIni + 20)) {
                $('#navegacion').hide('slide', 500);
                $('#bg-black').hide('fade', 500);
            }
        }
    }, false);
}