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
    var alarm = {
      hour: $("#hour").val();
      minute: $("#minute").val();
    }
    console.log(alarm);
  });


});
