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

    cerrarToolTip('[data-tooltip~="tools-user"]', '[data-tooltip~="tools-user-box"]');
    cerrarToolTip('[data-nav~="sub-nav-facturar"]', '[data-nav~="sub-nav-facturar-box"]');
    cerrarToolTip('[data-nav~="sub-nav-gestion"]', '[data-nav~="sub-nav-gestion-box"]');

    //Cerrar pop-ups
    $('html').click(function (e) {
        var container = $('[data-boton-box~="opciones"]');
        var container2 = $('[data-boton]');
        if ((!container2.is(e.target) && container2.has(e.target).length === 0)) {
            if ((!container.is(e.target) && container.has(e.target).length === 0)) {
                $('[data-boton-box~="opciones"]').remove();
            }
        }
    });

    PullToRefresh.init({
        mainElement: 'main',
        onRefresh: function () {
            window.location.reload();
        },
        iconArrow: '<i class="material-icons">keyboard_arrow_down</i>'
    });

});

var app = {
    initialize: function () { document.addEventListener('deviceready', this.onDeviceReady.bind(this), false); },
    onDeviceReady: function () { alert('Cordova ready') }
};

app.initialize();


window.onhashchange = haschChange;

function haschChange() {
    $(".active-hash").removeClass("active-hash");
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
            } else {
                var elemento = $("a[href$='" + jash + "']");
                elemento.closest("li").addClass('active-hash');
                elemento.find("li").addClass('active-hash');
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        })
            .fadeIn('slow');

    }
}

/*$(function () {
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
});*/

$(function () {
    $(document).on('click', '[data-tooltip]', function (event) {
        var elemento = $(this).data().tooltip;
        $('[data-tooltip~="' + elemento + '-box"]').fadeToggle('fast');
    });

    $(document).on('click', '[data-nav]', function (event) {
        var elemento = $(this).data().nav;
        $('[data-nav~="' + elemento + '"]').toggleClass('active');
        var elemento = $(this).data().nav;
        $('[data-nav~="' + elemento + '-box"]').slideToggle('fast');
    });

    $(document).on('click', '#boton-menu', function (event) { toggleNav(); });
    $(document).on('click', '#bg-black', function (event) { toggleNav(); });

});

function toggleNav() {
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
                $('main').css('margin-top', '0px');
            } else {
                if (scrollTop > y_pos + height) {
                    $navbar.addClass("navbar-fixed").animate({
                        top: 0
                    });
                    $('main').css('margin-top', '57px');
                } else if (scrollTop <= y_pos) {
                    $navbar.removeClass("navbar-fixed").clearQueue();
                    $('main').css('margin-top', '0px');
                }
            }
            lastScrollTop = scrollTop;
        });
    })(jQuery, undefined);
}

function touch() {
    var canvas = document.getElementById('touch');
    canvas.addEventListener('touchstart', touchstart);
    canvas.addEventListener('touchmove', touchmove);
}

function touchstart(e) {
    if (e.targetTouches.length == 1) {
        var touch = e.targetTouches[0];
        xIni = touch.pageX;
        yIni = touch.pageY;
    }
}

function touchmove(e) {
    if (e.targetTouches.length == 1) {
        var touch = e.targetTouches[0];
        if ((touch.pageX > xIni + 70) && (touch.pageY > yIni - 50) && (touch.pageY < yIni + 50)) {
            $('#navegacion').show('slide', 200);
            $('#bg-black').show('fade', 500);
        }
        if ((touch.pageX < xIni - 40) && (touch.pageY > yIni - 20) && (touch.pageY < yIni + 20)) {
            $('#navegacion').hide('slide', 300);
            $('#bg-black').hide('fade', 500);
        }
    }
}

function ajax(url, data, funcion) {
    return $.ajax({
        async: true,
        type: "POST",
        url: url,
        data: data,
        dataType: "html",
        success: function (data) {
            funcion(data);
        }
    });
}

function cerrarToolTip(controlador, contenedor) {
    $('html').click(function (e) {
        var container = $(contenedor);
        var controller = $(controlador);
        if ((!controller.is(e.target) && controller.has(e.target).length === 0)) {
            if ((!container.is(e.target) && container.has(e.target).length === 0)) {
                controller.removeClass('active');
                container.slideUp('fast');
            }
        }
    });
}

