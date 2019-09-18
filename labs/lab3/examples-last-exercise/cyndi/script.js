
let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id","viz")
                    .attr("width",1200)
                    .attr("height",300)
;


let sad = d3.select("#sad")
                .append("svg")
                    .attr("id","sad")
                    .attr("width",1200)
                    .attr("height",300)
;

let pos = d3.select("#pos")
                .append("svg")
                    .attr("id","pos")
                    .attr("width",1200)
                    .attr("height",300)
;

let neg = d3.select("#neg")
                .append("svg")
                    .attr("id","pos")
                    .attr("width",1200)
                    .attr("height",300)
;


let ques = d3.select("#questionmark")
                .append("svg")
                    .attr("id","ques")
                    .attr("width",1200)
                    .attr("height",300)
;

function gotData1(wsonline){   // this function expects to be passed data
    //console.log(wsonline);   // print it to the console to verify

    // in here we can now work with the new data
    let chart1 = [];
    for(i = 0;i < wsonline.length;i++){
      let ha = wsonline[i];
      //console.log(ha);
      let c1 = {"x":(i)*266, "y": 300-ha.haextremelyHappy/2};
    //  console.log(c1);
      chart1.push(c1);
    }
    //console.log(chart1);

    let curve = d3.area()
                      .x(function(d) { return d.x })      // Position of both line breaks on the X axis
                      .y1(function(d) { return d.y })     // Y position of top line breaks
                      .y0(300)                            // Y position of bottom line breaks (200 = bottom of svg area)
        ;
    viz.append('path')
            .attr('d', curve(chart1))
            .attr('stroke', 'white')
            .attr('fill', '#69b3a2')
            .text('haextremelyHappy')
        ;

}

function gotData2(wsonline){
  let chart2 = [];
  for(i = 0;i < wsonline.length;i++){
    let ha = wsonline[i];
    //console.log(ha);
    let c2 = {"x":(i)*266, "y": 300-ha.wuextremelySad/2};
  //  console.log(c1);
    chart2.push(c2);
  }
  //console.log(chart2);

  let curve = d3.area()
                    .x(function(d) { return d.x })      // Position of both line breaks on the X axis
                    .y1(function(d) { return d.y })     // Y position of top line breaks
                    .y0(600)                            // Y position of bottom line breaks (200 = bottom of svg area)
      ;
  sad.append('path')
          .attr('d', curve(chart2))
          .attr('stroke', 'white')
          .attr('fill', '#69b3a2')
      ;
}

function gotData3(wsonline){
  let chart3 = [];
  for(i = 0;i < wsonline.length;i++){
    let ha = wsonline[i];
    //console.log(ha);
    let c3 = {"x":(i)*266, "y": 300-ha.emojisForPositiveFeelings/2};
  //  console.log(c1);
    chart3.push(c3);
  }
  //console.log(chart3);
  function dx(d){
    return d.x;
  }

  function dy(d){
    return d.y;
  }

  let curve = d3.area()
                    .x(dx)      // Position of both line breaks on the X axis
                    .y1(dy)     // Y position of top line breaks
                    .y0(1200)                            // Y position of bottom line breaks (200 = bottom of svg area)
      ;
  pos.append('path')
          .attr('d', curve(chart3))
          .attr('stroke', 'white')
          .attr('fill', '#69b3a2')
      ;
}

function gotData4(wsonline){
  let chart4 = [];
  for(i = 0;i < wsonline.length;i++){
    let ha = wsonline[i];
    //console.log(ha);
    let c4 = {"x":(i)*266, "y": 300-ha.emojisForNegativeFeelings/2};
  //  console.log(c1);
    chart4.push(c4);
  }
  //console.log(chart4);

  let curve = d3.area()
                    .x(function(d) { return d.x })      // Position of both line breaks on the X axis
                    .y1(function(d) { return d.y })     // Y position of top line breaks
                    .y0(1500)                            // Y position of bottom line breaks (200 = bottom of svg area)
      ;
  neg.append('path')
          .attr('d', curve(chart4))
          .attr('stroke', 'white')
          .attr('fill', '#69b3a2')
      ;
}

function dx(hi){
  return d.x;
}

function dy(hi){
  return d.y;
}



function gotData5(wsonline){
  let chart5 = [];
  for(i = 0;i < wsonline.length;i++){
    let ha = wsonline[i];
    //console.log(ha);
    let c5 = {"x":(i)*266, "y": 300-ha.questionMark/2};
  //  console.log(c1);
    chart5.push(c5);
  }
  //console.log(chart5);

  let curve = d3.area()
                    .x(function(d){return d.x})      // Position of both line breaks on the X axis
                    .y1(function(d){return d.y})     // Y position of top line breaks
                    .y0(900)    // Y position of bottom line breaks (200 = bottom of svg area)
      ;
  ques.append('path')
          .attr('d', curve(chart5))
          .attr('stroke', 'white')
          .attr('fill', '#69b3a2')
      ;
}


d3.json("data.json").then(gotData1);
d3.json("data.json").then(gotData2);
d3.json("data.json").then(gotData3);
d3.json("data.json").then(gotData4);
d3.json("data.json").then(gotData5);
