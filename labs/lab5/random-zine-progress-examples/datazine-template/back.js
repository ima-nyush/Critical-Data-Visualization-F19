//piechart
let w = 600;
let h = 800;
let margin = 20;

//radius of pieplot
let radius = Math.min(w,h)/2-margin;

//append svg to the div
let graph = d3.select("#graph")
                  .append("svg")
                    .attr("width",w)
                    .attr("height",500)
                  .append("g")
                    .attr("transform", "translate(" + w / 2 + "," + 270 + ")")
;

//create an array of types
let types = ["Ha: ExtremelyHappy","Wu: ExtremelySad","PositiveEmojis","NegativeEmojis","?: QuestionMark"];

let labels = d3.select("#labels").append("svg")
                                    .attr("width",w)
                                    .attr("height",300)
;

let colorRange = ["red","orange","blue","green","purple"];

// set the color scale
let color = d3.scaleOrdinal()
                  .domain(types)
                  .range(colorRange)
;

function posx(d,i){
  if(i == 0 || i == 1 || i == 4){
    return 125;
  }
  else if(i == 2|| i == 3){
    return 375;
  }
}

function posy(d,i){
  if(i == 0 || i == 2){
    return 70;
  }
  else if(i == 1 || i == 3){
    return 150;
  }
  else {
    return 230;
  }
}

function textx(d,i){
  if(i == 0 || i == 1 || i == 4){
    return 155;
  }
  else if(i == 2|| i == 3){
    return 405;
  }
}


function getColor(d,i){
  return color(d);
}

labels.selectAll("circles").data(types).enter()
                                          .append("circle")
                                              .attr("cx",posx)
                                              .attr("cy",posy)
                                              .attr("r",18)
                                              .attr("fill",getColor)
                                              .attr("opacity",0.5)
;

labels.selectAll("myLabels").data(types).enter()
                                            .append("text")
                                              .attr("x",textx)
                                              .attr("y",posy)
                                              .attr("fill",getColor)
                                              .attr("font-size",18)
                                              .text(d=>d)
                                              .attr("alignment-baseline","middle")
;

function gotData(incomingData){
    let ha = 0;
    let wu = 0;
    let pos = 0;
    let neg = 0;
    let que = 0;

    for(i = 0; i < incomingData.length; i++){
      let single = incomingData[i];
      ha += single.haextremelyHappy;
      wu += single.wuextremelySad;
      pos += single.emojisForPositiveFeelings;
      neg += single.emojisForNegativeFeelings;
      que += single.questionMark;
    }

    let total = ha+wu+pos+neg+que;

    let percentage = {"ha":ha*100/total,"wu":wu*100/total,"pos":pos*100/total,"neg":neg*100/total,"que":que*100/total};
    console.log(percentage);

    let data = {"ha":ha, "wu":wu, "pos":pos, "neg":neg, "que":que};
    //console.log(data);


    // Compute the position of each group on the pie:
    let pie = d3.pie()
                    .sort(null) // Do not sort group by size??
                    .value(function(d) {return d.value; })
    ;

    //d3.entries => return an array of data
    let data_ready = pie(d3.entries(data));



    // The arc generator
    let arc = d3.arc()
                    .innerRadius(radius * 0.3)
                    .outerRadius(radius * 0.8)
    ;

    console.log(data_ready);


    graph.selectAll("allSlices").data(data_ready).enter()
                                                    .append("path")
                                                    .attr("d",arc)
                                                    .attr("fill",function(d){
                                                      return (color(d.data.key));
                                                    })
                                                    .attr("stroke","white")
                                                    .attr("stroke-width","2px")
                                                    .attr("opacity",0.5)
    ;

}

d3.json("data.json").then(gotData);
