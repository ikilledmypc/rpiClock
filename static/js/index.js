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
  })


});
