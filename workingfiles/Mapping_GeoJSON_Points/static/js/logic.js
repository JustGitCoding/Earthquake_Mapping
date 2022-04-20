// add console.log to check to see if our code is working.
console.log("Working");

// create map variable to hold L.map of 'mapid' which references the id="map" div in our index.html
// let map = L.map("mapid", {
//     center: [40.7, -94.5],   // latitude, longitude
//     zoom: 4 // should be between 0-18
// });
// let map = L.map('mapid').setView([40.7, -94.5], 4);

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};


// create a geoJSON 'layer' to our map (not needed since we can chain below)
// L.geoJSON(sanFranAirport).addTo(map);

// create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapbox_api_key
});

// add 'graymap' tile layer to the map
streets.addTo(map);

// // using pointToLayer
// L.geoJSON(sanFranAirport, {
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng).bindPopup(
//             "<h2>" + feature.properties.name + "</h2><hr>" + "<h3>" + feature.properties.city +", "+ feature.properties.country + "</h3>");
//     }
// }).addTo(map);


// using onEachFeature
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup(
            "<h2>Airport Code: " + layer.feature.properties.faa + "</h2><hr>" + "<h3>Airport Name: " + layer.feature.properties.name + "</h3>");
    }
}).addTo(map);