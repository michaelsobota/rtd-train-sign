//displays upcoming trains based on filtered RTD stop_times data

//load modules
var filter = require('./filter.js');
var moment = require('moment');
//metadata notes
//Arapahoe at Village Center Station NB Trains - stop_id = 34008
//Arapahoe at Village Center Station SB Trains - stop_id = 25990

var data = require('./data_feeds/filtered_stops.json');

function scheduleChecker() {
	for(var trip in data) {
		depart = moment(data[trip].departure_time, "HH:mm:ss");
		if(depart.diff(moment(), 'minutes') <= 20 && depart.diff(moment(), 'minutes') >= 0) { //check TIME
			console.log("E - Union Station", depart.diff(moment(), 'minutes'), "minutes");
			//console.log(data[trip]);
		}
	}
}

function run(){
	setInterval(scheduleChecker, 10000);
}

run();