var express = require('express');
var app = express();
var port =  process.env.PORT|| 4200;
var cors = require('cors');
var bodyParser = require('body-parser');

var itemRouter = require('./src/routes/itemRouter');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', itemRouter);

app.listen(port, function(){
    console.log('Server is running on Port: ',port);
  });