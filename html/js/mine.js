

function getDiffDays(date_string)
{
    var today = new Date();
    var date = new Date(date_string);
    var timeDiff = Math.abs(today.getTime() - date.getTime());
    //dd/mm/yyyy
    //console.log(date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear());

    //var today_

    //if(today)

    //var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));    
}


    var availableTags = titles;

$(document).ready(function () {
    console.log("document ready");
    var offset = 0;

    var num_last_7_days_app=0;
    var num_last_7_days=0;
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var today = new Date();


    var count = 1;
    var count_sampled = 0;

    //getDiffDays(albums[0].date_included);
    //getDiffDays(albums[632].date_included);

    for (var i = 0 ; i < albums.length; i++) {
        if(albums[i].approved==true)
        {
            $('#table_app > tbody:last-child').append('<tr > <td>' +count+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')"  >' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick(\''+rfc3986EncodeURIComponent(albums[i].artist)+'\')"  >' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');

            var date2 = new Date(albums[i].date_included);
            var timeDiff = Math.abs(today.getTime() - date2.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

            if(diffDays<8)
            {
                num_last_7_days_app++;
                num_last_7_days++;
            }

            count++;
        }
        else
        {

            if(albums[i].genre =='samples')
            {
                count_sampled++;
            }

            var date2 = new Date(albums[i].date_included);
            var timeDiff = Math.abs(today.getTime() - date2.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

            if(diffDays<8)
            {
                num_last_7_days++;
            }
        }
    };


    $("#table_app").stupidtable();


    var donut = Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Approved Albums",
            value: count-1,
        },
        {
            label: "Sampled Albums",
            value: count_sampled
        }, {
            label: "Unapproved Albums",
            value: albums.length-(count-1)-count_sampled
        }],
        resize: true
    });

    document.getElementById('num_last_7_days').innerHTML = num_last_7_days;
    document.getElementById('num_last_7_days_app').innerHTML = num_last_7_days_app;
    document.getElementById('num_total_albums').innerHTML = albums.length;
    document.getElementById('last_log_entry').innerHTML = log[log.length-1].when_ih.split(' ')[0];

    switch(log[log.length-1].type)
    {
        case 1:
            $('#icon_last_log_entry').attr('class', "fa fa-music fa-5x")
        break;

        case 2:
            $('#icon_last_log_entry').attr('class', "fa fa-gears fa-5x")
            
        break;

        case 3:
            $('#icon_last_log_entry').attr('class', "fa fa-github fa-5x")
            
        break;

        case 4:
            $('#icon_last_log_entry').attr('class', "fa fa-times fa-5x")
            
        break;
    }



    for (var i = log.length - 1; i >= log.length-10; i--) {
        switch(log[i].type)
        {
            case 1:
                $('#notific_panel').append('<a class="list-group-item"><i class="fa fa-music fa-fw"  style="cursor: pointer;" onclick="albumClick('+"'"+find_id(log[i].title)+"'"+')" ></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
            break;

            case 2:
                $('#notific_panel').append('<a class="list-group-item"><i class="fa fa-gears fa-fw" style="cursor: pointer;" onclick="albumClick('+"'"+find_id(log[i].title)+"'"+')" ></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
            break;

            case 3:
                $('#notific_panel').append('<a class="list-group-item"><i class="fa fa-github-alt fa-fw"  style="cursor: pointer;" onclick="albumClick('+"'"+find_id(log[i].title)+"'"+')" ></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
            break;

            case 4:
                $('#notific_panel').append('<a class="list-group-item"><i class="fa fa-times fa-fw"  style="cursor: pointer;" onclick="albumClick('+"'"+find_id(log[i].title)+"'"+')" ></i> ' + log[i].what_happened + '<span class="pull-right text-muted small"><em>' + log[i].when_ih + '</em></span></a>');
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


//$('#table_app > tbody:last-child').append('<tr><td>87654</td> <td>2/23/2015</td> <td>2:13 Pm</td> <td>$9876.45</td></tr>');


});


window.Morris.Donut.prototype.setData = function(data, redraw) {
    if (redraw == null) {
        redraw = true;
    }
    this.data = data;
    this.values = (function() {
    var _i, _len, _ref, _results;
    _ref = this.data;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push(parseFloat(row.value));
    }
    return _results;
    }).call(this);
    this.dirty = true;
    if (redraw) {
        return this.redraw();
    }
}



function find_id(title)
{
    for(i=0;i<albums.length; i++)
    {
        if(albums[i].title==title)
            return i;
    }
}



var ta_app_state=0;

function table_app_actions(opt)
{
    if(opt != ta_app_state)
    {
        var ta_app_state=opt;
        $('#table_app > tbody').remove();
        $('#table_app').append('<tbody> <tr> </tr> </tbody>');

        switch(opt)
        {
            case 0:
                $('#tab_app_header').text("Approved Albums");
                var count = 1;

                for (var i = 0 ; i < albums.length; i++) {
                    if(albums[i].approved==true)
                    {
                        $('#table_app > tbody:last-child').append('<tr> <td>' +count+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                        count++;
                    }
                };

            break;

            case 1:
                $('#tab_app_header').text("Unapproved Albums");
                var count = 1;

                for (var i = 0 ; i < albums.length; i++) {
                    if(albums[i].approved!=true)
                    {
                        $('#table_app > tbody:last-child').append('<tr> <td>' +count+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                        count++;
                    }
                };
            break;

            case 2:
                $('#tab_app_header').text("All Albums");
                var count = 1;

                for (var i = 0 ; i < albums.length; i++) 
                {
                    if(albums[i].genre=="samples")
                        $('#table_app > tbody:last-child').append('<tr style="background-color: #f0ad4e;"> <td>' +(i+1)+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                    else if(albums[i].approved==true)
                        $('#table_app > tbody:last-child').append('<tr style="background-color: #5cb85c;"> <td>' +(i+1)+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                    else if(albums[i].approved==false)
                        $('#table_app > tbody:last-child').append('<tr style="background-color: #d9534f; color: white;"> <td>' +(i+1)+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                }
            break;

            case 3:
                var today = new Date();
                var count = 1;
                for (var i = 0 ; i < albums.length; i++) {
                    var date2 = new Date(albums[i].date_included);
                    var timeDiff = Math.abs(today.getTime() - date2.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

                    if(diffDays<8)
                    {
                        if(albums[i].genre=="samples")
                            $('#table_app > tbody:last-child').append('<tr style="background-color: #f0ad4e;"> <td>' +(i+1)+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                        else if(albums[i].approved==true)
                            $('#table_app > tbody:last-child').append('<tr style="background-color: #5cb85c;"> <td>' +(i+1)+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                        else if(albums[i].approved==false)
                            $('#table_app > tbody:last-child').append('<tr style="background-color: #d9534f; color: white;"> <td>' +(i+1)+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                        count++;
                    }
                }

                

                $('#tab_app_header').text("New Albums (last 7 days)");
                

                
            break;

            case 4:
                var today = new Date();
                var count = 1;
                for (var i = 0 ; i < albums.length; i++) {
                    if(albums[i].approved==true)
                    {
                        var date2 = new Date(albums[i].date_included);
                        var timeDiff = Math.abs(today.getTime() - date2.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

                        if(diffDays<8)
                        {
                            $('#table_app > tbody:last-child').append('<tr> <td>' +count+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                            count++;
                        }
                    }
                }

                

                $('#tab_app_header').text("New Approved Albums (last 7 days)");
                

                
            break;

            case 5:
                var count = 1;
                for (var i = 0 ; i < albums.length; i++) {
                    if(albums[i].genre=="samples")
                    {
                        $('#table_app > tbody:last-child').append('<tr> <td>' +count+ '</td> <td style="cursor: pointer;" onclick="albumClick('+"'"+albums[i].id+"'"+')">' +albums[i].title+ '</td> <td style="cursor: pointer;" onclick="artistClick('+"'"+rfc3986EncodeURIComponent(albums[i].artist)+"'"+')">' +albums[i].artist+ '</td> <td>' +albums[i].date_included+ '</td></tr>');
                        count++;
                        
                    }
                }

                

                $('#tab_app_header').text("Sampled Albums");
                

                
            break;
        }

    }

}



