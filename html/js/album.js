var availableTags = titles;

$(document).ready(function() {
    console.log("document ready");


var a=parent.document.URL.substring(parent.document.URL.indexOf('myVar1='), parent.document.URL.length).split('=')[1].split('#')[0];

var i=parent.document.URL.substring(parent.document.URL.indexOf('myVar1='), parent.document.URL.length).split('=')[1].split('#')[0];

console.log("i: " + i);

//var b = a.split('%20');
//var c= b[0];

//for (var i = 1; i < b.length; i++) {
//    c+=" "+b[i];
//};

//alert(c);

$('#page_title').text(albums[i].title);

$('#searchOnY_button').attr('href', "https://www.youtube.com/results?search_query=" + albums[i].artist + "+" + albums[i].title);
    $('#searchOnLFM_button').attr('href', "http://www.last.fm/music/" + albums[i].artist + "/" + albums[i].title);

if(albums[i].approved == true)
{
    $('#header_a').attr('class', 'page-header alert alert-success');
}
else
{
    $('#header_a').attr('class', 'page-header alert alert-danger');
}

//count=1;

//for (var i = 0 ; i < albums.length; i++) {
//        if(albums[i].title==c)
//        {
        	for (var j = 0; j<albums[i].tracks.length; j++) {
        		$('#table_alb_tracks > tbody:last-child').append('<tr> <td>' +albums[i].tracks[j].number+ '</td> <td><a target="_blank" href="https://www.youtube.com/results?search_query=' + albums[i].artist + '+' + albums[i].tracks[j].title + '">' +albums[i].tracks[j].title+ '</a></td></tr>');
            
        	};
            $('#page_title').text(albums[i].title + " by "+ albums[i].artist);
//        	break;
           // $('#table_alb_tracks > tbody:last-child').append('<tr> <td>' ++ '</td> <td>' +albums[i].title+ '</td> <td>' +albums[i].date_included+ '</td> <td>' +albums[i].approved+ '</td></tr>');
            //count++;
//        }
//    }

    if(albums[i].genre == "samples")
    {
        $('#if_sampled').attr("style", "");
        $('#table_title').text("Sampled Tracks:");
    }

    $('#header_a').text($('#header_a').text() + albums[i].title);

    $('#artist_name').text(albums[i].artist);
    $('#artist_name').attr("style", "cursor: pointer;");
    $('#artist_name').attr("onclick", "artistClick('"+albums[i].artist+"')");

    $('#comment_label').text(albums[i].comment);


    if(albums[i].pic_name!=null)
        $('#album_pic').attr("src", location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/rest_server/getPicture?pic_name="+albums[i].pic_name);
    else
        $('#album_pic').attr("src", location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/rest_server/getPicture?pic_name=notAvailable.jpg");
/*
    if(albums[i].pic_name!=null)
        $('#album_pic').attr("src", 'https://musicbackendrest.herokuapp.com/getPicture?pic_name='+albums[i].pic_name);
    else
        $('#album_pic').attr("src", 'https://musicbackendrest.herokuapp.com/getPicture?pic_name=notAvaliable.jpg');

*/

    $("#table_alb_tracks").stupidtable();


    availableTags= availableTags.concat(artists);

    //$( "#search_input" ).autocomplete({source: availableTags});

     $( "#search_input" ).autocomplete({
      source: availableTags
    });


    $('.ui-autocomplete, .ui-front').appendTo('#sidebar');
    $('.ui-autocomplete').attr('class', "ui-autocomplete ui-front ui-menu ui-widget ui-widget-content panel panel-green");
    $('.ui-autocomplete').attr('style', "display: none; width: 251px; position: relative; top: -303px; left: 15px; cursor: pointer;");

    console.log("autocomplete");



});
