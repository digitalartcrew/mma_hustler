var mongoose = require('mongoose'),
express = require('express'),
request = require('request'),
cors = require('cors'),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require('method-override'),
morgan = require('morgan');

app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method'));
app.use(cors());

app.get('/news', function(req,res){
	var url = 'http://ufc-data-api.ufc.com/api/v1/us/news';
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
    console.log(body); 
}
});
});

app.listen(3000,function(req,res){
	console.log("App running on localhost 3000");
});