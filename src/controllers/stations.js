var express = require('express');
var router = express.Router();
var Bart = require('../models/bart');
var bodyParser = require('body-parser');
var cors = require('express-cors');

module.exports = function(apiKey){

  var bart = new Bart(apiKey);

  // Middleware to add CORS headers
  // router.use(cors({
  //   allowedOrigins: [
  //       '*'
  //   ]
  // }));
  
  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // accept CORS

  // Middleware to parse application/x-www-form-urlencoded
  router.use(bodyParser.urlencoded({ extended: false }));

  // Middleware to parse application/json
  router.use(bodyParser.json());

  // getStations
  router.get('/', function(req, res) {
    bart.getStations()
    .then(function(stations){
      return res.status(200).json(stations);
    })
    .catch(function(err){
      return res.sendStatus(503);
    });
  });
  // getRealTimeEstimates
  router.get('/:id', function(req, res) {
    if(!req.params.id || req.params.id === "") return res.sendStatus(400);
    bart.getRealTimeEstimates(req.params.id)
    .then(function(destinations){
      return res.status(200).json(destinations);
    })
    .catch(function(err){
      return res.sendStatus(503);
    });
  });

  return router;
};
