var spawn = require('child_process').spawn;

for(var i = 2; i <= 25; ++i){
	spawn("cp", ["./pages/page1.html", "./pages/page"+i+".html"]);
}