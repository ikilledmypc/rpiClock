var express = require('express');
var lcdlib = require('./lcdManager');
var alarmManager = require('./AlarmManager')
var bodyParser = require('body-parser');
var alarms = require("./routes/alarms");
var settings = require("./routes/settings");
var app = express();


app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/alarms",alarms);
app.use("/settings",settings);


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

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Clock config listening at http://%s:%s', host, port);

});

module.exports = app;