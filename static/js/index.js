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
        $("#alarm-list").append("<div  id="+alarmData.hour+""+alarmData.minute+" class='alarmBody list-group-item'>" + alarmData.hour+":"+alarmData.minute + " <a onclick='cancelAlarm(\""+ alarmData.hour+":"+alarmData.minute +"\"); return false;'  style='color:red;'  href=''> <span class='glyphicon glyphicon-remove-circle'></span></a></div>");
      },
      "data": alarm
    });
  });

  $.getJSON( "/alarms", function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      items.push( "<div  id="+key.replace(":","")+" class='alarmBody list-group-item'>" + key +
          " <a onclick='cancelAlarm(\""+key+"\"); return false;' style='color:red;'  > " +
          "<span class='glyphicon glyphicon-remove-circle'></span>" +
          "</a></div>" );
    });
    console.log(items);
    $('#alarm-list').append(items.join(""));
  });


});
function cancelAlarm(alarm){
    $.ajax({
        "type": "DELETE",
        "url": "/alarms/"+alarm,
        "Content-Type": "application/json",
        "success" : function(data){
            $("#"+data.replace(":","")).hide();
        },
        "data":{alarm : alarm}
    });
}
