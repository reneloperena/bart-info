var request = require('request');
var parseXML = require('xml2js').parseString;
var Promise = require("bluebird");
var qs = require('querystring');

module.exports = (function(){
  /*
   Bart
   params: apiKey
   description:
    Object used to consume bart.gov's api and provide information about the different services
    given an apiKey

  */
  function Bart(apiKey){
    this.key = apiKey;
  };

  /*
   .getStations
   params: (takes no parameters)
   returns: Promise (bluebird)
   description:
     This function consumes Bart.gov's api to get all the stations names and ids.  
  */
  Bart.prototype.getStations = function(){
    //http://api.bart.gov/api/stn.aspx?cmd=stns&key={apiKey}
    var key = this.key;
    return new Promise(function(resolve,reject){
        // Creates the query parameters for the GET request
        var queryParams = {cmd : 'stns', key: key};
        //Makes the request to api.bard.gov
        request('http://api.bart.gov/api/stn.aspx?'+ qs.stringify(queryParams) , function (error, response, body) {
          if (!error && response.statusCode == 200) {
            //will parse the XML response to a JSON object
            parseXML(body, function (err, result) {
              if(!err){
                //creates result array
                var stations = [];
                //For each one of the stations will take the name and the abbr to create a new station object
                for (var i = 0; i < result.root.stations[0].station.length; i++) {
                  stations.push({
                    name: result.root.stations[0].station[i].name[0],
                    id: result.root.stations[0].station[i].abbr[0]
                  });
                }
                resolve(stations);
              }else{
                reject(err);
              }
            });
          }else{
            reject(err);
          }
        });
      });
  };
  /*
   .getRealTimeEstimates
   params: id - station id
   returns: Promise (bluebird)
   description:
     This function consumes Bart.gov's api to provide information about real-time estimated
     departures for a given station (id).
  */
  Bart.prototype.getRealTimeEstimates = function(id){
    //http://api.bart.gov/api/etd.aspx?cmd=etd&orig={id}&key={apiKey}
    var key = this.key;
    return new Promise(function(resolve,reject){
        // Creates the query parameters for the GET request
        var queryParams = {cmd : 'etd',orig: id, key: key};
        //Makes the request to api.bard.gov
        request('http://api.bart.gov/api/etd.aspx?'+ qs.stringify(queryParams) , function (error, response, body) {
          if (!error && response.statusCode == 200) {
            //will parse the XML response to a JSON object
            parseXML(body, function (err, result) {
              var destinations = [];
              if(!err){
                var etd = result.root.station[0].etd;
                for (var i = 0; i < etd.length; i++) {
                //Creates each destination
                 var destination = { station:{
                    name: etd[i].destination[0],
                    id: etd[i].abbreviation[0]
                  }, estimates : []};
                  for (var x = 0; x < etd[i].estimate.length; x++) {
                    //Creates estimates for following trains
                    var estimate = {
                      minutes: etd[i].estimate[x].minutes[0],
                      platform: etd[i].estimate[x].platform[0],
                      length: etd[i].estimate[x].length[0],
                      color: etd[i].estimate[x].color[0],
                      hexcolor: etd[i].estimate[x].hexcolor[0],
                      bikeflag: etd[i].estimate[x].bikeflag[0]
                    };
                    destination.estimates.push(estimate);
                  };
                  destinations.push(destination);
                }
                resolve(destinations);
              }else{
                reject(err);
              }
            });
          }else{
            reject(err);
          }
        });
      });
  };

  return Bart;
})();