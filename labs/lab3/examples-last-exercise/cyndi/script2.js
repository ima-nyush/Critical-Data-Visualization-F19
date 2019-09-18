let gra = d3.select("#graph")
                .append("svg")
                    .attr("id","gra")
                    .attr("width",1000)
                    .attr("height",600)
;

// let wordda = [
//   {"wor":"Ha : extremelyHappy", "y":90,"avg":298.83},
//   {"wor":"Wu : extremelySad","y":190,"avg":66.50},
//   {"wor":"emojisForPositiveFeelings","y":290,"avg":33.33},
//   {"wor":"emojisForNegativeFeelings","y":390,"avg":27.00},
//   {"wor":"? : feelingConfused","y":490,"avg":25.17}
// ]
//
// let text = gra.selectAll("text")
//                     .data(wordda)
//                     .enter()
//                     .append("text");
//
// let textLabels = text.attr("x", 150)
//                       .attr("y", function(d) { return d.y; })
//                       .text( function (d) { return d.wor+" "+d.avg })
//                       .attr("font-family", "sans-serif")
//                       .attr("font-size", "20px")
//                       .attr("fill", "grey");


function width(datapoint,height){
  //console.log(datapoint);
  //console.log(height);
  //console.log("---------");
  return datapoint.average*2;
}

function gotData(wsonline){   // this function expects to be passed data
  //console.log(wsonline);   // print it to the console to verify

  // in here we can now work with the new data
  let conclusion = [];
  let types = Object.keys(wsonline[1]);
  for(i = 0;i < types.length;i++){
    let mood = types[i];
    let sum = 0;
    let num = 0;
    for(j = 0;j < wsonline.length; j++){
      let datapoint = wsonline[j];
      if (mood in datapoint){
        sum += datapoint[mood];
        num ++;
      }
    }
    let avg = sum/num;
    if(!isNaN(avg)){
      let result = {"name": mood,"average": avg,"counts": num};
      conclusion.push(result);
    }
  }
  console.log(conclusion);

  //create the shapes
  let gr = gra.selectAll("rect").data(conclusion).enter().append("rect")
                                                    .attr("x",150)
                                                    .attr("y",function(d,h){
                                                      return (h+1)*100;
                                                    })
                                                    .attr("width",width)
                                                    .attr("height",30)
                                                    .attr("fill","#69b3a2")
  ;


  let wordda = [
    {"wor":"Ha : extremelyHappy", "y":90,"avg":298.83},
    {"wor":"Wu : extremelySad","y":190,"avg":66.50},
    {"wor":"emojisForPositiveFeelings","y":290,"avg":33.33},
    {"wor":"emojisForNegativeFeelings","y":390,"avg":27.00},
    {"wor":"? : feelingConfused","y":490,"avg":25.17}
  ]

  let text = gra.selectAll("text")
                      .data(wordda)
                      .enter()
                      .append("text");

  let textLabels = text.attr("x", 150)
                        .attr("y", function(d) { return d.y; })
                        .text( function (d) { return d.wor+" "+d.avg })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "20px")
                        .attr("fill", "grey");



}



d3.json("data.json").then(gotData);
