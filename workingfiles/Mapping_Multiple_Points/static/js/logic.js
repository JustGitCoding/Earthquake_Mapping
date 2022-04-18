// add console.log to check to see if our code is working.
console.log("Working");

// create map variable to hold L.map of 'mapid' which references the id="map" div in our index.html
// let map = L.map("mapid", {
//     center: [40.7, -94.5],   // latitude, longitude
//     zoom: 4 // should be between 0-18
// });
let map = L.map('mapid').setView([40.7, -94.5], 4);

// create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapbox_api_key
});

// add 'graymap' tile layer to the map
streets.addTo(map);

// // add a 'marker' to the map for Los Angeles
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// let circle = L.circle([34.0522, -118.2437], {
//     color: 'yellow',
//     radius: 300
// }).addTo(map);

// let circleMarker = L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: 'red',
// }).addTo(map);

// pull cities data from cities.js
let cityData = cities;

// loop through the array of objects and create a marker for each city
// <hr> adds a line break in our popup
// toLocaleString() adds a thousands comma separator
cityData.forEach(city => {
    console.log(city)
    L.circleMarker(city.location, {
        radius: city.population/200000,
        weight: 4
    }).bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>").addTo(map)
});