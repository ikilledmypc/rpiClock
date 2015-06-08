var Alarm = require("./Alarm");
var schedule = require("node-schedule");
var lcd = require("./lcdManager");
var player = require('play-sound')(opts = {});
var blaster = require('pi-blaster.js');
var activeAlarm ="";
var alarms= {};

function scheduleAlarm(hour,minute){
  var job = schedule.scheduleJob( minute+' '+hour+' * * *', function(){
    fireAlarm();
    lcd.printMessage(['alarm! alarm!'], 10000);
  });
  alarms[hour +":"+minute] =  new Alarm(hour, minute,job);
}

  function fireAlarm(){
      player.player("../alarm.mp3");
    activeAlarm = setInterval(function(){
      blaster.setPwm(4,0.6);
      setTimeout(function(){
        blaster.setPwm(4,0);
      },500);
    },1000);
  }

  function cancelAlarm(){
    if(activeAlarm != ""){
      clearInterval(activeAlarm);
      blaster.setPwm(4,0);
      activeAlarm ="";
    }
  }
module.exports = {
  setAlarm : scheduleAlarm,
  alarms : alarms,
  cancelAlarm : cancelAlarm,
  isAlarming : function(){
    return activeAlarm != "";
  }
}
