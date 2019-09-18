
let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    //changing the attribute -
                    // which one i chose and to what i want to change it
                    .attr("width", 800)
                    .attr("height", 800)

;


var y=0;
var numColumns = 10;

function color(datapoint){
  if (datapoint.complimentType=="Personality"){
    return "blue";
  }

  else if (datapoint.complimentType=="Appearance"){
    return "green";
  }

  else if (datapoint.complimentType=="Work"){
    return "yellow";
  }

  else if (datapoint.complimentType=="Birthday related"){
    return "pink";
  }

}

function increasingX(datapoint, i){
return 60*(i%numColumns)+30;
}



function increasingY(datapoint, i){
    if (i%numColumns==0){
      y++;
    }
    return 60*y;
}



function gotData(newData){   // this function expects to be passed data




  console.log(newData);   // print it to the console to verify



  viz.selectAll("circle").data(newData).enter().append("circle")
                                      .attr("cx", increasingX)
                                      .attr("cy", increasingY)
                                      .attr("r", 30)
                                      .attr("fill", color)
  ;








}

d3.json("data.json").then(gotData);
