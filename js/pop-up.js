$(function () {
    $(document).on('click', '[data-popup-btn]', function (event) {
        var elemento = $(this).data().popupBtn;
        if (!$('#' + elemento + '').is(':visible')) {
            $('#' + elemento + '').css({
                'display': 'flex',
                'opacity': '0'
            }).animate({ opacity: 1 });
        }

        document.getElementById('touch').removeEventListener('touchstart', touchstart);
        document.getElementById('touch').removeEventListener('touchmove', touchmove);
        PullToRefresh.destroyAll();

    });

    $(document).on('click', '[data-popup-btn-close]', function (event) {
        var elemento = $(this).data().popupBtnClose;
        $('#' + elemento + '').fadeToggle();

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