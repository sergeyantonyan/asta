$(document).ready(function () {
    $('.aw-mobile--menu---bars').click(function () {
        /*$('.aw-menu--nav').addClass('aw-mobile--fullpage');*/
        $(this).toggleClass('open');
    });
    $('.aw-menu--cancel').click(function () {
        $('.aw-menu--nav').removeClass('aw-mobile--fullpage');
    });
});
