let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;


function gotData(incomingData){
  // all the data:
  console.log(incomingData);

  // filter the data:
  function filterFunction(datapoint){
    if(datapoint.Code == "USA" || datapoint.Code == "CHN"){
      return true; //if the filter function returns true, the data point will be accepted
    }else{
      return false; // if the filter function returns false, the data point will be filtered out
    }
  }
  let filteredData = incomingData.filter(filterFunction);
  console.log(filteredData);


  // the "timestamp" of each data point looks like this:
  // Year: "2006"
  // next we create a function that allows us to easily turn this into
  // a javascript date object
  // to do this we use a d3 method which returns a function. it's exactly
  // like what happened when we work with scales: we us a d3 method which
  // then returns a function that we can use as many time as we want. when creating
  // it, we specify how it should behave:
  let yearToDateObjectConverter = d3.timeParse("%Y");
  // that's it, we asked d3 to create a function for us to which we can
  // supply a year in this format: "2007" and it creates a JavaScript Date Object
  // for us. We specified this by using the "%Y" when we create the function. Look for
  // more such key letters here: https://github.com/d3/d3-time-format#locale_format
  // Let's test it:
  let test = yearToDateObjectConverter("2007");
  // check your console:
  console.log(test);
  console.log(typeof(test));

  // next we can create an x scale. we want the x axis to sretch all the way from
  // the first year (min) of HIV measurement in our data set to the most recent (max) one.
  // then we want this information in this format:
  // [first-year-of-measurement, most-recent-year-of-measurement]
  // in order to define it as our x Scales input Domain.
  // d3 gives us useful methods to do this:
  // We can get the minimum/maximum value of any key in any array of objects or values. It doesn't
  // matter how complex out data is structured because we can tell d3 precisely
  // where to look for the value of which we want to know the minimum/maximum.
  // take a look:
  let minYear = d3.min(filteredData, function(d){
    let year = d.Year;
    let properlyFormatted = yearToDateObjectConverter(year);
    console.log(properlyFormatted);
    //IMPORTANT: whatever we return will be the value of which d3 will
    // look for the minimum. Ultimately it returns the ONE minimum value of all data points.
    return properlyFormatted;
  });
  // Let's see what we got:
  console.log(minYear);
  // this returns this Date object:
  // Mon Jan 01 1990 00:00:00 GMT+0800 (China Standard Time)
  // 1990! looks good!
  // the maximum
  let maxYear = d3.max(filteredData, function(d){
    return yearToDateObjectConverter(d.Year);
  });
  // the only thing that changed is the word "max"
  console.log(maxYear);
  // Sun Jan 01 2017 00:00:00 GMT+0800 (China Standard Time)
  // 2017! Great, now we can put them into a domain array that we supply to constructing the xScale
  let xDomain = [minYear, maxYear];
  // this will work perfectly well. But because it is needed so often
  // and requires the same code with only one word changed (min->max),
  // there is an even better method that directly returns min AND max in an array:
  let alternativeXDomain = d3.extent(filteredData, function(d){
    return yearToDateObjectConverter(d.Year);
  })
  // check it out
  console.log(alternativeXDomain);
  // [Mon Jan 01 1990 00:00:00 GMT+0800 (China Standard Time), Sun Jan 01 2017 00:00:00 GMT+0800 (China Standard Time)]
  // You see? the exact same, just much shorter!
  // so right now the variables xDomain and alternativeXDomain have the exact same value.
  // the only difference is that we create alternativeXDomain much smarter.
  // X scale (as learned in week4's Lab)
  let xPadding = 50;
  // reference: https://github.com/d3/d3-scale#time-scales
  let xScale = d3.scaleTime().domain(alternativeXDomain).range([xPadding, w-(xPadding*2)]);
  console.log(xScale(yearToDateObjectConverter("2004")))
  // Next, let's draw an x axis. This is new for us, but luckily D3 makes it incredibly
  // easy.
  // reference: https://github.com/d3/d3-axis
  // All an axis realy needs is to know our scale
  var xAxis = d3.axisBottom(xScale);
  // d3 works with the default svg shapes, an axis is put together of many of them.
  // it makes A LOT of sense to group all these elements in a group
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  // then we tell D3 to construct an axis in this group:
  xAxisGroup.call(xAxis);
  // take a look, do you see the axis at the top of your svg?
  // looks good no? The "Bottom" in "d3.axisBottom(xScale);" refers to the side on which
  // the axis text appear, not where the axis as a whole is located,
  // we have to take care of that ourselves:
  let xAxisYPos = h - 30;
  xAxisGroup.attr("transform", "translate(0,"+xAxisYPos+")");
  // excuse me please, but this. looks. mesmerizing.


  // y scale and axis
  // let's do the same on the y axis, for the value of the:
  // "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)"
  // -key. What an annoyingly long key. If you are confused look at the datapoints
  // we console.logged above. Let's save the key in a variable to make it less annoying:
  let valueKey = "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)";

  // Now let's do it, but faster than above!
  // y Scale:
  let topPadding = 30;
  let yScale = d3.scaleLinear().domain(d3.extent(filteredData, function(d){return d[valueKey]})).range([xAxisYPos, topPadding]);
  // Wow, please consider this one carfully. We get the min max extent right in place.
  // we access the values NOT WITH A DOT NOTATATION like d.Year!!!!!! This is confusing, but
  // extremely IMPORTANT to know. We use our string (variable) in []-brackets instead.
  // then, our range: we want the lowest value to be scaled to the pixel where our X AXIS starts
  // so we use the xAxisYPos for the min of the range, and a little padding for the top.

  // next, axis:
  var yAxis = d3.axisLeft(yScale);
  let yAxisgroup = viz.append("g").attr("class", "yaxis").call(yAxis);
  yAxisgroup.attr("transform", "translate("+xPadding+",0)");

  // now that was quick. six lines of code?? Oh my, this is so neat.


  // now let's plot
  // to keep things seperated let's make a group for all shapes:
  let vizGroup = viz.append("g").attr("class", "vizgroup");

  // bind data and create groups for each datapoint:
  let dataGroups = vizGroup.selectAll(".datagroup").data(filteredData).enter()
      .append("g")
      .attr("class", "datagroup")
  ;


  // OPTION 1 circles

  // append circles to the groups

  let circles = dataGroups.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5)
  ;

  

  // OPTION 2 graphics
  // i don't want circles / for jerry
  // note the variable at the bottom of this file
  // it's svg code exported from Adobe Illustrator

  // dataGroups.html(svgCup);
  // dataGroups.selectAll("path").attr("transform", "scale(0.1)");


  // translate function in which we are using our scales
  // NOTE: the xScale expect us to supply a properly formatted date object
  function getTranslate(d, i){
    let properlyFormattedDate = yearToDateObjectConverter(d.Year);
    let value = d[valueKey];
    return "translate("+xScale(properlyFormattedDate)+","+yScale(value)+")";
  }
  // translate the position of each group:
  dataGroups.attr("transform", getTranslate);
  // this looks great, compare it with this graph from the website we got our data from:
  // https://ourworldindata.org/grapher/new-cases-of-hiv-infection?tab=chart&time=1990..2017&country=CHN


  // what next?


  // try changing the country Code in our filer function. E.g. to USA
  // Everything will automatically adjust to the new data. See the y Axis changing?

  // next we could adjust our filter to "let in" data from another country.
  //  (datapoint.Code == "USA" || datapoint.Code == "CHN")
  // then leave all code as it is, but color each circle depending on its Code value
  // that way each country would have its own color. Try it!

}

d3.csv("new-cases-of-hiv-infection.csv").then(gotData);




  let svgCup = '<g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M75.45,4.87c6.26,0,12.55.32,18.79-.13,3.16-.22,6.19-2.48,9.34-2.66,12.09-.69,24.22-.9,36.33-1.32C146.19.54,152.53-.4,158.73.19s12.55,2.57,18.77,4.16c8.14,2.07,16.33,4,24.28,6.66,4.55,1.51,8.68,4.28,13,6.46,3.39,1.71,6.63,4,10.22,4.93,4.47,1.2,7.23,4.39,4.53,7.88-5.21,6.73-5.7,15.33-10,22.27-3.52,5.67-7.45,11.09-11.16,16.65a6.54,6.54,0,0,0-1.24,2.63c-.43,3.7.07,6.87-2.72,10.82s-1.25,11.21-1.78,17c-.31,3.32-.26,7-1.65,9.83-3,6.16-3.83,12.51-5,19.16-1.39,8.21,1.67,17.32-4.23,24.73a2.63,2.63,0,0,0-.3,1.45c-.64,15.07-1.09,30.14-2,45.19-.42,7.09-1.69,14.13-2.59,21.19-.83,6.52-1.71,13-2.48,19.58a5.6,5.6,0,0,0,.53,2.86c3.42,7.3,2.72,10.25-4.18,13.9-8.08,4.28-16.31,8.3-24.58,12.19-2,.95-4.56.68-6.7,1.43-6.63,2.33-13.52,2.53-20.41,3.15-9.62.87-19.07,1.25-28.62-1.1-5.56-1.37-11.47-1.36-17.24-1.83a7.67,7.67,0,0,0-3.84.69c-6.68,3.33-7.13,3.14-9.06-3.67-4.28-15.06-8.84-30-12.92-45.16-3.82-14.18-7.29-28.47-10.72-42.76-3.74-15.54-6.53-31.36-11.13-46.63a179.27,179.27,0,0,1-6.6-33.3c-.27-2.66.6-5.59,1.51-8.19s.21-4.14-2.33-4.92a87.52,87.52,0,0,0-9.39-2.76c-6.16-1.17-8-6.35-10.51-10.83C5.11,68.31,6.09,61,.43,56.41c-.79-.64-.37-3.65.34-5.15C5,42.4,9.43,33.64,13.89,24.9a6.12,6.12,0,0,1,2.42-2.28c3.44-1.92,6.78-4.29,10.48-5.4,6.05-1.8,10.47-6.86,17.38-7.24,6-.33,11.79-2.81,17.72-4.15,4.44-1,8.94-1.72,13.41-2.57Zm105,163.52c-4,3.66-7.7,6-9.93,9.38-6.77,10.14-18.41,17.35-19.12,31.22,0,.67-1.11,1.21-1.46,1.93-2.32,4.91-7.7,5.39-11.4,8.2-2.46,1.86-4.58,3-6.1.56-1.2-2-1.68-5.83-.53-7.52,3.37-4.92,7.88-9,11.64-13.71,3.15-3.94,5.86-8.22,8.77-12.35L151,184.65a31.26,31.26,0,0,0-5,3.1c-3.85,3.52-7.08,7.92-12.69,8.75a48.83,48.83,0,0,1-6.85.11c.32-2.29-.08-5.09,1.1-6.76,2.83-4,6.46-7.42,9.67-11.16,5.55-6.48,11.26-12.85,16.49-19.58,3.91-5,7.1-10.62,10.75-15.87,1.5-2.15,3.67-3.87,5-6.1,4-6.68,8.09-13.39,11.65-20.33,3-5.81,5.28-12,7.88-18l-1.93-1.69c-1.73,1-3.85,1.69-5.12,3.12-3.19,3.58-5.67,7.82-9,11.23-13.17,13.43-24.25,28.48-34.06,44.42-3.53,5.75-8.63,7.83-14.73,9.78,1.23-6.15,2.34-12.32,5.09-17.65s7-9.67,10.72-14.31c5.3-6.56,10.62-13.11,16.2-19.42s11.5-11.84,16.8-18.13c3.8-4.5,6.82-9.67,10.13-14.57.23-.33,0-.94,0-1.62-5.07,0-10-.13-15,.13-.81,0-2,1.73-2.21,2.8-1.21,7.64-6.11,12.69-12,16.7-6.86,4.63-13.17,9.3-14.22,18.44a8.78,8.78,0,0,1-3.23,5.28A101.61,101.61,0,0,1,125,130.73c-.59.34-2.19-.36-2.89-1-3-2.89-2.65-6.39.44-9.94,2.19-2.52,4.09-5.3,6.12-8l-1-1.39a37.35,37.35,0,0,1-6.18,2.13c-1.78.3-4.24.46-5.4-.51s-1.86-3.57-1.52-5.21c.47-2.34,1.93-4.54,3.22-6.65,2.38-3.9,4.94-7.69,8.07-12.52-2.68-.26-4.21-.69-5.67-.51-7.64,1-15.29,1.88-22.89,3.17-10.29,1.74-20.52,3.88-31,1.42-1-.23-2.22.69-3.34.71-3.62.08-7.25.16-10.86-.09-2.87-.2-5.71-.88-9.39-1.49.84,6.39,1.68,12,2.26,17.54.34,3.26,1.64,7.61.09,9.62-3,3.85-1,6.78-.23,10.07,2.08,9.19,4.35,18.34,6.4,27.54,1.39,6.26,2.45,12.6,3.81,18.88,2,9.18,3.91,18.38,6.25,27.48,2,7.9,4.58,15.68,7,23.49,1,3.42,2.16,6.82,3.38,10.18,1.62,4.46,3.91,8.74,5,13.31,1.74,7.58,2.27,8.38,9.67,5.78,3.61-1.27,6.07-.57,9.17,1.37,8.18,5.14,17.37,4.45,25,4.2,1.87-3.79,2.72-6.85,4.58-9,7.28-8.54,15-16.72,22.34-25.2,6.78-7.81,13.4-15.78,20-23.79,1.72-2.1,2.44-5.31,4.49-6.81C180.7,188.92,181.64,180,180.41,168.39ZM121,16,120.38,14c-9.31,1-18.62,2.95-27.93,2.92-15.9-.07-31.61,1.34-46.6,6.28-8.23,2.72-15.78,7.84-23.2,12.58-3.43,2.18-2.76,7.22.7,9.27,4.41,2.61,8.87,5.41,13.68,7,3.95,1.29,8.45,1,12.71,1.22,6.51.3,13,.23,19.53.65,6.08.39,12.14,1.7,18.21,1.71,8.59,0,17.22-1.49,25.77-1.06,6.3.32,8.56-3.75,11.38-7.48,3.34-4.43,6-9.43,9.42-13.74,4.91-6.08,10.33-11.75,15.52-17.6l-.28-1.37c-3.94.39-8.79-.5-11.58,1.49-4,2.87-6.54,7.85-9.71,11.91-2.32,3-5.85,5.61-6.73,9-1.19,4.55-4,6.38-7.57,8.18-1,.51-2.27.83-2.93,1.63-1.86,2.27-4,2.85-5.83.57-1.51-1.93-4.31-3.84-1.48-7.24,3.74-4.47,6.91-9.41,10.35-14.13C116.19,22.46,118.61,19.21,121,16Zm83.07,34.77L203.45,49c-4.11,1.08-8.3,1.93-12.31,3.31-4.82,1.66-9.35,4.25-14.25,5.55-7.14,1.9-14.7,2.33-21.69,4.59-11.83,3.82-24.07,4-36.17,5s-24.58.67-36.87.92c-4.39.09-8.8.45-13.16.13-3.82-.27-7.55-1.75-11.36-1.94-7-.37-14.12.2-21.12-.42-3.2-.29-6.24-2.49-9.36-3.81-2.86-1.21-5.73-2.4-9.35-3.92.89,7.29,3.39,12.32,9,14.47C38,77.2,49.52,80,61.65,79.82c5.64-.1,11.29.23,16.94.12a70.9,70.9,0,0,0,10.58-1c4.6-.79,9.09-2.32,13.7-2.89,8.13-1,16.34-1.32,24.47-2.29q12.91-1.56,25.75-3.82c12.35-2.18,24.75-4.26,36.94-7.18A19.6,19.6,0,0,0,204.09,50.73ZM177.6,207.78l-1.19-.21-35.51,40,4.6,3.59L138,258.57c7.94,1.4,11.91-.3,14.94-4.85,4-5.94,8.28-11.68,12.61-17.38,3.13-4.13,7.59-7.61,9.5-12.2C177.06,219.18,176.83,213.28,177.6,207.78Zm-23.09-25.44c2.8-3.66,5.51-7.39,8.42-11,4.38-5.38,9.43-10.29,13.21-16.06,3.51-5.35,5.8-11.52,8.42-17.42.29-.66-.76-1.91-1.18-2.89-.93.55-2.12.89-2.75,1.68-2.55,3.19-5,6.5-7.37,9.82-5.87,8.12-11.41,16.51-17.7,24.28C152.58,174.47,153.28,177.91,154.51,182.34Zm4.15-134.09c13.48.44,28.93-13.38,25.18-22.52C176.06,27.42,160.43,41.4,158.66,48.25Zm-19.81,4.46c2.54-.88,5.5-1,6.68-2.49,3.48-4.42,6.05-9.55,9.36-14.13s7.27-9.09,10.94-13.62l-.67-1c-1.24.45-2.7.63-3.71,1.39C151.46,30.43,139.67,36.67,138.85,52.71Zm-7.26,53.73c1.3-.61,2.35-.81,3-1.44,6.08-6.2,12.11-12.45,18-18.83.2-.22-1.31-2.88-1.93-2.84a28,28,0,0,0-8.13,1.57c-1.4.53-2.58,2.17-3.41,3.57-1.6,2.69-2.19,6.56-4.46,8.13C130.85,99.21,130.15,101.88,131.59,106.44Z"/></g></g>'
