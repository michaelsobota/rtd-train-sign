# RTD Train Sign Program
### Takes RTD GTFS Data and displays it on an LED sign

This program is designed to load RTD GTFS data, filter it to a specific stop/direction combo and display it on an Raspberry Pi driven LED sign.

After installing dependencies and loading data, run the index.js program to poll the filtered data and display upcoming trips.

To run:

`npm install`

`npm run-script load-all`

`npm start`