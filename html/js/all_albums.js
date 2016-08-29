/**
 * Created by rofler on 8/29/16.
 */
$(document).ready(function () {


    var elem = document.createElement('li');
    var elem_child1 = '<img src="" alt="User Image"><a class="users-list-name" href="#">Alexander Pierce</a><span class="users-list-date">Today</span>';//document.createElement('li');



    for(var i = 0; i<albums.length; i++)
    {
        elem = document.createElement('li');
        //console.log(base_url_for_pics + albums[i]['pic_name']);
        elem_child1 = '<a href="editAlbum.html?id=' + i + '"><img style="width: 30%; height: 50%" src=' + base_url_for_pics + albums[i]['pic_name'] + ' alt="User Image"> </a><a class="users-list-name" href="editAlbum.html?id=' + i + '">' + albums[i]['title'] + '</a><span class="users-list-date">' + albums[i]['artist'] + '</span>';//document.createElement('li');
        elem.innerHTML = elem_child1;
        $('#new_albums_painting')[0].appendChild(elem);
    }

});