// add console.log to check to see if our code is working.
console.log("Working");

// create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapbox_api_key
});

// create dark view (second tile layer) that will be an option for our map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapbox_api_key
});

// create a base layer that holds both versions of the map
let baseMaps = {
    Light: light,
    Dark: dark
};

// create map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [44, -80],
    zoom: 2,
    layers: [dark]
});

// pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// do this AFTER titleLayer so that the map loads before we try and load individual data points
// pull airport data from my own Repo on GitHub
let airportData = "https://raw.githubusercontent.com/JustGitCoding/Earthquake_Mapping/main/workingfiles/majorAirports.json";


// grabbing GeoJSON data --- MULTIPLE data points
d3.json(airportData).then(function(data){
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data (MULTIPLE points)
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2>Airport Code: " + layer.feature.properties.faa + "</h2><hr>" + "<h3>Airport Name: " + layer.feature.properties.name + "</h3>");
        }
    }).addTo(map);
});