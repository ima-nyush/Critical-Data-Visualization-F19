

function gotData(incomingData){
  console.log(incomingData);

  // create svg
  let viz = d3.select("body")
    .append("svg")
      .attr("width", 500)
      .attr("height", 500)
  ;

  let datagroup = viz.selectAll(".datagroup").data(incomingData)
    .enter()
      .append("g")
      .attr("class", "datagroup")
    ;
  datagroup.append("circle")
      .attr("cx", 200)
      .attr("cy", 300)
      .attr("r", 50)
    ;

    datagroup.append("text")
        .attr("x", 20)
        .attr("y", 30)
        .text("hello")
        ;
}

d3.json("data.json").then(gotData);
