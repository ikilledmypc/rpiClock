var Alarm = require("./Alarm");
var schedule = require("node-schedule");
var lcd = require("./lcdManager");
var activeAlarm ="";
var alarms= {};
var http = require("http");
var lame = require('lame');
var say = require('say');
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

function removeAlarm(alarm){
    console.log("removing: "+alarm);
    var alarmJob = alarms[alarm];
    alarmJob.cancel();
    delete alarms[alarm];
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
      say.speak(null,"Alarm has been cancelled, good morning sir!",function(){
          announceWeather();
      });
    }
  }

function announceWeather(){

    http.get("http://api.openweathermap.org/data/2.5/forecast/daily?id=2756253&cnt=1&units=metric", function(res) {
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            var weather="";
            var object = JSON.parse(body);
            var forcasts = object.list;
            weather += "today's weather will be ";
            weather += forcasts[0].weather[0].description;
            weather += " with a temperature of " +forcasts[0].temp.day+" degrees celsius";
            console.log(weather);
            speakLine(weather);
        });
    });
}

function speakLine(line){
    say.speak(null,line);
}

module.exports = {
  setAlarm : scheduleAlarm,
  setRadioAlarm : scheduleRadioAlarm,
  alarms : alarms,
  cancelAlarm : cancelAlarm,
  removeAlarm : removeAlarm,
  isAlarming : function(){
    return activeAlarm != "";
  }
};
