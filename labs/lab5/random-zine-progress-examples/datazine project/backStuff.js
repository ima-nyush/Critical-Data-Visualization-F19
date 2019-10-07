let w = 1200;
let h = 800;


let viz = d3.select("#viz-container3")
                .append("svg")
                    .attr("id", "viz")
                    //changing the attribute -
                    // which one i chose and to what i want to change it
                    .attr("width", 1200)
                    .attr("height", 800)

;


///////////////////////////////////////////////////////////////////////////
//BLUR compliments given online

function blurOnline(datapoint){
  if (datapoint.medium == "WhatsApp" || datapoint.medium == "Facebook " || datapoint.medium == "WeChat" || datapoint.medium == "email" || datapoint.medium == "Instagram" || datapoint.medium == "iMessage"){
      return "url(#blurMe)";
  }
}




///////////////////////////////////////////////////////////////////////////
//COLOR of each type's bubbles

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

///////////////////////////////////////////////////////////////////////////
//LEARNING about D3 functions

function showItem(anyData){
  console.log(anyData);
}

function pickItem(anyData){
  console.log(anyData);
  return (anyData.name);
}

///////////////////////////////////////////////////////////////////////////
//LOCATION of each week's bubbles

function tuesdayLocation  (d,i){
  return "translate (" + (150+(100*i)) + ", 50)";
}

function wednesdayLocation  (d,i){
  return "translate (" + (150+(100*i)) + ", 150)";
}

function thursdayLocation  (d,i){
  return "translate (" + (150+(100*i)) + ", 250)";
}

function fridayLocation  (d,i){
  return "translate (" + (150+(100*i)) + ", 350)";
}

function saturdayLocation  (d,i){
  return "translate (" + (150+(100*i)) + ", 450)";
}

function sundayLocation  (d,i){
  return "translate (" + (150+(100*i)) + ", 550)";
}
/////////////////////////////////////////////////////////////////////
// filtering days to create specific arrays for each day of the week

function filterTuesday(anyData){
  return (anyData.day == "Tuesday")
}

function filterWednesday(anyData){
    return (anyData.day == "Wednesday")
  }

function filterThursday(anyData){
    return (anyData.day == "Thursday")
  }

function filterFriday(anyData){
    return (anyData.day == "Friday")
  }

function filterSaturday(anyData){
    return (anyData.day == "Saturday")
  }

function filterSunday(anyData){
    return (anyData.day == "Sunday")
  }


  // if (anyData.day == "Tuesday"){
  //   return (true);
  // }
  //   else{
  //     return (false);
  // }


function gotData(newData){ // this function expects to be passed data

  console.log(newData.length);   // print it to the console to verify

// for each function
newData.forEach(showItem)



//////////////////////////////////////////////////////////////////////////
// Separate arrays for each day of the week

//map function
let nameArray =  newData.map(pickItem)
console.log (nameArray);

//filter function
let tuesdayArray = newData.filter(filterTuesday)
console.log(tuesdayArray);

let wednesdayArray = newData.filter(filterWednesday)
console.log(wednesdayArray);

let thursdayArray = newData.filter(filterThursday)
console.log(thursdayArray);

let fridayArray = newData.filter(filterFriday)
console.log(fridayArray);

let saturdayArray = newData.filter(filterSaturday)
console.log(saturdayArray);

let sundayArray = newData.filter(filterSunday)
console.log(sundayArray);

///////////////////////////////////////////////////////////////////////
//TUESDAY

  let tuesdayGroup = viz.selectAll(".datagroup").data(tuesdayArray)
            .enter()
              .append("g")
              .attr("class", "tuesdayData")
  ;

  tuesdayGroup.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 15)
        .attr("fill", color)
        .attr("filter", blurOnline)
  ;

  tuesdayGroup.append("text")
        .attr("x", 20)
        .attr("y", 5)
        .text(pickItem)
        ;

  tuesdayGroup.attr("transform", tuesdayLocation);



  ///////////////////////////////////////////////////////////////////////
  //WEDNESDAY
  let wednesdayGroup = viz.selectAll(".datagroup").data(wednesdayArray)
            .enter()
              .append("g")
              .attr("class", "wednesdayData")
  ;

  wednesdayGroup.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 15)
        .attr("fill", color)
        .attr("filter", blurOnline)
  ;

  wednesdayGroup.append("text")
        .attr("x", 20)
        .attr("y", 5)
        .text(pickItem)
  ;

  wednesdayGroup.attr("transform", wednesdayLocation);


  ///////////////////////////////////////////////////////////////////////
  //THURSDAY
  let thursdayGroup = viz.selectAll(".datagroup").data(thursdayArray)
            .enter()
              .append("g")
              .attr("class", "thursdayData")
  ;

  thursdayGroup.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 15)
        .attr("fill", color)
        .attr("filter", blurOnline)
  ;

  thursdayGroup.append("text")
        .attr("x", 20)
        .attr("y", 5)
        .text(pickItem)
        ;

  thursdayGroup.attr("transform", thursdayLocation);


///////////////////////////////////////////////////////////////////////
//FRIDAY
let fridayGroup = viz.selectAll(".datagroup").data(fridayArray)
          .enter()
            .append("g")
            .attr("class", "fridayData")
;

fridayGroup.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 15)
      .attr("fill", color)
      .attr("filter", blurOnline)
;

fridayGroup.append("text")
      .attr("x", 20)
      .attr("y", 5)
      .text(pickItem)
      ;

fridayGroup.attr("transform", fridayLocation);

///////////////////////////////////////////////////////////////////////
//SATURDAY
let saturdayGroup = viz.selectAll(".datagroup").data(saturdayArray)
          .enter()
            .append("g")
            .attr("class", "saturdayData")
;

saturdayGroup.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 15)
      .attr("fill", color)
      .attr("filter", blurOnline)
;

saturdayGroup.append("text")
      .attr("x", 20)
      .attr("y", 5)
      .text(pickItem)
      ;

saturdayGroup.attr("transform", saturdayLocation);


///////////////////////////////////////////////////////////////////////
//SUNDAY
let sundayGroup = viz.selectAll(".datagroup").data(sundayArray)
          .enter()
            .append("g")
            .attr("class", "sundayData")
;

sundayGroup.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 15)
      .attr("fill", color)
      .attr("filter", blurOnline)
;

sundayGroup.append("text")
      .attr("x", 20)
      .attr("y", 5)
      .text(pickItem)
      ;

sundayGroup.attr("transform", sundayLocation);




}
d3.json("data2.json").then(gotData);
