var availableTags = titles;

function rfc3986DecodeURIComponent (str) {  
    return unescape(str); 
}


$(document).ready(function() {
    console.log("document ready");


var a=rfc3986DecodeURIComponent(decodeURI(parent.document.URL.substring(parent.document.URL.indexOf('myVar1='), parent.document.URL.length).split('=')[1].split('#')[0]));

var b = a.split('%20');
var c= b[0];

for (var i = 1; i < b.length; i++) {
    c+=" "+b[i];
};

//alert(c);

$('#page_title').text(c);

$('#header_a').text($('#header_a').text() + c);

$('#searchOnY_button').attr('href', "https://www.youtube.com/results?search_query=" + c);
$('#searchOnLFM_button').attr('href', "http://www.last.fm/music/" + c);

count=1;

for (var i = 0 ; i < albums.length; i++) {
        if(albums[i].artist==c)
        {
            $('#table_art_albums > tbody:last-child').append('<tr> <td>' +count+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td>' +albums[i].date_included+ '</td> <td>' +albums[i].approved+ '</td></tr>');
            count++;
        }
    }


    $("#table_art_albums").stupidtable();


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
