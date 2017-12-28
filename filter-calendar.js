//filters raw RTD calendar data for active schedules

//import modules
var fs = require('fs');
var moment = require('moment');

//define a function to load and filter the file. TODO: possibly export this as a module
function loadAndFilter() {
	var output = []; // set an empty array where we will put the results
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('./data_feeds/calendar.txt')
	}); //create an interface that is a read stream

	//process that read stream and split the csv, place it into an array as JSON
	lineReader.on('line', function (line) {
	    var jsonFromLine = {};
	    var lineSplit = line.split(',');
	    // select columns you want
	    jsonFromLine.service_id = lineSplit[0];
	    jsonFromLine.start_date = lineSplit[1];
	    jsonFromLine.end_date = lineSplit[2];
	    jsonFromLine.monday = lineSplit[3];
	    jsonFromLine.tuesday = lineSplit[4];
	    jsonFromLine.wednesday = lineSplit[5];
	    jsonFromLine.thursday = lineSplit[6];
	    jsonFromLine.friday = lineSplit[7];
	    jsonFromLine.saturday = lineSplit[8];
	    jsonFromLine.sunday = lineSplit[9];
	    // ...  place more columns here if you need them
	    if(moment(jsonFromLine.start_date, "YYYYMMDD") < moment(moment(), "YYYYMMDD") && moment(moment(), "YYYYMMDD") < moment(jsonFromLine.end_date, "YYYYMMDD")) {
	    	output.push(jsonFromLine);
	    }
	    
	});

	//when the stream closes, write the results to a file
	lineReader.on('close', function (line) {
	    fs.writeFile('./data_feeds/filtered/filtered_calendar.json', JSON.stringify(output), (err) => {
	    	if (err) throw err;
	    });
	});
}

console.log("Processing calendar.txt");
loadAndFilter();