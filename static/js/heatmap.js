var myMap = L.map("map", {
  center: [37.6872, -97.3301],
  zoom: 4.5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



const json = "static/resources/weather.json";

d3.json(json).then(function(data) {

console.log(data);

var heatArray = [];

for (var i = 0; i < data.metadata.length; i++) {
  var location = [data.metadata[i].Lat,data.metadata[i].Lng]
  var city = [data.metadata[i]["City"]]
  var maxtemp = [data.metadata[i]["Max_Temp"]]
  var humidity = [data.metadata[i]["Humidity"]]
  var wind = [data.metadata[i]["Wind Speed"]]
  L.marker(location,{
    opacity: 0.8,
    fillOpacity: 0.75,
    weight: 0.5,
    color: 'black',
    fillColor: 'green',
    radius: 10000
  }).bindPopup(`<p align = "left"> <strong>City:</strong> ${city} <br>
  <strong>Temperature:</strong> ${maxtemp} <br> <strong>Humidity:</strong> ${humidity} <br> <strong>Wind Speed: </strong> ${wind} </p>`).addTo(myMap)



  if (location) {
    heatArray.push([location[0],location[1],maxtemp]);
  }
}

});