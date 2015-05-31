var mode= {
  time : 0,
  message :1
}

var _currentMode =0;
var _timeIntervalObject;
var _lastMinute;

var Lcd = require('lcd'),
 lcd = new Lcd({
   rs: 25,
   e: 24,
   data: [23, 17, 21, 22],
   cols: 8,
   rows: 2
 });

lcd.on('ready', function() {
  changeMode(mode.time);
  var date = new Date();
  _lastMinute = date.getMinutes();
  _timeIntervalObject = setInterval(function() {
    if(_currentMode == mode.time ){
      printCurrentTime();
    }
  }, 1000);
  console.log("lcd ready");
});


function printMessage(message,timeout){
  changeMode(mode.message);
  lcd.clear(function(){
    for(var i=0; i< message.length;i++){
      printLineDelayed(i,message[i],300*i)
    }

  });
  setTimeout(function(){
    changeMode(mode.time)
  },timeout);
}

function printLineDelayed(lineNumber,line,delay){
  setTimeout(function(){
    console.log("printing line "+line)
    lcd.setCursor(0,lineNumber);
    lcd.print(line);
  },delay);
}

function changeMode(mode){
  _currentMode = mode;
  console.log("switching to mode "+mode);
  if(mode == 0){
    printCurrentTime();
  }
}

function printCurrentTime(){
  //changeMode(mode.time)
  var date = new Date();
  if(date.getMinutes()!= _lastMinute){
    lcd.clear(function(){
      lcd.setCursor(4, 0);
      lcd.print(date.toTimeString().substr(0,5),function(){
        lcd.setCursor(0, 1);
        lcd.print(date.toDateString());
        _lastMinute = date.getMinutes();
      });
    });
  }
}

// If ctrl+c is hit, free resources and exit.

process.on('SIGINT', function() {
 lcd.clear();
  lcd.close();
  process.exit();
});

module.exports = {

  printMessage : printMessage,

  printTime : function(){
    _currentMode = mode.time;
  },

  clearLcd: function(){
    lcd.clear();
  }
}
