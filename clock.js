var express = require('express');
var pwm = require('pi-blaster.js');
var lcdlib = require('./lcdManager');
var alarmManager = require('./AlarmManager')
var bodyParser = require('body-parser');
var lame = require('lame');
var icecast = require('icecast');
var Speaker = require('speaker');
var app = express();


app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var url = 'http://icecast.omroep.nl/3fm-bb-mp3';
icecast.get(url, function (res) {

  // log the HTTP response headers
  console.error(res.headers);

  // log any "metadata" events that happen
  res.on('metadata', function (metadata) {
    var parsed = icecast.parse(metadata);
    console.error(parsed);
  });

  // Let's play the music (assuming MP3 data).
  // lame decodes and Speaker sends to speakers!
  res.pipe(new lame.Decoder())
      .pipe(new Speaker());
});

app.get('/', function (req, res) {
  lcdlib.printMessage(["request from:", req.ip],10000);
  console.log("get request received");
  if(alarmManager.isAlarming()){
    res.sendFile(__dirname +"/views/cancelAlarm.html");
  }
  else{
    res.sendFile(__dirname +"/views/index.html");
  }

});

app.post('/', function(req,res){
  console.log(req.body);
  res.sendStatus(200);
});

app.get("/alarms",function(req,res){
  console.log(alarmManager.alarms);
  res.send(JSON.stringify(alarmManager.alarms));
});

app.post("/alarms/cancel",function(req,res){
  console.log("alarm canceled");
  if(alarmManager.isAlarming()){
    alarmManager.cancelAlarm();
  }
  res.sendStatus(200);
});

app.post("/alarms",function(req,res){
  lcdlib.printMessage(["alarm set for:",req.body.hour+":"+req.body.minute],10000);
  alarmManager.setAlarm(req.body.hour, req.body.minute);
  res.send(JSON.stringify(req.body));
});

app.get("/brightness/:amount",function(req,res){
  var bright = req.params.amount /100;
  console.log("setting brightness to: "+bright);
  pwm.setPwm(18,bright);
  res.sendStatus(200);
});




var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Clock config listening at http://%s:%s', host, port);

});
