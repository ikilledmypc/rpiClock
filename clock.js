var express = require('express');
var vash = require('vash');
var pwm = require('pi-blaster.js');
var lcdlib = require('./lcdManager');
var bodyParser = require('body-parser');
var app = express();
var alarms;

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  lcdlib.printMessage(["request from:", req.ip],10000);
  console.log("get request received");
  res.sendFile(__dirname +"/views/index.html");
});

app.post('/', function(req,res){
  console.log(req.body);
  lcdlib.printMessage(["alarm set for:",req.body.hour+":"+req.body.minute],10000);
  res.sendStatus(200);
});

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Clock config listening at http://%s:%s', host, port);

});
