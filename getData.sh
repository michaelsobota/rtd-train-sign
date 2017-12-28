#!/bin/sh
mkdir -p data_feeds
cd data_feeds
curl -LOJ http://www.rtd-denver.com/GoogleFeeder/google_transit.zip
unzip -u google_transit.zip
rm google_transit.zip
cd ..