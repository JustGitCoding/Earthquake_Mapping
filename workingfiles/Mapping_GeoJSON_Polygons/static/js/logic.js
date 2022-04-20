// add console.log to check to see if our code is working.
console.log("Working");

// create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapbox_api_key
});

// create dark view (second tile layer) that will be an option for our map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapbox_api_key
});

// create a base layer that holds both versions of the map
let baseMaps = {
    'Street': streets,
    'Satellite Street': satelliteStreets
};

// create map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [43.68, -79.39],
    zoom: 11,
    layers: [satelliteStreets]
});

// pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// do this AFTER titleLayer so that the map loads before we try and load individual data points
// pull airport data from my own Repo on GitHub
let torontoHoods = "https://raw.githubusercontent.com/JustGitCoding/Earthquake_Mapping/main/workingfiles/torontoNeighborhoods.json";


// create line style (so code below isn't as cluttered)
let myStyle = {
    color: "blue",
    weight: 1,
    fillColor: "yellow",
    fillOpacity: 0.3
};

// grabbing GeoJSON data --- MULTIPLE data points
d3.json(torontoHoods).then(function(data){
    console.log(data);
// Creating a GeoJSON layer with the retrieved data (MULTIPLE points)
L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h2> "+feature.properties.AREA_NAME+"</h2>")
    }
}).addTo(map);
});

