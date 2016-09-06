var mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser');
var Architecture = require('./models/archModel.js');



var db;

if (process.env.ENV ==='test') {
    db = mongoose.connect('mongodb://localhost/system_api_test');
    console.log('TEST database')
 }else{
    db = mongoose.connect('mongodb://localhost/system_api');
    console.log('PROD database')
 }


var archRouter = require('./routes/archRoutes.js')(Architecture);


var app = express();
var port =process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/architecture/',archRouter);

app.get('/', function(req, res){
   res.send('welcome');
});

app.listen(port, function(){
    console.log('Application has started on port:    ' + port);
});

module.exports = app;