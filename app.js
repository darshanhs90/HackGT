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
app.use(bodyParser.urlencoded({
  extended: true
}));
// create a new express server
app.use(cors());
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
var finObj = [{
    'finalised': 0,
    'accepted': '0'
}];

var requests = {
    "user1": {
        "Walmart": ["Item1", "Item2", "Item3"],
        "Macys": ["Item1", "Item2", "Item3"]
    },
    "user2": {
        "Walmart": ["Item1", "Item2", "Item3"],
        "Macys": ["Item1", "Item2", "Item3"]
    },
    "user3": {
        "Walmart": ["Item1", "Item2", "Item3"],
        "Macys": ["Item1", "Item2", "Item3"]
    }
};
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

server.listen(1337, '127.0.0.1', function() {

    console.log("server starting on " + appEnv.url);
});
var balance = 0;
var list = ["Sugar", "Salt", "Cereal"];
request('http://api.reimaginebanking.com/customers/55e94a6af8d8770528e60b7e/accounts?key=104fc14f0a0f118116f8a666021d3323', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log();
        balance = (JSON.parse(body)[0].balance);
        console.log('balance is ' + balance);
    }
});

app.get('/getCustomerInfo', function(req, res) {
    request('http://api.reimaginebanking.com/customers/55e94a6af8d8770528e60b7e/accounts?key=104fc14f0a0f118116f8a666021d3323', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
            res.end();
        }
    });
});

app.get('/getWalmartInfo', function(req, res) {
    request('http://api.walmartlabs.com/v1/search?query=' + req.query.name + '&format=json&apiKey=6xjhg2baqmrjw5u5a6ywzxzc', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // Show the HTML for the Google homepage. 
            console.log('walmart response sent');
            res.end(body);
            //res.end();
        }
    });
});

app.get('/getSuperMarketInfo', function(req, res) {
    request('http://www.supermarketapi.com/api.asmx/COMMERCIAL_SearchByProductName?APIKEY=3c1446d05d&ItemName=' + req.query.name, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var xml = body;
            parseString(xml, function(err, result) {
                res.send(result.ArrayOfProduct_Commercial.Product_Commercial);
                console.log('supermarket response sent');
                res.end();
            });

        }
    });
});
//

app.get('/get/getBills', function(req, res) {
    request('http://api.reimaginebanking.com/accounts/55e94a6cf8d8770528e61a8c/bills?key=104fc14f0a0f118116f8a666021d3323', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
            res.end();

        }
    });
});


app.get('/get/getAccountInfo', function(req, res) {
    request('http://api.reimaginebanking.com/accounts?type=Checking&key=104fc14f0a0f118116f8a666021d3323', function(error, response, body) {
        if (!error && response.statusCode == 200) {

            res.send(body);
            res.end();

        }
    });
});

//http://api.reimaginebanking.com/accounts/55e94a6cf8d8770528e61a8d/transfers?key=104fc14f0a0f118116f8a666021d3323

app.get('/getTransfers', function(req, res) {
    request('http://api.reimaginebanking.com/accounts/55e94a6cf8d8770528e61a8d/transfers?key=104fc14f0a0f118116f8a666021d3323', function(error, response, body) {
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
app.get('/getBalance', function(req, res) {
    balance = parseFloat(balance).toPrecision(7);
    res.send({
        'balance': balance
    });
    res.end();
});

app.get('/setBalance', function(req, res) {
    balance = parseFloat(req.query.balance).toPrecision(7);
    res.end();
});

app.get('/getItems', function(req, res) {
    res.send(list);
    res.end();
});

app.get('/setItems', function(req, res) {
    list.push(req.query.itemName);
    res.end();
});


app.get('/addToWalmart', function(req, res) {
    requests.user1.Walmart.push(req.query.itemName);
    res.end();
});

app.get('/addToMacys', function(req, res) {
    requests.user1.Macys.push(req.query.itemName);
    res.end();
})

app.get('/getDeliverRequirements', function(req, res) {
    res.send(requests);
    res.send();
})


app.get('/finalisePayments', function(req, res) {

    request.post({
        headers:{'content-type':'application/json','Accept':'application/json'},
        url:     'http://api.reimaginebanking.com/accounts/55e94a6cf8d8770528e61a8d/transfers?key=104fc14f0a0f118116f8a666021d3323',
        json:    { 
            "medium": "balance",
            "payee_id": "55e94a6cf8d8770528e61a8c",
            "amount": req.query.amount
        }
    }, function(error, response, body){
        res.send('transaction created');
        res.end();
    });
})


app.get('/refresh', function(req, res) {
    res.send(requests);
    res.send();
})


app.get('/getDeals', function(req, res) {
    var deals = [];
    var j=0;
    while(j<list.length){
        var element = list[j];
        var minIndex = -1;
        console.log(element);
        var min = 1000000000;
        var minName = '';
        var minImage = '';
        var minPrice = '';
        var walMac = 0; //indicates from walmart,1 indicates from macy
        request('http://api.walmartlabs.com/v1/search?query=' + element + '&format=json&apiKey=6xjhg2baqmrjw5u5a6ywzxzc', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var itemsRes = (response.items);
                console.log(itemsRes);
                for (var i = 0; i < 10; i++) {
                    if (itemsRes[i].salePrice < min) {
                        min = itemsRes[i].salePrice;
                        minPrice = min;
                        minName = itemsRes[i].name;
                        minImage = itemsRes[i].thumbnailImage;
                        minIndex = i;
                    }
                };
                request('http://www.supermarketapi.com/api.asmx/COMMERCIAL_SearchByProductName?APIKEY=3c1446d05d&ItemName=' + element, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var xml = body;
                        parseString(xml, function(err, result) {
                            var itemsRes = (result.ArrayOfProduct_Commercial.Product_Commercial);
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
                            deals.push(obj);
                            j++;
                            if (i == list.length - 1) {
                                res.send(deals);
                                res.end();
                            }
                        });
};
});
}
});
}
})


var deals=[];
var async=require('async');
app.get('/getDeals1',function(req,res){
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
                            deals.push(obj);
                            page++;
                            if(page==lastPage)
                            {
                                res.send(deals);
res.end();
                            }
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


})