//function for change on drop down menu 
function optionChanged(selectedCity){
  
//   // check if value is selected in dropdown
  console.log (selectedCity);

  //read json file for the data 
  const json_file = "static/resources/weather.json"

  d3.json(json_file).then((data) => {
    console.log(data);
  
  
  d3.select("#selDataset").html("");

  // select the metadata array from the json file 
  data.metadata.forEach(city =>
        {
         // console.log(city.City);

        d3.select ("#selDataset").append('option').attr('value', city.City).text(city.City);
        });
  

  
  //selected value is passed 
  d3.select ("#selDataset").node().value = selectedCity;
  

  //filter metadata for selected city on dropdown 
  const citySelect = data.metadata.filter(city => (city.City == selectedCity));
  console.log(citySelect);

  const panelDisplay = d3.select("#sample-metadata");
  panelDisplay.html("");
  Object.entries(citySelect[0]).forEach(item=> 
     {
        // console.log(item);
        if (item[0] == "Date"){
          item [1] = moment.unix(item[1]).format("MM/DD/YYYY");
        }
        panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
        
     });
         
 
  // gauge chart for humidity
  const gaugeDisplay = d3.select("#gauge");
  gaugeDisplay.html("");

  const humidity = citySelect[0].Humidity;

  const gaugeData = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: humidity,
    title: { text: "Humidity" },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { range: [null, 100] },
      bar: { color: "white" },
      steps: [
        { range: [0, 20], color: "lightgray" },
        { range: [20, 40], color: "gray" },
        { range: [40, 60], color: "lightblue" },
        { range: [60, 80], color: "blue" },
        { range: [80, 100], color: "lightgreen" }
      ]
    }
  }];

  const layout = { width: 600, height: 400, margin: { t: 0, b: 0 } };

  Plotly.newPlot("gauge", gaugeData, layout);
  

  const barDisplay = d3.select("#bar");
    barDisplay.html("");

  
  const idCity = data.metadata5.filter(city => (city.City == selectedCity));
    // console.log("------");
    // console.log(idCity[0]["Max_Temp"]);
    ytemp = [];
    xdate = [];

  for  ( var i = 0; i < idCity.length; i++){

    // console.log(idCity[i]["Max_Temp"]);
    var maxTemp = idCity[i]["Max_Temp"];
    ytemp.push(maxTemp);
    console.log(ytemp);
    // console.log(maxTemp);
    var dateFor = idCity[i]["Date"];
    xdate.push(dateFor);
    console.log(xdate);
    // console.log(maxTemp);
    // console.log(dateFor);
    
}

  let trace = {
    y: ytemp,
    x: xdate, 
    type: 'bar',
    orientation: "v",
    text:  ytemp,


  };
    layout_bar = {
        title: '5 Day Max Temperature Forecast', 
        xaxis: {title: 'Date', tickangle: -38, tickvals: xdate, ticktext: xdate}, 
        yaxis: {title: 'Temperature (Celsius)'},
        
    };
    Plotly.newPlot("bar", [trace], layout_bar);


    //bubble chart for wind speed 

    const bubbleDisplay = d3.select("#bubble");
    bubbleDisplay.html("");

    const idCloud = data.metadata5.filter(city => (city.City == selectedCity));
    // console.log(idWind[0]["Wind Speed"]);

    ycloud = [];
    xdate1 = [];
    for ( var i = 0; i < idCloud.length; i++){
      var cloudiness = idCloud[i]["Cloudiness"];
      ycloud.push(cloudiness);
      // console.log(ycloud);
      var dateCloud = idCloud[i]["Date"];
      xdate1.push(dateCloud);
      // console.log(xdate1);
    }

    let trace1 = {
      y: ycloud,
      x: xdate1,
      type: 'bubble',
      mode: 'markers',
      marker: {
        size: ycloud,
        color: xdate1,
        
      },
    };
    layout1 = {
      title: '<b>5 Day Cloud Cover</b>',
      xaxis: {title: 'Date', tickangle: -38, tickvals: xdate1, ticktext: xdate1},
      yaxis: {title: 'Cloudiness (%)', range: [0, 120]},
      showlegend: false,
      height: 600,
      width: 1000,
    };
    Plotly.newPlot("bubble", [trace1], layout1);


});

    
}


  //start at New york City
  optionChanged("New York City");





  








