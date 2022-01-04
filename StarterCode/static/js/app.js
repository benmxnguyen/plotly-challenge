async function main() {
    // load in data
    const response = await fetch("../../data/samples.json");
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
    // determine top 10 OTUs
    // console.log(data.samples[0].sample_values.sort(function compareFunction(
    //     firstNum, secondNum) {
    //     return firstNum, secondNum;
    // }).slice(0, 10));
    // let topTenOTUs = data.samples[0].sample_values.sort(function compareFunction(
    //     firstNum, secondNum) {
    //     return firstNum, secondNum;
    // }).slice(0, 10);
    // let indexListTopTen = []
    // for (let i = 0; i < topTenOTUs.length; i++) {
    //     let indexOfOTU = data.samples[0].sample_values.indexOf(topTenOTUs[i])
    //     indexListTopTen.push(indexOfOTU)
    // };
    // console.log(indexListTopTen);
    // console.log(data.samples[130]);

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
        x: Object.values(data.samples[0].sample_values.slice(0, 10)),
        values: Object.values(data.samples[0].otu_ids.slice(0, 10)),
        text: Object.values(data.samples[0].otu_labels.slice(0, 10)),
        orientation: 'h'
      }];
    
    var layout = {
    yaxis:{
        autorange:'reversed'
    }}
    
    Plotly.newPlot('bar', trace, layout);

    // create bubble chart
    var trace1 = {
        x: Object.values(data.samples[0].otu_ids),
        y: Object.values(data.samples[0].sample_values),
        mode: 'markers',
        text: Object.values(data.samples[0].otu_labels),
        marker: {
          color: Object.values(data.samples[0].otu_ids),
          size: Object.values(data.samples[0].sample_values)
        }
      };

    let data2 = [trace1]
    Plotly.newPlot('bubble', data2);

    // On change to the DOM
    // document.querySelector("#selDataset").addEventListener("change", event => {
        
    // // Initialize an empty array for the sample's data
    // let data1 = [];
    // if ()
    // sampleOfInterest = (data.samples.id == event.target.value) 

    // Plotly.restyle("pie", "values", [data]);
    // });
    // }
    }
const data = 
main();