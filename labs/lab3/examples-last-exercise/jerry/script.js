
// load the json file from local
d3.json("data/trash.json").then(gotData);

function gotData(newData){
  let sum = getItemQuantity(newData);
  visualizeData(sum);
}

function visualizeData(data){

    // create a chart
    let chart01 = d3.select("#viz-container")
                                  .append("svg")
                                    .attr("id", "chart01")
                                    .attr("width", 800)
                                    .attr("height", 800)
                                    .style("background-color", "black")
    ;

    let keys = Object.keys(data);
    let values = [];
    for(let i = 0; i < keys.length; i ++ ){
      values[i] = data[keys[i]];
    }
    console.log(values);

    // add shapes to my chart
    chart01.selectAll(".bar").data(values).enter().append("circle")
                                    .attr("cx", getRandom)
                                    .attr("cy", getRandom)
                                    .attr("r", getWidth)
                                    .attr("fill", "white")
    ;
}


function getRandom(){
  return Math.random() * 600;
}

function getWidth(data){
    return data * 5;
}


function getItemQuantity(data){

    console.log(data);
    // get the keys of each object
    let keys = Object.keys(data[0]);
    let sumData = {};

    // loop through the data list
    for (let i = 0 ; i < data.length; i ++ ){
        // for each data point
        let datum = data[i];

        // get the item in this data point
        let item = datum["item"];

        // if the key is already in the sum object, add the quantity
        if (item in sumData) {
            sumData[item] += datum["quantity"];
        }
        // if the key is not in the sum object, create the key and add the quantity
        else{
            sumData[item] = datum["quantity"];
        }

    }

    // show the total quantity for each item
    console.log(sumData);
    return sumData;

}
