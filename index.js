var http = require('http');
var express = require('express');
var app = express();
var fs = require("fs");



app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

    extended: true
}));

app.get('/listAlbums', function (req, res) {
    fs.readFile( __dirname + "/data/" + "albums.json", 'utf8', function (err, data) {
        //console.log( data );
        res.end( data );
    });
});


app.get('/getAlbumDetails/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/data/" + "albums.json", 'utf8', function (err, data) {
        var albums = JSON.parse( data );
        var id = req.params.id;
        if (id<0 || id>= albums.length)
        {
            console.log("id out of bounds");
            res.status(204).end(JSON.stringify('{\'error\': \'id out of bounds\'}'));
            return
        }
        var album = albums[id];
        if(album['id']==id)
        {
            console.log('id matches position');
            res.status(200).end( JSON.stringify(album));
        }
        else
        {
            for (var i = albums.length - 1; i >= 0; i--) {
                if(albums[i]['id'] == id)
                {
                    console.log("list not sorted");
                    res.status(200).end(JSON.stringify(albums[i]));
                }
            }
        }
    });
});


app.get('/login', function (req, res) {
    fs.readFile( __dirname + "/data/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var alias = req.query.alias;
        var pass = req.query.pass;

        for(var i= 0; i<users.length; i++)
        {
            if(users[i]['alias'] == alias)
            {

                console.log('user '+ users[i]['alias'] + ' found');

                if(users[i]['pass'] == pass)
                {
                    var token = Math.random();
                    users[i]['token'] = token;

                    fs.writeFile(__dirname + "/data/" + "users.json", JSON.stringify(users), function (err) {
                        console.error(err)
                    });

                    res.status(200).json({
                        alias: alias,
                        token: token
                    })
                }
                else
                {
                    console.log('wrong pass for user ' + alias);
                    res.status(200).json({
                        alias: alias,
                        token: null
                    })
                }

                return;
            }
        }

        console.log('user ' + alias + ' not found');
        res.status(204).json({
            alias: alias,
            token: null
        })

    });
});

function getUserPositionByToken(users, token) {

    for (var i = 0; i<users.length; i++)
    {
        if(users[i]['token'] == token)
        {
            return i;
        }
    }

    return -1;

}


app.get('/logout', function (req, res) {
    fs.readFile( __dirname + "/data/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var token = req.query.token;
        var userPos = getUserPositionByToken(users, token);

        if(userPos!=-1) {
            users[userPos]['token'] = null;

            fs.writeFile(__dirname + "/data/" + "users.json", JSON.stringify(users), function (err) {
                console.error(err)
            });

            res.status(200).json({
                alias: users[userPos]['alias'],
                logout: 'success'
            })
        }
        else
        {
            console.log('token injection detected');
            res.status(204).json({
                alias: null,
                logout: 'fail'
            })
        }


    });
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});

var minutes = 30, the_interval = minutes * 60 * 1000;
setInterval(function() {
    console.log("I am doing my 6 seconds check");
    // do your stuff here
}, the_interval);




/********************* Break! beyond this point only web page stuff! ***********************/


var wepPage_express = require("express");
var wepPage_app2 = wepPage_express();
var wepPage_router = wepPage_express.Router();
var wepPage_path = __dirname + '/html/';
wepPage_app2.use(wepPage_express.static(__dirname + '/html/'));

wepPage_router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
});

wepPage_router.get("/",function(req,res){
    res.sendFile(wepPage_path + "index.html");
});

wepPage_app2.use("/",wepPage_router);

wepPage_app2.use(wepPage_express.static(__dirname));

wepPage_app2.use("*",function(req,res){
    res.sendFile(wepPage_path + "404.html");
});

wepPage_app2.listen(80,function(){
    console.log("Web page Live at Port 80");
});