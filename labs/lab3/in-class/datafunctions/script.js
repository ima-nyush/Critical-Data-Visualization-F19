// 1. find *real* data (array containing JS objects) in JSON format DONE

// 2. load data (make it *console.loggable* (what a word!) in our script) DONE
function randomNumber(datapoint, i){
  // console.log(datapoint);
  // console.log(i);
  return i*60;
}

function getColor(datapoint, i){
  console.log("ELEMENT: " + i);
  console.log(datapoint);
  console.log(datapoint.color);
  console.log("-------------");

  if(datapoint.color == "Monday"){
    return "red";
  }else if(datapoint.color == "Tuesday"){
    return "blue";
  }else if(datapoint.color == "Wednesday"){
    return "green";
  }


}

function gotData(incomingData){
  console.log(incomingData);


  // 4. make one circle for each datapoint (size and position doesn't matter) DONE
  // 5. concept: functions that "return" DONE
  // 6. use function to position circles randomly DONE
  // 7. realize "who" calls this function / why is there no `()`? DONE
  // 8. concept: "passing value into function" DONE
  // 9. let's assume: "D3 passes value into the data function" DONE
  // 10. if D3 passes a value, how can we receive it? DONE
  // 11. use *real* information to impact the x position DONE
  // 12. let's assume: "D3 passes another value!" DONE
  // 13. how can we receive that value? DONE
  // 14. in which ways is D3 making our live easy? DONE

  // create svg
  let viz = d3.select("body")
    .append("svg")
      .attr("width", 500)
      .attr("height", 500)
  ;

  // bin data (the enter thing)
  viz.selectAll("circle").data(incomingData)
    .enter()
      .append("circle")
      .attr("cx", randomNumber)
      .attr("cy", 200)
      .attr("r", 20)
      .attr("fill", getColor)
  ;


}

d3.json("data.json").then(gotData);



// 3. concept: data and datapoint DONE
