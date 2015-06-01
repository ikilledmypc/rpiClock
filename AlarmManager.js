var Alarm = require("./Alarm");
var schedule = require("node-schedule");
var lcd = require("./lcdManager");
var blaster = require('pi-blaster.js');

var alarms= {};

//function(){
  // console.log('alarm fired: '+hour+':'+minute);
  // lcd.printMessage(['alarm! alarm!'], 10000);
//}

function scheduleAlarm(hour,minute){
  var job = schedule.scheduleJob( minute+' '+hour+' * * *',alarmJob);
  alarms[hour +":"+minute] =  new Alarm(hour, minute,job);
}

function alarmJob(){
  var alarm = true;
  setInterval(function(){
    blaster.setPwm(4,0.6);
    setTimeout(function(){
      blaster.setPwm(4,0);
    },500);
  },1000);
}

module.exports = {
  setAlarm : scheduleAlarm,
  alarms : alarms
}
