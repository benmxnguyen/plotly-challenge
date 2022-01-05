async function main() {
  // load in data
  const response = await fetch("../data/samples.json");
  const data = await response.json();
  console.log(data);
  console.log(data.names);
  console.log(data.samples);

  // populate dropdown with subjects
  const dropdown = document.querySelector("#selDataset");
  for (let i = 0; i < data.names.length; i++) {
      let subject = data.names[i];
      // console.log(subject)
      let option = document.createElement("option");
      option.setAttribute("value", parseInt(subject));
      option.textContent = parseInt(subject);
      dropdown.append(option);
  }

  // create metadata info
  var metadataPanel = document.querySelector('#sample-metadata')

  var idHeader = document.createElement("h6");
  idHeader.textContent = `id: ${data.metadata[0].id}`
  var ethnicityHeader = document.createElement("h6");
  ethnicityHeader.textContent = `ethnicity: ${data.metadata[0].ethnicity}`
  var genderHeader = document.createElement("h6");
  genderHeader.textContent = `gender: ${data.metadata[0].gender}`
  var ageHeader = document.createElement("h6");
  ageHeader.textContent = `age: ${data.metadata[0].age}`
  var locationHeader = document.createElement("h6");
  locationHeader.textContent = `location: ${data.metadata[0].location}`
  var bbtypeHeader = document.createElement("h6");
  bbtypeHeader.textContent = `bbtype: ${data.metadata[0].bbtype}`
  var wfreqHeader = document.createElement("h6");
  wfreqHeader.textContent = `wfreq: ${data.metadata[0].wfreq}`

  metadataPanel.append(idHeader)
  metadataPanel.append(ethnicityHeader)
  metadataPanel.append(genderHeader)
  metadataPanel.append(ageHeader)
  metadataPanel.append(locationHeader)
  metadataPanel.append(bbtypeHeader)
  metadataPanel.append(wfreqHeader)
  
  // create horizontal bar chart
  var trace = [{
      type: 'bar',
      x: data.samples[0].sample_values.slice(0, 10),
      y: data.samples[0].otu_ids.slice(0, 10).map(otu => `OTU ${otu}`),
      tooltip: Object.values(data.samples[0].otu_labels.slice(0, 10)),
      orientation: 'h'
    }];
  
  var layoutbar = {
  title: `Top Ten OTus in SampleID: ${data.metadata[0].id}`,
  yaxis:{
      autorange:'reversed'
  }}
  
  Plotly.newPlot('bar', trace, layoutbar);

  // create bubble chart
  var trace1 = {
      x: data.samples[0].otu_ids,
      y: Object.values(data.samples[0].sample_values),
      mode: 'markers',
      text: Object.values(data.samples[0].otu_labels),
      marker: {
        color: Object.values(data.samples[0].otu_ids),
        size: Object.values(data.samples[0].sample_values)
      }
    };

  let data2 = [trace1]

  var layoutbubble = {
    xaxis: {
      title: {
        text: 'OTU ID',
      }
    }
  }

  Plotly.newPlot('bubble', data2, layoutbubble);

  // create gauage chart
  var data3 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: data.metadata[0].wfreq,
      title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
      gauge: {
        axis: { range: [null, 9], tickwidth: 3, tickcolor: "red" },
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "#66FF00", name: '0-1' },
          { range: [1, 2], color: "#99FF00", name: '1-2' },
          { range: [2, 3], color: "#CCFF00", name: '2-3' },
          { range: [3, 4], color: "#FFFF00", name: '3-4' },
          { range: [4, 5], color: "#FFCC00", name: '4-5' },
          { range: [5, 6], color: "#FF9900", name: '5-6' },
          { range: [6, 7], color: "FF6600", name: '6-7' },
          { range: [7, 8], color: "FF3300", name: '7-8' },
          { range: [8, 9], color: "FF0000", name: '8-9' },
        ],
        showticklabels: true
      },
      ids: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"]
    }
  ];
  
  var layout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('gauge', data3, layout);

  // On change to the DOM

  document.querySelector("#selDataset").addEventListener("change", event => {
  // Create a custom function to return a specific id's data
  function sampleID(sample) {
  return sample.id == event.target.value;
  }    
    
  // Initialize an empty array for the sample's data
  let filteredIDData = data.samples.filter(sampleID);
  let filteredMetadata = data.metadata.filter(sampleID);
  console.log(filteredMetadata)
  console.log(filteredIDData)

  //updating metadata
  idHeader.textContent = `id: ${filteredMetadata[0].id}`
  ethnicityHeader.textContent = `ethnicity: ${filteredMetadata[0].ethnicity}`
  genderHeader.textContent = `gender: ${filteredMetadata[0].gender}`
  ageHeader.textContent = `age: ${filteredMetadata[0].age}`
  locationHeader.textContent = `location: ${filteredMetadata[0].location}`
  bbtypeHeader.textContent = `bbtype: ${filteredMetadata[0].bbtype}`
  wfreqHeader.textContent = `wfreq: ${filteredMetadata[0].wfreq}`

  //updating bar chart
  Plotly.restyle("bar", "x", [filteredIDData[0].sample_values.slice(0, 10)]);
  Plotly.restyle("bar", "y", [filteredIDData[0].otu_ids.slice(0, 10).map(otu => `OTU ${otu}`)]);
  Plotly.restyle("bar", "text", [filteredIDData[0].otu_labels.slice(0, 10)]);
  Plotly.relayout("bar", 'title', `Top Ten OTus in SampleID: ${filteredMetadata[0].id}`)
  
  //updating bubble chart
  Plotly.restyle("bubble", "x", [filteredIDData[0].otu_ids]);
  Plotly.restyle("bubble", "y", [filteredIDData[0].sample_values]);
  Plotly.restyle("bubble", "text", [filteredIDData[0].otu_labels]);
  let marker = {
    color: filteredIDData[0].otu_ids,
    size: filteredIDData[0].sample_values
  }
  Plotly.restyle("bubble", "marker", marker);
  
  //update gauge chart
  Plotly.restyle("gauge", "value", [filteredMetadata[0].wfreq])
  });
}
main();