# RTD Train Sign Program
### Takes RTD GTFS Data and displays it on an LED sign

This program is designed to load RTD GTFS data, filter it to a specific stop/direction combo and display it on an Raspberry Pi driven LED sign.

After installing dependencies and loading data, run the index.js program to poll the filtered data and display upcoming trips.

To run:

`npm install`

`npm run-script load-all`

`npm start`

As of now, the load-all script will pull RTD data in the Google Transit Feed Specification format, and filter it down to NB trains from the Arapahoe at Village Center Station. The main program will then read this data and print out trains departing in the next 20 minutes.

The goal will be to use this data to feed an assembled LED RGB display driven by an FPGA and hang the sign in our offices.