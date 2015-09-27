var app = require('express')();
var express=require('express');
var server = require('http').Server(app);
var http = require('http');
//if (process.env.NODE_ENV !== 'production'){
	var longjohn= require('longjohn');
//}
longjohn.async_trace_limit = -1;  // unlimited
var request = require('request');
var https = require('https');
var cors = require('cors');
var cfenv = require('cfenv');
var parseString = require('xml2js').parseString;

// create a new express server
app.use(cors());
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

server.listen(1337, '127.0.0.1', function() {

	console.log("server starting on " + appEnv.url);
});

//name
	//walmrt
		//items
	//macy
		//items
app.get('/getWalmartInfo', function(req, res) {
	request('http://api.walmartlabs.com/v1/search?query='+req.query.name+'&format=json&apiKey=6xjhg2baqmrjw5u5a6ywzxzc', function (error, response, body) {
		if (!error && response.statusCode == 200) {
				// Show the HTML for the Google homepage. 
    		res.end(body);
    		//res.end();
    	}
    });
});

app.get('/getSuperMarketInfo', function(req, res) {
	request('http://www.supermarketapi.com/api.asmx/COMMERCIAL_SearchByProductName?APIKEY=3c1446d05d&ItemName='+req.query.name, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var xml = body;
			parseString(xml, function (err, result) {
				res.send(result.ArrayOfProduct_Commercial.Product_Commercial);
				res.end();
			});

		}
	});
});
//

app.get('/get/getBills', function(req, res) {
	request('http://api.reimaginebanking.com/accounts/55e94a6cf8d8770528e61a8c/bills?key=104fc14f0a0f118116f8a666021d3323', function (error, response, body) {
		if (!error && response.statusCode == 200) {
				res.send(body);
				res.end();

		}
	});
});


app.get('/get/getAccountInfo', function(req, res) {
	request('http://api.reimaginebanking.com/accounts?type=Checking&key=104fc14f0a0f118116f8a666021d3323', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			
				res.send(body);
				res.end();

		}
	});
});


app.get('/get/getCustomerInfo', function(req, res) {
	request('http://api.reimaginebanking.com/customers/55e94a6af8d8770528e60b7e/accounts?key=104fc14f0a0f118116f8a666021d3323', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			
				res.send(body);
				res.end();

		}
	});
});

//get merchants
//http://api.reimaginebanking.com/merchants?lat=33.0&lng=-96.10&rad=100&key=104fc14f0a0f118116f8a666021d3323


//deposit
//http://api.reimaginebanking.com/deposits/104fc14f0a0f118116f8a666021d3323?key=104fc14f0a0f118116f8a666021d3323

