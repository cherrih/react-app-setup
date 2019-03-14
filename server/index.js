var express = require('express');
var app = express();
var port = 3002;

app.use(express.static('public'));

app.listen(port, () => console.log('listening on: ', port));