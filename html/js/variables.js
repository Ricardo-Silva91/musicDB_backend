/**
 * Created by rofler on 8/28/16.
 */
 var going_local = false;

 if (going_local) {
	var base_url_rest = "http://localhost:8080/";
	var base_url_for_pics = "http://localhost/getPicture?pic_name=";
 }
 else
 {
     var base_url_rest = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/rest_server/";
     var base_url_for_pics = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/rest_server/getPicture?pic_name=";
 }