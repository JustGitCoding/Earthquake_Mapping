// add console.log to check to see if our code is working.
console.log("Working");

// create map variable to hold L.map of 'mapid' which references the id="map" div in our index.html
// let map = L.map("mapid", {
//     center: [40.7, -94.5],   // latitude, longitude
//     zoom: 4 // should be between 0-18
// });
// let map = L.map('mapid').setView([40.7, -94.5], 4);

// // Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([37.5, -122.5], 10);

// // Create the map object with center and zoom level for full world view
// let map = L.map('mapid').setView([30, 30], 2);

// // Add GeoJSON data --- ONE data point
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};


// create a geoJSON 'layer' to our map (not needed since we can chain below)
// L.geoJSON(sanFranAirport).addTo(map);

// create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Street: streets,
    Dark: dark
};

// create map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// // add 'streets' tile layer to the map (commented out because we add baseMaps instead which contains both layers)
// streets.addTo(map);

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
})



// // using pointToLayer (on a SINGLE point)
// L.geoJSON(sanFranAirport, {
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng).bindPopup(
//             "<h2>" + feature.properties.name + "</h2><hr>" + "<h3>" + feature.properties.city +", "+ feature.properties.country + "</h3>");
//     }
// }).addTo(map);


// // using onEachFeature (on a SINGLE point)
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup(
//             "<h2>Airport Code: " + layer.feature.properties.faa + "</h2><hr>" + "<h3>Airport Name: " + layer.feature.properties.name + "</h3>");
//     }
// }).addTo(map);