/**
 * Created by rofler on 8/28/16.
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


$(".btn-logout").click(function(){
    //ajax call here

    var cookie = getCookie('MusicDB_token');
    var url_rest = base_url_rest + 'logout?token=' + cookie;
    // alert(url_rest)
    //alert('b');

    $.ajax({
        url: url_rest
    }).then(function(data) {

        var json = data;
        if(json!= null && json['logout'] == 'success') {
            alert('logout successful');
            window.location.href = "index.html";
        }
        else {
            alert('something is wrong');
            window.location.href = "index.html";
        }


    });

});