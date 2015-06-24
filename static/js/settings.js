/**
 * Created by tim on 19-6-15.
 */
$(document).ready(function(){

    $.getJSON("settings/brightness/",function(data){
        $("#brightness").val(data);
    });

    $('#apply').click(function(){
        $.ajax({
            "type": "POST",
            "url": "settings/brightness/",
            "Content-Type": "application/json",
            "success" : function(data){
                alert("brightness set to:" + data)
            },
            "data": {amount : $("#brightness").val()}
        });
    });
});