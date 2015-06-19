var Alarm = require("./Alarm");
var schedule = require("node-schedule");
var lcd = require("./lcdManager");
var activeAlarm ="";
var alarms= {};
var lame = require('lame');
var icecast = require('icecast');
var Speaker = require('speaker');

function scheduleAlarm(hour,minute){
  var job = schedule.scheduleJob( minute+' '+hour+' * * *', function(){
    fireAlarm();
    lcd.printMessage(['alarm! alarm!'], 10000);
  });
  alarms[hour +":"+minute] =  new Alarm(hour, minute,job);
}

function scheduleRadioAlarm(hour,minute,url){
    var job = schedule.scheduleJob( minute+' '+hour+' * * *', function(){
        fireRadioAlarm(url);
        lcd.printMessage(['alarm! alarm!'], 10000);
    });
    alarms[hour +":"+minute] =  new Alarm(hour, minute,job);
}

  function fireAlarm(){
        //todo buzzer or general alarm
  }

    function fireRadioAlarm(url){
        icecast.get(url, function (res) {
            // log the HTTP response headers
            console.error(res.headers);
            activeAlarm = res;
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
    }

  function cancelAlarm(){
    if(activeAlarm != ""){
      activeAlarm.unpipe();
      activeAlarm ="";
    }
  }

module.exports = {
  setAlarm : scheduleAlarm,
  setRadioAlarm : scheduleRadioAlarm,
  alarms : alarms,
  cancelAlarm : cancelAlarm,
  isAlarming : function(){
    return activeAlarm != "";
  }
}
