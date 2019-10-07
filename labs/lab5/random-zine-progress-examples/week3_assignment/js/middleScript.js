const canvasWidth = 2400;
const canvasHeight = 800;
const paddingX = 30;
const paddingY = 30;
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

let dayWidth = Math.floor( ( (canvasWidth - paddingX * 2 ) / 7 ) );
let locationWidth = Math.floor( dayWidth / 6 );

let itemWidth = locationWidth;
let itemHeight = itemWidth;

let picWidth = itemWidth - 26;
let picHeight = picWidth;

materialColors = {paper: "#dec9c4", plastic: "#75979c", wood: "#D1BA84"};
purposeColors = {};

const colors = [
'#289fa9',
'#c77ac2',
'#aae0e8',
'#ebaf25',
'#b82e66',
'#0c4e6b',
'#7bb160',
'#81cde9',
'#c79ab4',
'#be5c3e',
'#d79890',
'#7cc6bd',
'#afafa0',
'#507ac3',
'#998f92',
'#e3c4a0',
'#51886c',
'#62a6a3',
'#5d9bd9',
'#a881e8',
'#2959d4',
'#116885',
'#f0e186',
'#a26749',
'#849665',
'#5e624b',
'#c24759',
'#f8c215',
'#12aaa0',
'#173465',
'#76a164',
'#fcab67'
];
let colorI = 1;

// load the json file from local
d3.json("data/trash.json").then(gotData);

// calculate how many weeks we have

// create an array to divide data based on day
// let processedData = new Array(numOfWeeks);

// 7 days a week
let days = new Array(7);

// in each day, there are six locations, each location has several items
for (let i = 0; i < days.length; i ++ ){
  days[i] = new Array(6);
  for(let j = 0; j < days[i].length; j ++ ){
    days[i][j] = new Array();
  }
}

//console.log(days);

function gotData(myData){
  processData(myData);
  visualizeData(days);
}

// divide data and get color arrays
function processData(data){

    //console.log(data);
    // get the shared keys of the data
    let keys = Object.keys(data[0]);
    //console.log(keys);

    // loop through the data and
    // divide them into days -> locations
    // get item and give a color comb to it

    for (let i = 0; i < data.length; i ++ ){
        let datum = data[i];
        for (let j = 0; j < keys.length; j ++ ){
          let k = keys[j];
          let index = getLocation(datum);
          // to divide data
          if (k == "day") {
              switch(datum[k]){
                case "Monday":
                    days[0][index].push(datum);
                    break;
                case "Tuesday":
                    days[1][index].push(datum);
                    break;
                case "Wednesday":
                    days[2][index].push(datum);
                    break;
                case "Thursday":
                    days[3][index].push(datum);
                    break;
                case "Friday":
                    days[4][index].push(datum);
                    break;
                case "Saturday":
                    days[5][index].push(datum);
                    break;
                case "Sunday":
                    days[6][index].push(datum);
                    break;
              }
          }
          if (k == "purpose"){
            //console.log(Object.keys(purposeColors));
            //console.log(datum[k], !(datum[k] in purposeColors), colors[colorI]);
            if (!(datum[k] in purposeColors)) {
              purposeColors[datum[k]] = colors[colorI];
              colorI += 1;
            }
          }
        }

    }

    // console.log(days);

}

function visualizeData(days){

      // create a chart
      let chart = d3.select("#container")
                                    .append("svg")
                                      .attr("id", "chart")
                                      .attr("width", 2400)
                                      .attr("height", 800)
                                      .style("background-color", "white")
      ;

      // create Day divs
      let dayGroups = chart.selectAll(".days").data(days).enter().append("g").attr("class", getDaysClass).attr("transform", getDaysPos);

      // create text for day
      dayGroups.append("line")
                      .attr("x1", dayWidth - 20)
                      .attr("y1", 0)
                      .attr("x2", dayWidth - 20 )
                      .attr("y2", canvasHeight - paddingY * 2 )
                      .attr("style", "strokeWidth: 1; stroke: black;")
      ;

      dayGroups.append("text")
                      .text(function(d, i){
                        console.log(d, i);
                        return dayNames[i];
                      })
                      .attr("x", 0)
                      .attr("y", 0)
                      .attr("fill", "black")
                      .attr("font-family", "Courier New")
                      .attr("font-size", "14px")
      ;

      let locationGroups = dayGroups.selectAll(".locations").data(function(d,i,j) { return d; }).enter().append("g").attr("class", getLocationsClass).attr("transform", getLocationsPos);

      let items = locationGroups.selectAll(".items").data(function(d,i,j) { return d; }).enter().append("g").attr("class", getItemsClass).attr("transform", getItemsPos);


      // create text for location
      locationGroups.append("text")
                      .text(function(d){
                        if (d.length > 0) { return d[0].location; }
                      })
                      .attr("x", 0)
                      .attr("y", 15)
                      .attr("fill", "black")
                      .attr("font-family", "Courier New")
                      .attr("font-size", "10px")
                      .attr("transform", "rotate(90)")
      ;

      // create purpose shape & color
      items.append("rect")
                      .attr("x", -5)
                      .attr("y", -5)
                      .attr("width", 4)
                      .attr("height", picHeight + 10)
                      .attr("fill", getMaterialFill)
      ;

      // create type(throwaway) shape & color
      items.append("rect")
                      .attr("x", picWidth+1)
                      .attr("y", picHeight+1)
                      .attr("width", 4)
                      .attr("height", 4)
                      .attr("fill", getTypeFill)
      ;

      // create frame
      items.append("rect")
                .attr("x", -1)
                .attr("y", -1)
                .attr("width", picWidth + 2)
                .attr("height", picHeight + 2)
                // .attr("rx", 2)
                // .attr("ry", 2)
                .attr("fill", "white")
                // .attr("strokeWidth", "0.5px")
                // .attr("stroke", "#e8e8e8")
      ;

      // create material shape and color, and position them based on time
      items.append("rect")
                      .attr("x", 0)
                      .attr("y", getPosDataByTime)
                      .attr("width", picWidth)
                      .attr("height", getHeightDataByTime)
                      .attr("fill", getPurposeFill)
      ;

      // create item image
      items.append("image")
                      .attr("xlink:href", getItemImage)
                      .attr("x", 0)
                      .attr("y", 0)
                      .attr("width", picWidth)
                      .attr("height", picHeight)
      ;

}


// for group class and positioning

function getLocation(datum){
    let location = datum["location"];
    //console.log(datum, location);
    switch(location){
        case "home":
            return 0; // as an index
        case "cafe/restaurant":
            return 1; // as an index
        case "familyMart/store":
            return 2; // as an index
        case "school":
            return 3; // as an index
        case "office":
            return 4; // as an index
        default:
            return 5;
    }
}

function getDaysClass(data, i){
    return "days day" + i;
}

function getDaysPos(data, i){
    let x = dayWidth * i + 30;
    let y = paddingY;
    return "translate(" + x + "," + y + ")";
}

function getLocationsPos(data, i){
    let x = i * itemWidth;
    let y = 20
    return "translate(" + x + "," + y + ")";
}

function getLocationsClass(data, i){
    return "locations location" + i
}

function getItemsClass(datum){
    return "items " + datum["item"];
}

function getItemsPos(datum, i){
    x = 0;
    y = i * (itemHeight - 10);
    return "translate(" + x + "," + y + ")";
}

function getPosDataByTime(datum, i){
  let time = parseInt(datum.time.split(":")[0]);
  let y;
  // console.log(time)
  if (time >= 0 && time <= 12) { y = 0; }
  else if (time > 12 && time < 19) { y = picHeight / 3; }
  else { y = 2 * picHeight / 3; }
  // return "translate(" + x + "," + y + ")"
  return y;
}

function getHeightDataByTime(datum, i){
  let time = parseInt(datum.time.split(":")[0]);
  let h;
  // console.log(time)
  if (time >= 0 && time <= 12) { h = picHeight; }
  else if (time > 12 && time < 19) { h = picHeight * 2 / 3; }
  else { h = picHeight / 3; }
  // return "translate(" + x + "," + y + ")"
  return h;
}

// for each item, each layer, coloring and positioning

function getItemsFill(datum, i){
    let item = datum.item;
    return colorCombs[item];
}

function getMaterialFill(datum){
    let material = datum.material;
    return materialColors[material];
}

function getPurposeFill(datum){
    let purpose = datum.purpose;
    return purposeColors[purpose];
}

function getTypeFill(datum){
    let t = datum.type;
    if (t == "recyclable") {
        return "#56AE77";
    }
    else{
        return "#DB421C";
    }
}

function getItemImage(datum){
    item = datum.item;
    return "images/" + item + ".png"
}
