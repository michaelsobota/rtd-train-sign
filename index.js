//displays upcoming trains based on filtered RTD stop_times data

//load modules
var moment = require('moment');
var _ = require('underscore');
//metadata notes
//Arapahoe at Village Center Station NB Trains - stop_id = 34008
//Arapahoe at Village Center Station SB Trains - stop_id = 25990

//load external data
var stop_data = require('./data_feeds/filtered/filtered_stops.json');
var trip_data = require('./data_feeds/filtered/filtered_trips.json');
var cal_data = require('./data_feeds/filtered/filtered_calendar.json');

//setup current day of week
var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var d = new Date();
var dayname = days[d.getDay()];

function scheduleChecker() {
	for(var trip in stop_data) {
		depart = moment(stop_data[trip].departure_time, "HH:mm:ss");
		if(depart.diff(moment(), 'minutes') <= 20 && depart.diff(moment(), 'minutes') >= 0) { //check TIME
			if(_.where(cal_data, {service_id: _.where(trip_data, {trip_id: stop_data[trip].trip_id})[0].service_id})[0] !== undefined && _.where(cal_data, {service_id: _.where(trip_data, {trip_id: stop_data[trip].trip_id})[0].service_id})[0][dayname] === "1") {
				console.log(_.where(trip_data, {trip_id: stop_data[trip].trip_id})[0].trip_headsign, depart.diff(moment(), 'minutes'), "minutes");
			} //for each stop_time that is within 20 minutes, check trip service_id against schedule data and print
		}
	}
}

function run(){
	setInterval(scheduleChecker, 30000);
}

run();


