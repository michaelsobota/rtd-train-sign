//filters raw RTD trips data for a given array of route_ids, `myRoute`

//import modules
var fs = require('fs');

//define a function to load and filter the file. TODO: possibly export this as a module
function loadAndFilter(myRoute) {
	myRoute = myRoute.split(","); //take input and make it an array
	var output = []; // set an empty array where we will put the results
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('./data_feeds/trips.txt')
	}); //create an interface that is a read stream

	//process that read stream and split the csv, place it into an array as JSON
	lineReader.on('line', function (line) {
	    var jsonFromLine = {};
	    var lineSplit = line.split(',');
	    // select columns you want
	    jsonFromLine.block_id = lineSplit[0];
	    jsonFromLine.route_id = lineSplit[1];
	    jsonFromLine.direction_id = lineSplit[2];
	    jsonFromLine.trip_headsign = lineSplit[3];
	    jsonFromLine.service_id = lineSplit[5];
	    jsonFromLine.trip_id = lineSplit[6];
	    // ...  place more columns here if you need them
	    if (myRoute.includes(jsonFromLine.route_id)) {
	        output.push(jsonFromLine);
	    }
	});

	//when the stream closes, write the results to a file
	lineReader.on('close', function (line) {
	    fs.writeFile('./data_feeds/filtered/filtered_trips.json', JSON.stringify(output), (err) => {
	    	if (err) throw err;
	    });
	});
}

console.log("Processing trips.txt for route_id(s)", process.argv[2]);
loadAndFilter(process.argv[2]);