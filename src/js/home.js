$(document).ready(function () {

    var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FzdGF3b3Jrc2Rldi5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWE3MjBjM2VmYzE4MmQwM2IxZTcyYzZmIiwiYXVkIjoiYlN0bE1sOXVYZkxYZW5BQ2hkUE9ZQzhITE1uUE9WTkoiLCJpYXQiOjE1MTc0MzQ2NzEsImV4cCI6MjUxNzQzNDY3MH0.7CE4Jn0omNMq3kXRIaVmRCKgQN29SZgTvr8sckQaiG0';

    var $body = $('body'),
        $btnHeroSubmit = $('#btn-hero--submit'),
        $zipInput = $('#zip_input'),
        isInValidZips,
        isInPartners;


    $body
        .on('click', '.aw-nav--toggle, .aw-nav--close', function () {
            $('body').toggleClass('nav-open');
        })
        .on('click', '.aw-home .btn-get--started', function (e) {
            if (!$('body').hasClass('zip-open')) {
                e.preventDefault();
                $('body').addClass('zip-open');
                $btnHeroSubmit.prop('disabled', true);
            }
            setTimeout(function () {
                $zipInput.focus();
            }, 500)
        });

    $zipInput
        .on('input', function () {
            if ($(this).val().length) {
                $btnHeroSubmit.prop('disabled', false);
            }
            else {
                $btnHeroSubmit.prop('disabled', true);
            }
        });

    $('#zip-form').on('submit', function (e) {

        e.preventDefault();

        $btnHeroSubmit.addClass('is-loading');

        getValidZips($zipInput.val());
    });

    $('.aw-nav--link').on('click', function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href'));
        console.log($target)
        $('html, body').animate({
            scrollTop: $target.offset().top - $('.aw-header').outerHeight() + 1
        }, 500)

    });

    function getValidZips(inputZip) {
        eraseCookie('zipCode');
        setCookie('zipCode', inputZip, 1);

        $.ajax({
            url: 'https://cryptic-inlet-60037.herokuapp.com/api/web/zips',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'BEARER ' + access_token)
            },
            success: function (res) {
                // response
                var zipData = $.parseJSON(res);
                console.log(zipData);


                $.each(zipData['validZips'], function (key, value) {
                    if (inputZip == value) {
                        isInValidZips = true;
                        return false;
                    }
                });


                $.each(zipData['partnerZips'], function (key, value) {
                    if (inputZip == value) {
                        isInPartners = true;
                        return false;
                    }
                });

                if (!!isInValidZips && !!isInPartners) {
                    window.location.href = "enter-address.html";
                } else if (!!isInValidZips && !isInPartners) {
                    if ('ontouchstart' in window) {
                        window.location.href = "download_app.html";
                        return false;
                    } else {
                        window.location.href = "path1.html";
                        return false;
                    }
                } else {
                    window.location.href = "enter-email.html";
                }


                // var getValue = $('#zip_input').val();
                //
                // $.each(zip.validZips, function( index, value ) {
                //     if(parseInt(getValue) == value){
                //         takeForNewletter = value;
                //         // if('ontouchstart' in document.documentElement){
                //         //     window.location.href = "download_app.html";
                //         //     return false;
                //         // } else{
                //         //     window.location.href = "path1.html";
                //         //     return false;
                //         // }
                //     } else{
                //         // window.location.href = "non-valid-zip.html";
                //         return false;
                //     }
                // });
            },
            error: function (err) {
                console.log(err);
            }
        });
    }


});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}