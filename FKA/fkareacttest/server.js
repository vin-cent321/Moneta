var express = require("express");
var app = express();
var $ = require('jquery');

var PORT = process.env.PORT || 8080;
var PORT2 = process.env.PORT || 8081;



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });