//displays upcoming trains based on filtered RTD stop_times data

//load modules
var moment = require('moment');
var _ = require('underscore');
//metadata notes
//Arapahoe at Village Center Station NB Trains - stop_id = 34008
//Arapahoe at Village Center Station SB Trains - stop_id = 25990

var stop_data = require('./data_feeds/filtered/filtered_stops.json');
var trip_data = require('./data_feeds/filtered/filtered_trips.json');

function scheduleChecker() {
	for(var trip in stop_data) {
		depart = moment(stop_data[trip].departure_time, "HH:mm:ss");
		if(depart.diff(moment(), 'minutes') <= 20 && depart.diff(moment(), 'minutes') >= 0) { //check TIME
			console.log(_.where(trip_data, {trip_id: stop_data[trip].trip_id})[0].trip_headsign, depart.diff(moment(), 'minutes'), "minutes - ", stop_data[trip].trip_id);
		}
	}
}
//TODO - de-dup trips based on service_id. service_id is referenced from calendar.txt
//service_ids have valid periods (stard_date, end_date), as well as days of the week they apply.
//will need to check against the given service_id to prove that scheudle is in use, and also reference for the relevant day

function run(){
	setInterval(scheduleChecker, 5000);
}

run();