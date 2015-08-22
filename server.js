#!/bin/env node

var express = require('express');
var fs      = require('fs');
var morgan = require('morgan');
var app = express();
var apiKey = process.env.BART_API_KEY;
var http = require('http');

var Application = function() {

    var self = this;

    self.setupVariables = function() {
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    };

    self.initializeServer = function() {
        self.app = express();
        self.app.use(morgan('combined'));
        self.app.use('/api/stations', require('./src/controllers/stations')(apiKey))
        self.app.use(express.static('client'));
        
    };


    self.initialize = function() {
        self.setupVariables();
        self.initializeServer();
    };

    self.start = function() {
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};  

var app = new Application();
app.initialize();
app.start();

