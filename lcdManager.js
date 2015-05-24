var Lcd = require('lcd'),
 lcd = new Lcd({
   rs: 25,
   e: 24,
   data: [23, 17, 21, 22],
   cols: 8,
   rows: 2
 });

// lcd.on('ready', function() {
//   setInterval(function() {
//     printCurrentTime();
//   }, 1000);
//   console.log("lcd update");
// });


function printMessage(message){
  lcd.clear();
  lcd.setCursor(0,0);
  console.log("printing message")
  lcd.print(message);
}

function printCurrentTime(){
  // lcd.setCursor(4, 0);
  // var date = new Date();
  // lcd.print(date.toTimeString().substr(0,8),function(){
  //   lcd.setCursor(0, 1);
  //   lcd.print(date.toDateString());
  // });
}

// If ctrl+c is hit, free resources and exit.

process.on('SIGINT', function() {
 lcd.clear();
  lcd.close();
  process.exit();
});

module.exports = {
  printMessage : printMessage,
  printTime : printCurrentTime,
  clearLcd: function(){
    lcd.clear();
  }
}
