

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