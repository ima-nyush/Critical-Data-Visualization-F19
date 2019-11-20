let w = 1200;
let h = 800;
let padding = 90

let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// initialise scales
let xScale = d3.scaleTime().range([padding, w-padding]);
let yScale = d3.scaleBand().range([padding, h-padding]);


// get data
d3.json("monarchs.json").then(function(incomingData){
  data = formatData(incomingData);

  let types = data.map(d=>d.type).filter(onlyUnique); //see onlyUnique function at bottom

  // xscale and axis
  xScale.domain( d3.extent(data, d=>d.date) )
  let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%-Y"));
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-padding)+")")
  ;
  xAxisGroup.call(xAxis);
  //yscale and axis
  yScale.domain(types);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+padding/2+",0)")

  ;
  yAxisGroup.call(yAxis);
  // style the y axis
  yAxisGroup.selectAll("line").attr("display", "none");
  yAxisGroup.selectAll("path").attr("display", "none");
  yAxisGroup.selectAll("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", "0")
  ;


  let graphGroup = viz.append("g").attr("class", "graphgroup");

  let datagroups = graphGroup.selectAll(".datagroup").data(data).enter()
    .append("g")
      .attr("class", "datagroup")
      .attr("transform", function(d){
        // console.log(d);
        return "translate("+ xScale(d.date) +","+ (yScale(d.type) + yScale.bandwidth()/2 )+")"
      })
  ;

  datagroups.append("circle")
    .attr("r", 10)
    .attr("opacity", 0.5)
    .attr("class", "datacircle")
  ;

  // datagroups.append("text")
  //   .text((d)=> d.event)
  //   .attr("y", 30)
  //   // .attr("class", "datacircle")
  // ;


  // datagroups.filter(function(d){
  //
  //   return d.type == "diplomacy";
  //
  // }).select("circle").attr("class", "diplomacyCircle")



  datagroups
    .on("mouseover", function(d, i){
      console.log(d, i);
      let element = d3.select(this);
      element.select("circle").transition().attr("r", 30);
    })
    .on("mouseout", function(){
      let element = d3.select(this);
      element.select("circle").transition().attr("r", 10);
    })
  ;



});


let timeParse = d3.timeParse("%Y");

function formatData(incoming){
  let keys = Object.keys(incoming.Dates);
  return keys.map((d)=>{
    incoming.Dates[d].date = timeParse(incoming.Dates[d].date)
    return incoming.Dates[d];
  });

}

//from: https://stackoverflow.com/a/14438954
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
