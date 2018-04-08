# maproulette 2 geojson converter

This program converts the output of maproulettes API call to download all tasks in a given challenge to a geojson file which can be locally opened in QGIS.

Maproulettes Api seems to be lacking a way to download the tasks (and the status of them) in a geoJSON format.  But they do export to JSON, therefor in order to open this with GIS software, we need to transform it into geoJSON

See [Maproulette API documentation](http://maproulette.org/docs/swagger-ui/index.html?url=/assets/swagger.json) for more information.

## 

* [Installation](#Installation)
* [Documentation](#Documentation)
* [Credits](#Credits)
* [License](#License)

<a name="Installation"></a>
## How to instal and use it

This little program is written in node.js , so just clone the repository , cd into the local repository directory and install the node packages

    npm install

you probably want to chmod +x the 

<a name="Documentation"></a>
## Documentation

Download the task list in json format using curl 

    curl -X GET "http://maproulette.org/api/v2/challenge/2789/tasks?limit=0"  \
        -H "accept: application/json" -H "content-type: application/geojson" -o tasks.json

Then run the convertor on this file

    convert tasks.json tasks.geojson

<a name="Credits"></a>
## Credits

Author Glenn Plas

<a name="License"></a>
## License

The MIT License [(MIT)](https://github.com/gplv2/maproulette2geojson/blob/master/LICENSE).


