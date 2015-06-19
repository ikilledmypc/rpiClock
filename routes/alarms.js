/**
 * Created by tim on 19-6-15.
 */
var express = require('express');
var router = express.Router();
var lcdlib = require('./lcdManager');
var alarmManager = require('./AlarmManager')


router.get("/",function(req,res){
    console.log(alarmManager.alarms);
    res.send(JSON.stringify(alarmManager.alarms));
});

router.post("/cancel",function(req,res){
    console.log("alarm canceled");
    if(alarmManager.isAlarming()){
        alarmManager.cancelAlarm();
    }
    res.sendStatus(200);
});

router.post("/",function(req,res){
    lcdlib.printMessage(["alarm set for:",req.body.hour+":"+req.body.minute],10000);
    alarmManager.setRadioAlarm(req.body.hour, req.body.minute,req.body.url);
    res.send(JSON.stringify(req.body));
});