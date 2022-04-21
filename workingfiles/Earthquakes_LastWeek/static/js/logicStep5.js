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

// create an earthquake layer for our map
let earthquakes = new L.layerGroup();

// define an object that contains the overlay (this will be visible all the time)
let overlays = {
    Earthquakes: earthquakes
};

// create map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [satelliteStreets]
});



// pass our map layers into our layers control and add the layers control to the map (user can pick which layers are visible)
L.control.layers(baseMaps, overlays).addTo(map);


// create a function which returns the style data for each earthquake (magnitude -> radius)
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// function to convert earthquake magnitude to a proportional radius to show on our map
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// function to convert earthquake magnitude to a color on our colorscale to show on our map
function getColor(magnitude) {
    if (magnitude > 5) {return "#ea2c2c"};
    if (magnitude > 4) {return "#ea822c"};
    if (magnitude > 3) {return "#ee9c00"};
    if (magnitude > 2) {return "#eecc00"};
    if (magnitude > 1) {return "#d4ee00"};
    return "#98ee00";
}

// grabbing GeoJSON data --- earthquake data from last 7 days
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data (MULTIPLE points)
    L.geoJSON(data, {
        // turn each feature to a circle marker on our map
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        // set style for each cirlemarker
        style: styleInfo,
        // create a popup for each circlemarker
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);
    earthquakes.addTo(map);
    // create a legend control object
    let legend = L.control({
        position: 'bottomright'
    });

    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'info legend');
        const magnitudes = [0,1,2,3,4,5];
        const colors = [ "#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
        // loop through magnitudes and colors and generate a label with a colored square for each interval
        for (let i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i>" +
            magnitudes[i] + (magnitudes[i+1] ? "&ndash;" + magnitudes[i+1]+"<br>":"+");
        }
        return div;
    };
    legend.addTo(map);
});

