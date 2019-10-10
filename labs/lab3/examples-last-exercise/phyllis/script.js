let viz = d3.select("#viz-container")
                  .append("svg")
                      .attr("id", "viz")
                      .attr("width", 1500)
                      .attr("height", 800)
;

function gotData(newdata){
  console.log(newdata);

  let rects1 = viz.selectAll("rect").data(newdata);
  let rects2 = viz.selectAll("rect").data(newdata);
  let rects3 = viz.selectAll("rect").data(newdata);
  let rects4 = viz.selectAll("rect").data(newdata);
  let rects5 = viz.selectAll("rect").data(newdata);
  let rects6 = viz.selectAll("rect").data(newdata);


  // rects1.exit().remove();
  // rects2.exit().remove();

  rects1.enter().append("rect")
                          .attr("x", 100)
                          .attr("y", checkData1)
                          .attr("width", 5)
                          .attr("height", 5)
                          .attr("fill", "Tuesday")
  ;
  rects2.enter().append("rect")
                          .attr("x", 200)
                          .attr("y", checkData2)
                          .attr("width", 5)
                          .attr("height", 5)
                          .attr("fill", "red")
  ;
  rects3.enter().append("rect")
                          .attr("x", 300)
                          .attr("y", checkData3)
                          .attr("width", 5)
                          .attr("height", 5)
                          .attr("fill", "yellow")
  ;
  rects4.enter().append("rect")
                          .attr("x", 400)
                          .attr("y", checkData4)
                          .attr("width", 5)
                          .attr("height", 5)
                          .attr("fill", "purple")
  ;
  rects5.enter().append("rect")
                          .attr("x", 500)
                          .attr("y", checkData5)
                          .attr("width", 5)
                          .attr("height", 5)
                          .attr("fill", "blue")
  ;
  rects6.enter().append("rect")
                          .attr("x", 600)
                          .attr("y", checkData6)
                          .attr("width", 5)
                          .attr("height", 5)
                          .attr("fill", "orange")
  ;
}

d3.json("data.json").then(gotData)

function checkData1(datapoint){
  console.log(datapoint);
  console.log(datapoint.tuesday);
  return (datapoint.tuesday)*20;
}

function checkData2(datapoint){
  console.log(datapoint);
  console.log(datapoint.wednesday);
  return (datapoint.wednesday)*20;
}
function checkData3(datapoint){
  console.log(datapoint);
  console.log(datapoint.thursday);
  return (datapoint.thursday)*20;
}
function checkData4(datapoint){
  console.log(datapoint);
  console.log(datapoint.friday);
  return (datapoint.friday)*20;
}
function checkData5(datapoint){
  console.log(datapoint);
  console.log(datapoint.saturday);
  return (datapoint.saturday)*20;
}
function checkData6(datapoint){
  console.log(datapoint);
  console.log(datapoint.sunday);
  return (datapoint.sunday)*20;
}
