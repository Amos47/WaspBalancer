

var spawn = require('child_process').spawn;

var files = require('fs').readdirSync("./pages");

var totalThreads = 8;

var testsRun = 0;
var numTests = 50;

for(var i = 0; i < totalThreads; ++i){
	spawnNewTest(++testsRun);
}

function dataFunc(i, isExit){
	return function (data) {
		if(!isExit)
	  		console.log(i + ': ' + data);
	  	else{
	  		if(testsRun < numTests)
	  			spawnNewTest(++testsRun);
	  	}
	}
}

function spawnNewTest(i){

	var params = [
		"-t1", "-d30", "-c" + Math.floor(400 / 12), 
		"http://localhost:8021/"+files[Math.floor(Math.random()*files.length)]
	];
    ls    = spawn('wrk', params);
	ls.stdout.on('data', dataFunc(i));

	ls.stderr.on('data', dataFunc(i));

	ls.on('exit', dataFunc(i, true));
}

