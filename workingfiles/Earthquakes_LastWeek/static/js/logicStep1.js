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
    'Satellite': satelliteStreets
};

// create map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [satelliteStreets]
});

// pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// create line style (so code below isn't as cluttered)
// let myStyle = {
//     color: "blue",
//     weight: 1,
//     fillColor: "yellow",
//     fillOpacity: 0.3
// };

// grabbing GeoJSON data --- earthquake data from last 7 days
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data (MULTIPLE points)
    L.geoJSON(data).addTo(map);
    //     , {
    //     style: myStyle,
    //     onEachFeature: function(feature, layer) {
    //         layer.bindPopup("<h2> "+feature.properties.AREA_NAME+"</h2>")
    //     }
    // }
    
});

