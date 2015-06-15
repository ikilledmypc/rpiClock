$(document).ready(function(){
  $("#newAlarm").click(function(){
    var alarm = {};
    alarm.hour = $("#hour").val();
    alarm.minute = $("#minute").val();
    alarm.url = $('#url').val();

    console.log(alarm);
    $.ajax({
      "type": "POST",
      "url": "/alarms",
      "Content-Type": "application/json",
      "success" : function(data){
        console.log(data);
        var alarmData = JSON.parse(data);
        $("#alarm-list").append("<a class='alarmBody list-group-item'>" + alarmData.hour+":"+alarmData.minute + "</a>");
      },
      "data": alarm
    });
  });

  $.getJSON( "/alarms", function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      items.push( "<a class='alarmBody list-group-item'>" + key + "</a>" );
    });
    console.log(items);
    $('#alarm-list').append(items.join(""));
  });


});
