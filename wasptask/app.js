/*
    This code is used as the proxy server. Not reinventing this work.
    It's really lightweight and simple, perfect for my purpose.

    For this version I have made some modifactions to the way the responding server is decided.

*/

/*
  simple-balancer.js: Example of a simple round robin balancer

  Copyright (c) Nodejitsu 2013

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var httpProxy = require('http-proxy');
var http = require('http');
//
// A simple round-robin load balancing strategy.
// 
// First, list the servers you want to use in your rotation.
//

var ports = require("../shared/shared.js").ports;
//var addresses = [];

// polist related variables
var wasps = [];
var learnIncrement = 10;
var forgettingIncrement = 1;
var minResistance = 1;
var maxResistance = 1000;


for(var i = 0; i < ports.length; ++i){
  wasps.push(Wasp(ports[i]));
}
var initalResistance = wasps.length;

var proxy = httpProxy.createServer();
proxy.on('error', function(err, req, res) {
    res.end();
});

http.createServer(function (req, res) {
  //
  // On each request, get the first location from the list...
  //
  var target = { target: handleRequest(req.url) };

  //
  // ...then proxy to the server whose 'turn' it is...
  //
  console.log('balancing request to: ', target);
  proxy.web(req, res, target);

  //
  // ...and then the server you just used becomes the last item in the list.
  //
  //addresses.push(target.target);
}).listen(8021);

// Rinse; repeat; enjoy.


// hacky constructor
function Wasp(port) {
  var w = {};
  w.address = {
    host:"localhost",
    port: ports[i]
  }
  w.resistance = {};
  return w;
}

var handleRequest = function(request){
  var performingWasp = null;
  //handle the request
  while(!performingWasp){
    var i = Math.floor(Math.random() * wasps.length)
    if(willPerformTask(wasps[i], request)){
      updateResistanceOnPerform(wasps[i], request);
      performingWasp = wasps[i];
    }
  }
  //console.log("Found wasp : " +performingWasp.address + "\n for request : " + request);
  //update all of the failing ants
  for(var i = 0; i < wasps.length; ++i){
    if(wasps[i] != performingWasp){
      updateResistanceOnIgnore(wasps[i], request);
    }
  }
  //return the target
  return performingWasp.address;
}


var willPerformTask = function(wasp, request){
  if(!wasp.resistance[request]) 
    wasp.resistance[request] = initalResistance; // this is where the request is instanciated if not allready.

  return Math.random() <= 1 / (1 + wasp.resistance[request]); // constant stimulous of 1
}

var updateResistanceOnPerform = function(wasp, request){
  wasp.resistance[request] -= learnIncrement;
  if(wasp.resistance[request] < minResistance) wasp.resistance[request] = minResistance;
}

var updateResistanceOnIgnore = function(wasp, request){
  wasp.resistance[request] += forgettingIncrement;
  if(wasp.resistance[request] > maxResistance) wasp.resistance[request] = maxResistance;
}