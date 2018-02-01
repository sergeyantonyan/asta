$(document).ready(function () {

    $('body')
        .on('click', '.aw-nav--toggle, .aw-nav--close', function () {
            $('body').toggleClass('nav-open');
        });

});
