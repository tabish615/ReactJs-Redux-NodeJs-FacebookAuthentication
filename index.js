var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port =  process.env.PORT|| 4200;
var cors = require('cors');
var bodyParser = require('body-parser');


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test123@ds161700.mlab.com:61700/quiz_app')
    .then(() => {
      console.log('Start');
    })
    .catch(err => {
        console.error('App starting error:', err.stack);
        process.exit(1);
    });


var itemRouter = require('./src/routes/itemRouter');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', itemRouter);

app.listen(port, function(){
    console.log('Server is running on Port: ',port);
  });