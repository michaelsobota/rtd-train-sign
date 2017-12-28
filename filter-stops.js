//filters raw RTD stop_times data for a given stop, `myStop`

var fs = require('fs');
function loadAndFilter(myStop) {
	var output = [];
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('./data_feeds/stop_times.txt')
	});

	lineReader.on('line', function (line) {
	    var jsonFromLine = {};
	    var lineSplit = line.split(',');
	    // select columns you want
	    jsonFromLine.trip_id = lineSplit[0];
	    jsonFromLine.arrival_time = lineSplit[1];
	    jsonFromLine.departure_time = lineSplit[2];
	    jsonFromLine.stop_id = lineSplit[3];
	    // ...  
	    if (jsonFromLine.stop_id === myStop) {
	        output.push(jsonFromLine);
	    }
	});

	lineReader.on('close', function (line) {
	    fs.writeFile('./data_feeds/filtered/filtered_stops.json', JSON.stringify(output), (err) => {
	    	if (err) throw err;
	    });
	});
}
console.log("Processing stop_times.txt");
loadAndFilter(process.argv[2]);