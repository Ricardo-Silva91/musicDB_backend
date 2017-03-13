/**
 * Created by rofler on 8/28/16.
 */
$(document).ready(function () {

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
            //alert('something is wrong');
            window.location.href = "404.html";
            //alert("jogos");
        }
    });

    $('#last-edited-album-title')[0].innerText = albums[albums.length-1]['title'];
    $('#last-edited-album-artist')[0].innerText = albums[albums.length-1]['artist'];

    var elem = document.createElement('li');
    var elem_child1 = '<img src="" alt="User Image"><a class="users-list-name" href="#">Alexander Pierce</a><span class="users-list-date">Today</span>';//document.createElement('li');

    var row_elem;


    for(var i = albums.length-1; i>albums.length-13; i--)
    {

        /*if((i+1)%4 == 0)
        {
            $('#new_albums_painting').append('<div class="row"></div>');
        }*/

        elem = document.createElement('li');
        elem.style.cssText = 'height: 25%; width: 25%';
        //console.log(base_url_for_pics + albums[i]['pic_name']);
        elem_child1 = '<a href="editAlbum.html?id=' + i + '"><img  src=' + base_url_for_pics + albums[i]['pic_name'] + ' alt="User Image"> </a><a class="users-list-name" href="editAlbum.html?id=' + i + '">' + albums[i]['title'] + '</a><span class="users-list-date">' + albums[i]['artist'] + '</span>';//document.createElement('li');
        //elem_child1 = '<a href="editAlbum.html?id=' + i + '"><img style="width: 60%; height: 50%" src=' + base_url_for_pics + albums[i]['pic_name'] + ' alt="User Image"> </a><a class="users-list-name" href="editAlbum.html?id=' + i + '">' + albums[i]['title'] + '</a><span class="users-list-date">' + albums[i]['artist'] + '</span>';//document.createElement('li');
        elem.innerHTML = elem_child1;
        //row_elem.appendChild()

        //$($('#new_albums_painting > .row')[$('#new_albums_painting > .row').length - 1]).append(elem);

        $('#new_albums_painting')[0].appendChild(elem);

    }


});