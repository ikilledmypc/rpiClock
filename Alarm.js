
var Alarm = function(hour,minute,job){
  this.hour =  hour;
  this.minute = minute;
  this.active = false;
  this.job = job;
}

module.exports = Alarm;
