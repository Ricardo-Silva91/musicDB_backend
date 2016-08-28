

$("form").on('submit', function (e) {
    //ajax call here

    var alias = $('#inputAlias')[0].value;
    var pass = $('#inputPassword')[0].value;
    var url_rest = base_url_rest + 'login?alias=' + alias + '&pass=' + pass;


    //alert('b');

    $.ajax({
        url: url_rest
    }).then(function(data) {

        var json = data;
        if(json['alias']==alias && json['token']!=null)
        {
            document.cookie="MusicDB_token = "+json['token']+";path=/;";
            window.location.href = "home.html";
        }
        else
        {
            alert('wrong alias/password.\nPlease try again.')
        }

    });

    //stop form submission
    e.preventDefault();
});