var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var Message = mongoose.model('Message', {
  msg: String
});

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.get('/api/message/', GetMessages)

app.post('/api/message', function(req, res){
  console.log(req.body);
  var message = new Message(req.body);
  message.save();
  res.status(200);
})

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
  if (!err) {
    console.log("we are connected to mongo");
  }
})

function GetMessages(req, res) {
  Message.find({}).exec(function(err, result) {
    res.send(result);
  }
)}

var server = app.listen(5000, function() {
  console.log('listening on port ', server.address().port)
})
