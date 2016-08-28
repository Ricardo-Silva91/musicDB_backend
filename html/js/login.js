

$("form").on('submit', function (e) {
    //ajax call here

    var alias = $('#inputAlias')[0].value;
    var pass = $('#inputPassword')[0].value;
    var url_rest = base_url_rest + 'login?alias=' + alias + '&pass=' + pass;

    $.ajax({
        url: url_rest
    }).then(function(data) {

        alert(JSON.stringify(data));
/*
        var json = data;
        if(json['mail']==mail && json['token']!=null)
        {
            //alert(data);
            document.cookie="PTapp_token = "+json['token']+";path=/;";
            window.location.href = "home.html";
        }
*/
    });


    //stop form submission
    e.preventDefault();
});