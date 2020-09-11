// Create map object
var myMap = L.map("map", {
    center: [36.9989, -109.0452],
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

//  link for All earthquake date for the past 7 days
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// pull the geoJson data from the link above




