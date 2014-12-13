The Robin and the Wasp
======================

This is a research project to test the efficiency of using a Polish Wasp algorithm instead
of using a Round Robin algorithm in a load balancer.

The structure is as follows:

-- proposal.pdf 		// Original project proposal  
-- Comp4107Project.pdf // Final report  
-- Readme.md 			// This file.  
-- test.js 			// Run the benchmarking, run with "node test.js"  
-- copyPages.js 		// Copy page1.html 23 times, run with "node tcopyPages.js"  
-- pages 				// Contains all the html pages for the static server  
 |-- page[1-25].html 		//lorem ipsum  
-- results				//results from various tests.  
 |-- *  
-- roundrobin			// the basic round robin load balancer  
 |-- app.js  				//run with "node app.js"  
-- wasptask				// the modified polish wasp load balancer  
 |-- app.js 					//run with "node app.js"  
-- shared				//	shared resources  
 |-- shared.js 				//constains all the port numbers  
-- staticServer		// static server serves all files in pages  
 |-- app.js 				// run with "node app.js [port-number]"  
 |-- start-static.js 		// runs a new instance of "node app.js" with each port number in shared.js  
-- wrk					// open source benchmarking program  
 |-- *