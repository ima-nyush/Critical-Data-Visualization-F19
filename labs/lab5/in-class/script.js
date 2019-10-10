let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;



function gotData(incomingData){
  console.log(incomingData);

  // FILTER METHOD
  function filterFunction(d){
    if(d.Code=="CHN"){
      return true;
    }else{
      return false;
    }
  }
  let filteredData = incomingData.filter(filterFunction);
  console.log(filteredData);

  let yearToDateObjectConverter = d3.timeParse("%Y");
  let test = yearToDateObjectConverter("2001");
  console.log(test);
  console.log(typeof(test));
  //
  // function findMinFunction(d){
  //   let year = d.Year;
  //   let properlyFormattedYear = yearToDateObjectConverter(year);
  //   return properlyFormattedYear;
  // }
  // let minYear = d3.min(filteredData, findMinFunction)
  // console.log(minYear);
  //
  // let maxYear = d3.max(filteredData, findMinFunction)
  // console.log(maxYear);

  // let domainArray = [minYear, maxYear];
  // console.log(domainArray);

  let alternativeDomainArray = d3.extent(filteredData, function(d){
    return yearToDateObjectConverter(d.Year);
  })
  console.log(alternativeDomainArray);

  let xPadding = 50;
  let xScale = d3.scaleTime().domain(alternativeDomainArray).range([xPadding, w - xPadding])

  console.log(xScale( yearToDateObjectConverter("2007") ))

  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);

  let xAxisYPos = h - 30;
  xAxisGroup.attr("transform", "translate(0, "+ xAxisYPos +")");


  let valueKey = "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)";
  let yScale = d3.scaleLinear()
                      .domain(
                        d3.extent(
                          filteredData, function(d){
                            return d[valueKey];
                          }
                        )
                      )
                      .range([  xAxisYPos  ,  30  ])
              ;

  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);

  yAxisGroup.attr("transform", "translate(" + xPadding + ", 0)")



}




d3.csv("new-cases-of-hiv-infection.csv").then(gotData);








/// foreach and map METHOD

// normal loop:
// for(let i = 0; i < incomingData.length; i++){
//   let element = incomingData[i];
//   ///
//   console.log("current: ", i);
//   console.log(element);
// }


// FOR EACH METHOD
// function printIndexAndValue(d){
//   console.log(d);
// }
// incomingData.forEach(function(d, i){
//   console.log("current: ", i);
//   console.log(d);
// });

// MAP METHOD
// function newDataPointBasedOnOldDatapoint(d){
//   let entity = d.Entity;
//   let year = d.Year;
//   return {firstValue: entity, secondValue: year}
// }
// let newArray = incomingData.map(newDataPointBasedOnOldDatapoint)
//
// console.log(newArray);
