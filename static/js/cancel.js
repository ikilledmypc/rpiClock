/**
 * Created by tim on 1-6-15.
 */
$(document).ready()
{
     $("#cancelAlarm").click(function () {
         $.ajax({
             url :"alarms/cancel",
             method: "POST",
             data : "bla",
             success :function(){
                 alert("alarm canceled");
                 location.reload(true);
             }
         })
     })

}