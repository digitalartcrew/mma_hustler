require('dotenv').load();

var mongoose = require('mongoose'),
express = require('express'),
request = require('request'),
cors = require('cors'),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require('method-override'),
morgan = require('morgan');

var config = require('./config');



app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method'));
app.use(cors());

var url = 'http://ufc-data-api.ufc.com/api/v1/us/';

app.get('/news', function(req,res){
	request(url+'news', function(error, response, body) {
	  if (error || response.statusCode !== 200) return res.status(404).json({error: error});
	  res.status(200).json(body);
	});
});

app.get('/fighters', function(req,res){
	request(url+'fighters', function(error, response, body) {
	  if (error || response.statusCode !== 200) return res.status(404).json({error: error});
	  res.status(200).json(body);
	});
});

app.get('/events', function(req,res){
	request(url+'events', function(error, response, body) {
	  if (error || response.statusCode !== 200) return res.status(404).json({error: error});
	  res.status(200).json(body);
	});
});

app.get('/media', function(req,res){
	request(url+'media', function(error, response, body) {
	  if (error || response.statusCode !== 200) return res.status(404).json({error: error});
	  res.status(200).json(body);
	});
});

app.get('/mma', function(req,res){
	
	request('https://api.foursquare.com/v2/venues/search?client_id='+config.fs.client_id+'&+client_secret='+config.fs.client_secret+'&ll=40.7,-74&query=mma', function(error, response, body) {
	  if (error || response.statusCode !== 200) return res.status(404).json({error: error});
	  res.status(200).json(body);
	  console.log(body);
	});
});




app.listen(config.web.port,function(req,res){
	console.log("App running on localhost 3001");
});