var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var http = require('http');
//if (process.env.NODE_ENV !== 'production'){
    var longjohn = require('longjohn');
//}
longjohn.async_trace_limit = -1; // unlimited
var request = require('request');
var https = require('https');
var cors = require('cors');
var cfenv = require('cfenv');
var parseString = require('xml2js').parseString;
var bodyParser = require('body-parser');

var async=require('async');
var list = ["Sugar", "Salt", "Cereal"];

page=0,lastPage=list.length-1;
async.whilst(function () {
  return page <= lastPage;
},
function (next) {
    console.log(list[page]);
var minIndex = -1;
        var min = 1000000000;
        var minName = '';
        var minImage = '';
        var minPrice = '';
        var walMac = 0; 
  request('http://api.walmartlabs.com/v1/search?query=' + list[page] + '&format=json&apiKey=6xjhg2baqmrjw5u5a6ywzxzc', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(response.body).items);
               for (var i = 0; i < 10; i++) {
                   //console.log(JSON.parse(response.body).items[i]);
                    if (JSON.parse(response.body).items[i].salePrice < min) {
                        min = JSON.parse(response.body).items[i].salePrice;
                        minPrice = min;
                        minName = JSON.parse(response.body).items[i].name;
                        minImage = JSON.parse(response.body).items[i].thumbnailImage;
                        minIndex = i;
                    }
               };
                request('http://www.supermarketapi.com/api.asmx/COMMERCIAL_SearchByProductName?APIKEY=3c1446d05d&ItemName=' + list[page], function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var xml = body;
                        parseString(xml, function(err, result) {
                            var itemsRes = (result.ArrayOfProduct_Commercial.Product_Commercial);
                           console.log(itemsRes);
                            for (var i = 0; i < itemsRes.length; i++) {
                                if (itemsRes[i].salePrice < min) {
                                    walMac = 1;
                                    min = itemsRes[i].Pricing[0];
                                    minPrice = min;
                                    minName = itemsRes[i].Itemname[0];
                                    minImage = itemsRes[i].ItemImage[0];
                                    minIndex = i;
                                }
                            };
                            var obj = {
                                'name': minName,
                                'price': minPrice,
                                'link': minImage,
                                'walMac': walMac
                            };
                            console.log(obj);
                            page++;
                            next();
                        });
};
});
}
});

},
function (err) {
  // All things are done!
});
