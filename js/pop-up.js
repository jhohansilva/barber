$(function () {
    $(document).on('click', '[data-popup-btn]', function (event) {
        var elemento = '#' + $(this).data().popupBtn;
        
        if ($(window).width() < 426) {
            $(elemento).toggleClass('close', function () {
                $('.box-top > .icon-close').remove();
                var box_top = $(elemento).find('.box-top');
                box_top.append('<i class="icon-close material-icons float-right md-22 txt-default" data-popup-btn-close="' + elemento + '">highlight_off</i>');
                $('.box-top > .icon-close').css({
                    'margin-top': '6px',
                    'cursor': 'pointer'
                });
            });
        } else {
            if (!$(elemento).is(':visible')) {
                $(elemento).css({
                    'display': 'flex',
                    'opacity': '0',
                    'height': '100%'
                }).animate({ opacity: 1 }, "fast", function () {
                    $('.box-top > .icon-close').remove();
                    var box_top = $(elemento).find('.box-top');
                    box_top.append('<i class="icon-close material-icons float-right md-22 txt-default" data-popup-btn-close="' + elemento + '">highlight_off</i>');
                    $('.box-top > .icon-close').css({
                        'margin-top': '6px',
                        'cursor': 'pointer'
                    });
                });
            }
        }


        document.getElementById('touch').removeEventListener('touchstart', touchstart);
        document.getElementById('touch').removeEventListener('touchmove', touchmove);
        PullToRefresh.destroyAll();
        $('html').css('overflow', 'hidden');

    });

    $(document).on('click', '[data-popup-btn-close]', function (event) {
        var elemento = $(this).data().popupBtnClose;

        if ($(window).width() < 426) $(elemento).toggleClass('close');
        else $(elemento).fadeToggle('fast');


        document.getElementById('touch').addEventListener('touchstart', touchstart);
        document.getElementById('touch').addEventListener('touchmove', touchmove);
        PullToRefresh.init({
            mainElement: 'main',
            onRefresh: function () {
                window.location.reload();
            },
            iconArrow: '<i class="material-icons">keyboard_arrow_down</i>'
        });
    });
});