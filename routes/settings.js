/**
 * Created by tim on 19-6-15.
 */

var express = require('express');
var router = express.Router();
var pwm = require('pi-blaster.js');
var path = require('path');
var _currentBrightness = 100;
var rootDir = path.resolve(__dirname,"..");

//defaults-------------
setBrightness(_currentBrightness);


router.get("/", function(req,res){
    res.sendFile("/views/settings.html",{root : rootDir});
});

router.post("/brightness",function(req,res){
    _currentBrightness = req.body.amount;
    setBrightness(_currentBrightness);
    res.send(_currentBrightness);
});

router.get("/brightness",function(req,res){
    res.send(_currentBrightness);
});

function setBrightness(amount){
    console.log("setting brightness to: "+_currentBrightness);
    pwm.setPwm(18,amount/100);
}


module.exports = router;