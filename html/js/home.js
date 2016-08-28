/**
 * Created by rofler on 8/28/16.
 */
$(document).ready(function() {
var cookie = getCookie('MusicDB_token');
var url_rest = base_url_rest + 'numberOfAlbums?token=' + cookie;


    $.ajax({
        url: url_rest
    }).then(function (data) {

        var json = data;
        if (json != null && json['op'] == 'success') {
            //alert(json['totalAlbums']);
            $('#total-albums')[0].innerText = json['totalAlbums'];
        }
        else {
            alert('something is wrong');
            window.location.href = "index.html";
            //alert("jogos");

        }


    });

});