/**
 * Created by rofler on 8/29/16.
 */
$(document).ready(function () {

    var id=parent.document.URL.substring(parent.document.URL.indexOf('id='), parent.document.URL.length).split('=')[1].split('#')[0];

    //alert('album ID: ' + id);
    $('#albumIdLabel')[0].innerText = id;
    $('#date_included')[0].innerText = albums[id]['date_included'];
    $('#inputTitle')[0].value = albums[id]['title'];
    $('#inputArtist')[0].value = albums[id]['artist'];
    $('#inputGenre')[0].value = albums[id]['genre'];
    $('#inputComment')[0].value = albums[id]['comment'];
    $('#approved_checkbox')[0].checked = albums[id]['approved'];

    if(imageExists(base_url_for_pics + albums[id]['pic_name'])) {
        //alert('will load pic')
        $("#albumPicShow").attr("src", base_url_for_pics + albums[id]['pic_name']);
    }
    else {
        $("#albumPicShow").attr("src", 'img/404.gif');
        //alert('nope')
    }

    var t = $('#tracksTable').DataTable();

    for (var it = 0; it< albums[id]['tracks'].length; it++)
    {
        t.row.add( [
            albums[id]['tracks'][it]['number'],
            albums[id]['tracks'][it]['title']
        ] ).draw( false );
    }


    $("#inputArtist").autocomplete({
        source: artists
    });

    $('.ui-autocomplete, .ui-front').appendTo('#edit_album_form');
    $('.ui-autocomplete').attr('class', "ui-autocomplete ui-front ui-menu ui-widget ui-widget-content panel panel-green");
    $('.ui-autocomplete').attr('style', "display: none; width: 251px; position: relative; top: -303px; left: 15px; cursor: pointer; z-index: 99;");


});

$('#tracksTable tbody').on( 'click', 'tr', function () {

    $('#edit_track_modal_track_number')[0].value = $(this).children()[0].innerText;
    $('#edit_track_modal_track_title')[0].value = $(this).children()[1].innerText;

    $('#edit_track_modal').modal();
    $('#edit_track_modal').modal('show');
    $(this).toggleClass('selected');
} );

$('#add_track_btn').on( 'click', function () {

    //$('#modal_track_number')[0].value = $(this).children()[0].innerText;
    //$('#modal_track_title')[0].value = $(this).children()[1].innerText;

    $('#add_track_modal').modal();
    $('#add_track_modal').modal('show');
    $(this).toggleClass('selected');
} );

$("#edit_track_form").on('submit', function (e) {
    //ajax call here

    //stop form submission
    e.preventDefault();
});