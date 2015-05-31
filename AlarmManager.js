var Alarm = require("./Alarm");
var schedule = require("node-schedule");
var lcd = require("./lcdManager");

var alarms= {};

function scheduleAlarm(hour,minute){
  var job = schedule.scheduleJob( minute+' '+hour+' * * *', function(){
    console.log('alarm fired: '+hour+':'+minute);
    lcd.printMessage(['alarm! alarm!'], 10000);
  });
  alarms[hour +":"+minute] =  new Alarm(hour, minute,job);
}

module.exports = {
  setAlarm : scheduleAlarm,
  alarms : alarms
}
