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