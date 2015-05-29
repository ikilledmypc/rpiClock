$(document).ready(function(){
  $("#print").click(function(){

    var message = {
      message : "{test message ipsum"
    };

    $.ajax({
      type: "POST",
      url: "/",
      data: message,
      dataType: "application/json"
    });
  });
  $("#newAlarm").click(function(){
    var alarm = {};
    alarm.hour = $("#hour").val();
    alarm.minute = $("#minute").val();

    console.log(alarm);
    $.ajax({
      "type": "POST",
      "url": "/",
      "Content-Type": "application/json",
      "data": alarm
    });
  });


});
