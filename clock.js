var express = require('express');
var vash = require('vash');
var lcdlib = require('./lcdManager');
var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();
app.use(express.static(__dirname + '/static'));
app.use(jsonParser);

app.set('view engine','vash');

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function(req,res){
  console.log(req.body);
  lcdlib.printMessage(req.body.message);
  res.write("200");
});

var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Clock config listening at http://%s:%s', host, port);

});
