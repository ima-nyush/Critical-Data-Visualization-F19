let w = 1200;
let h = 800;
let padding = 90;

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;

//
// // IMPORT DATA
d3.json("italy.geojson").then(function(geoData){
//
//   // PRINT DATA
  console.log(geoData);
//
//   // SCALES (to translate data values to pixel values)
//   let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
//   let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
//   let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
//   let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);
let projection = d3.geoEquirectangular()
  .center([12.7, 42.9])
  .translate([w/2, h/2])
  .fitExtent([ [0, 0], [w, h]  ], geoData)
;


//
//   // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
//   let lineMaker = d3.line()
//       .x(function(d){
//         return xScale(Number(d.year));
//       })
//       .y(function(d){
//         return yScale(Number(d.birthsPerThousand));
//       })
//   ;
let pathMaker = d3.geoPath(projection);
//
//   // CREATE SHAPES ON THE PAGE!
//   viz.datum(incomingData)
//     .append("path")
//       .attr("class", "line")
//       .attr("d", lineMaker)
//       .attr("fill", "none")
//       .attr("stroke", "black")
//       .attr("stroke-width", 8)
//   ;
viz.selectAll("path").data(geoData.features).enter()
  .append("path")
  .attr("d", pathMaker)
;

//
//
//
})
