// // Create map object
// var myMap = L.map("map", {
//     center: [46.9989, -109.0452],
//     zoom: 4
//   });
  
 
// // Add tile layer to the map
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);

//  link for All earthquake date for the past day
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// // Pull the raw data from url
// d3.json(url, function(data) {
//     // pull the features object and assign to quakeFeatures
//     var quakeFeatures = (data.features);
//     console.log(quakeFeatures);

//     // Loop through the quakeFeatures data
//     for (var i = 0; i < quakeFeatures.length; i++) {

//         var color = "";
//         if (quakeFeatures[i].properties.mag <= 1) {
//           color = "yellow";
//         }
//         else if (quakeFeatures[i].properties.mag <= 2) {
//           color = "greenyellow";
//         }
//         else if (quakeFeatures[i].properties.mag <= 3) {
//             color = "yellowgreen";
//           }
//         else if (quakeFeatures[i].properties.mag <= 4) {
//           color = "orange";
//         }
//         else if (quakeFeatures[i].properties.mag <= 5) {
//             color = "orangered";
//           }
//         else {
//           color = "red";
//         }
        
//         var quakeLocs = [quakeFeatures[i].geometry.coordinates[1],quakeFeatures[i].geometry.coordinates[0]]

//         // Add circles to map
//         // console.log(quakeLocs)
//         L.circle(quakeLocs, {
//           fillOpacity: 0.75,
//           color: "grey",
//           weight: 0.5,
//           fillColor: color,
//           // Adjust radius
//           radius: quakeFeatures[i].properties.mag * 50000
//         }).bindPopup("<h2>Location: " + quakeFeatures[i].properties.place + "</h2> <hr> <h2>Magnitude : " + quakeFeatures[i].properties.mag + "</h23>").addTo(myMap);
//       }


//   });











// Pull data from url
d3.json(url, function(data) {
    // Send the data.features object to the quakeFeatures function (below)
    quakeFeatures(data.features);
  });
  
  
  function quakeFeatures(earthquakeData) {
  
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h2>Location: " + feature.properties.place +
        "</h2><hr><h2>Magnitude: " + feature.properties.mag + "</h2><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });

    
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
  }
  



  function createMap(earthquakes) {
  
    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [36.9989, -109.0452],
      zoom: 4,
      layers: [streetmap, earthquakes]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }
  



