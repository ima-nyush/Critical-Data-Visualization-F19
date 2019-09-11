

let viz = d3.select("#viz-container")
                  .append("svg")
                      .attr("id", "viz")
                      .attr("width", 800)
                      .attr("height", 800)
;
//
// // current selection <svg></svg>
//
// viz.attr("height", 500);
//
// let myCircle = viz.append("circle")
//             .attr("cx", 200)
//             .attr("cy", 100)
//             .attr("r", 50)
// ;
//
// myCircle.attr("fill", "white");


let myData = [3, 6, 8, 1, 5];

viz.selectAll("circle").data(myData).enter().append("circle")
                                        .attr("cx",120)
                                        .attr("cy", 400)
                                        .attr("r", 20)
;
