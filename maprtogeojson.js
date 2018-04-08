#!/usr/bin/env node

var input = 'pretty.geojson';
var output = 'outputdata.geojson';

var fs = require("fs");
var gjcheck = require('geojson-validation');

console.log("Reading file...\n");
var data = fs.readFileSync(input);
console.log("Done\n");

console.log("Parsing JSON data...\n");
var jsonContent = JSON.parse(data);
console.log("Done\n");

console.log("Creating geojson file...\n");
var geojson = {};
geojson['type'] = 'FeatureCollection';
geojson['features'] = [];

for(var key in jsonContent) {
    //console.log(typeof feature); console.log(feature);
    var feature = JSON.parse(JSON.stringify(jsonContent[key].geometries.features)).pop();
    if ( gjcheck.valid(feature) && gjcheck.isFeature(feature) ) {
        geojson['features'].push(feature);
    } else {
        console.log('Feature is not valid geojson');
        process.exit(0);
    }
}

fs.writeFile(output,JSON.stringify(geojson), function(err) {
    if(err) {
        console.log(err);
    }
    console.log("saved in "+ output +" !");
});

console.log("All done...\n");
