$(document).ready(function () {
    $('.aw-menu--toggle').click(function () {
        /*$('.aw-menu--nav').addClass('aw-mobile--fullpage');*/
        $(this).toggleClass('open');
    });
    $('.aw-menu--cancel').click(function () {
        $('.aw-menu--nav').removeClass('aw-mobile--fullpage');
    });
});
