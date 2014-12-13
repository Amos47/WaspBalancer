
var exec = require("child_process").exec;
var ports = require("../shared/shared.js").ports;

var util  = require('util');
var spawn = require('child_process').spawn;

for(var i = 0; i < ports.length; ++i){
    ls    = spawn('nodejs', ['app.js', ports[i]]);
	ls.stdout.on('data', dataFunc(i));

	ls.stderr.on('data', dataFunc(i));

	ls.on('exit', dataFunc(i, true));
}

function dataFunc(i, isExit){
	return function (data) {
		if(!isExit)
	  		console.log(i + ': ' + data);
	  	else
  			console.log('child process '+i+' exited with code ' + data);
	}
}

