$(document).ready(function () {

    var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FzdGF3b3Jrc2Rldi5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWE3MjBjM2VmYzE4MmQwM2IxZTcyYzZmIiwiYXVkIjoiYlN0bE1sOXVYZkxYZW5BQ2hkUE9ZQzhITE1uUE9WTkoiLCJpYXQiOjE1MTc0MzQ2NzEsImV4cCI6MjUxNzQzNDY3MH0.7CE4Jn0omNMq3kXRIaVmRCKgQN29SZgTvr8sckQaiG0';
    var zip = [];


    function getValidZips(zip) {
        $.ajax({
            url: '/api/web/zips',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'BEARER ' + access_token)
            },
            success: function (res) {
                // response
                zip = $.parseJSON(res);
                console.log(zip.validZips);
                var getValue = $('#zip_input').val();
                $.inArray(getValue,zip);

                $.each(zip.validZips, function( index, value ) {
                    if(getValue == value){
                        console.log("Redirect");
                        window.location.href = "non-valid-zip.html";
                        return;
                    } else{
                        window.location.href = "non-valid-zip.html";
                    }
                });
                console.log(getValue);
                var data = $.parseJSON(res);
                console.log(zip);

                return $.inArray(zip, data['validZips']);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function getPartners() {
        $.ajax({
            url: '/api/web/partners',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'BEARER ' + access_token)
            },
            success: function (res) {
                // response
                console.log(res);
            }
        });
    }

    $('body')
        .on('click', '.aw-nav--toggle, .aw-nav--close', function () {
            $('body').toggleClass('nav-open');
        })
        .on('click', '.btn-get--started', function (e) {
            if (!$('body').hasClass('zip-open')) {
                e.preventDefault();
                $('body').addClass('zip-open');
            }
            setTimeout(function () {
                $('#zip_input').focus();
            }, 500)
        });

    $('#zip_input')
        .on('input', function() {
        if($(this).val().length) {
            $(this).parents('form').find('.btn').text('Submit');
        }
        else{
            $(this).parents('form').find('.btn').text('Get started');
        }
    });

    $('.aw-hero--form').on('submit', function(e) {
        e.preventDefault();
        var zipIsValid = getValidZips($(this).find('input').val());

        console.log(zipIsValid);
    });



});
