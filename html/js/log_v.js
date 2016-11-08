var availableTags = titles;

$(document).ready(function() {
    console.log("document ready");


    for (var i = log.length - 1; i >= 0; i--) {
        switch(log[i].type)
        {
            case 1:
                $('#notific_panel').append('<a class="list-group-item"><i class="fa ' + get_icon(log[i].type) + ' fa-fw"  style="cursor: pointer;" onclick="albumClick(find_id('+"'"+log[i].title+"'"+'))" ></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
            break;

            case 2:
                $('#notific_panel').append('<a class="list-group-item"><i class="fa ' + get_icon(log[i].type) + ' fa-fw" style="cursor: pointer;" onclick="albumClick(find_id('+"'"+log[i].title+"'"+'))" ></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
            break;

            case 3:
                $('#notific_panel').append('<a class="list-group-item"><i class="fa ' + get_icon(log[i].type) + ' fa-fw"  style="cursor: pointer;" onclick="albumClick(find_id('+"'"+log[i].title+"'"+'))" ></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
            break;

            case 4:
                $('#notific_panel').append('<a class="list-group-item"><i class="fa ' + get_icon(log[i].type) + ' fa-fw"  style="cursor: pointer;" onclick="albumClick(find_id('+"'"+log[i].title+"'"+'))" ></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
            break;
        }
        //$('#notific_panel').append('<a class="list-group-item"><i class="fa fa-comment fa-fw"></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
        //alert("jogos");
        //log[i]
    };


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

var notif_state=0;

function filter(opt)
{
	if(opt != notif_state)
    {
    	var notif_state=opt;
        $('#notific_panel').empty();

		for (var i = log.length - 1; i >= 0; i--) {
			if(log[i].type==opt || opt==0)
				$('#notific_panel').append('<a class="list-group-item"><i class="fa ' + get_icon(log[i].type) + ' fa-fw"  style="cursor: pointer;" onclick="albumClick(find_id('+"'"+log[i].title+"'"+'))" ></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
	   	}
    }
}

function get_icon(type)
{
	switch(type)
        {
            case 1:
                return "fa-music"
            break;

            case 2:
                return "fa-gears"
            break;

            case 3:
                return "fa-github-alt"
            break;

            case 4:
                return "fa-times"
            break;
        }
}
