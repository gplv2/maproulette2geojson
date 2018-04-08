#!/usr/bin/env node

var path = require('path');
var fs = require("fs");
var gjcheck = require('geojson-validation');

// Command line arguments
var args = process.argv.slice(2);
console.dir(args);

var input = null;
var output = null;

if(!!args[0]){
    input = args[0];
} else {
    console.log('Error: Please pass atleast an input file to convert');
    process.exit(0);
}

var filename = path.basename(input, '.json');
if(!!args[1]){
    output = args[1];
} else {
    console.log('Notice: No output file specified, using geojson extension with basename');
    output = filename + ',geojson';
}

console.log("Reading file "+ input +" ...\n");
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

console.log("Writing to "+ output +" !");
fs.writeFile(output,JSON.stringify(geojson), function(err) {
    if(err) {
        console.log(err);
    }
    console.log("all data saved in "+ output +" !");
});

console.log("done...\n");
