$(function () {
    $(document).on('click', '[data-popup-btn]', function (event) {
        var elemento = '#' + $(this).data().popupBtn;
        if (!$(elemento).is(':visible')) {
            $(elemento).css({
                'display': 'flex',
                'opacity': '0'
            }).animate({ opacity: 1 }, "fast", function () {              
                $('.box-top > .icon-close').remove();
                var box_top = $(elemento).find('.box-top');
                console.log(box_top);
                box_top.append('<i class="icon-close material-icons float-right md-22 txt-default" data-popup-btn-close="registroServicio">highlight_off</i>');
                $('.box-top > .icon-close').css({
                    'margin-top' : '6px',
                    'cursor' : 'pointer'
                });
            });
        }

        document.getElementById('touch').removeEventListener('touchstart', touchstart);
        document.getElementById('touch').removeEventListener('touchmove', touchmove);
        PullToRefresh.destroyAll();

    });

    $(document).on('click', '[data-popup-btn-close]', function (event) {
        var elemento = '#' + $(this).data().popupBtnClose;
        $(elemento).fadeToggle('fast');

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