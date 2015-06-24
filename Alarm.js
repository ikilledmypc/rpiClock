
var Alarm = function(hour,minute,job){
  this.hour =  hour;
  this.minute = minute;
  this.active = false;
  this.job = job;
}

Alarm.prototype.cancel = function(){
  this.job.cancel();
};

module.exports = Alarm;
