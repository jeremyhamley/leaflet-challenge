// Create map object
var myMap = L.map("map", {
    center: [46.9989, -109.0452],
    zoom: 4
  });
  

// Add tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

//  link for All earthquake date for the past day
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Pull the raw data from url
d3.json(url, function(data) {
    // pull the features object and assign to quakeFeatures
    var quakeFeatures = (data.features);
    console.log(quakeFeatures);

    // Loop through the quakeFeatures data
    for (var i = 0; i < quakeFeatures.length; i++) {

        var color = "";
        if (quakeFeatures[i].properties.mag <= 1) {
          color = "yellow";
        }
        else if (quakeFeatures[i].properties.mag <= 2) {
          color = "greenyellow";
        }
        else if (quakeFeatures[i].properties.mag <= 3) {
            color = "yellowgreen";
          }
        else if (quakeFeatures[i].properties.mag <= 4) {
          color = "orange";
        }
        else if (quakeFeatures[i].properties.mag <= 5) {
            color = "orangered";
          }
        else {
          color = "red";
        }
        
        var quakeLocs = [quakeFeatures[i].geometry.coordinates[1],quakeFeatures[i].geometry.coordinates[0]]

        // Add circles to map
        // console.log(quakeLocs)
        L.circle(quakeLocs, {
          fillOpacity: 0.75,
          color: "grey",
          weight: 0.5,
          fillColor: color,
          // Adjust radius
          radius: quakeFeatures[i].properties.mag * 50000
        }).bindPopup("<h2>Location: " + quakeFeatures[i].properties.place + "</h2> <hr> <h2>Magnitude : " 
            + quakeFeatures[i].properties.mag + "</h2><hr><p>" + new Date(quakeFeatures[i].properties.time) + "</p>").addTo(myMap);


      }


  });

