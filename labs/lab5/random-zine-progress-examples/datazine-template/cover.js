let w = 1200;
let h = 800;

let cover = d3.select("#container")
                  .append("svg")
                    .attr("width",w-60)
                    .attr("height",h-40)
                    .attr("transform","translate(30,20)")
;

//why this one doesn't work?
function pos(d,i){
  return Math.random()*200;
}

function gotData(dataready){
  let ha = 0;
  let wu = 0;
  let pos = 0;
  let neg = 0;
  let que = 0;

  for(i = 0; i < dataready.length; i++){
    let single = dataready[i];
    ha += single.haextremelyHappy;
    wu += single.wuextremelySad;
    pos += single.emojisForPositiveFeelings;
    neg += single.emojisForNegativeFeelings;
    que += single.questionMark;
  }

  let haha = [];
  let wuwu = [];
  let pospos = [];
  let negneg = [];
  let queque = [];

  for(i = 0;i < ha; i++){
    haha.push("i");
  }

  for(i = 0; i < wu; i++){
    wuwu.push("i");
  }

  for(i = 0; i < pos;i++){
    pospos.push("i");
  }

  for(i = 0; i < neg; i++){
    negneg.push("i");
  }

  for(i = 0; i < que; i++){
    queque.push("i");
  }

  cover.selectAll("circles").data(haha).enter()
                                        .append("circle")
                                            .attr("cx",function(d){
                                              return Math.random()*w;
                                            })
                                            .attr("cy",function(d){
                                              return Math.random()*h;
                                            })
                                            .attr("r","5")
                                            .attr("fill","red")
                                            .attr("opacity",0.5)
                                          .append("g")
                                            .attr("class","haha")
  ;

  cover.selectAll("circles").data(wuwu).enter()
                                        .append("circle")
                                            .attr("cx",function(d){
                                              return Math.random()*w;
                                            })
                                            .attr("cy",function(d){
                                              return Math.random()*h;
                                            })
                                            .attr("r","5")
                                            .attr("fill","orange")
                                            .attr("opacity",0.5)
                                          .append("g")
                                            .attr("class","wuwu")
  ;

  cover.selectAll("circles").data(pospos).enter()
                                        .append("circle")
                                            .attr("cx",function(d){
                                              return Math.random()*w;
                                            })
                                            .attr("cy",function(d){
                                              return Math.random()*h;
                                            })
                                            .attr("r","5")
                                            .attr("fill","blue")
                                            .attr("opacity",0.5)
                                          .append("g")
                                            .attr("class","pospos")
  ;

  cover.selectAll("circles").data(negneg).enter()
                                        .append("circle")
                                            .attr("cx",function(d){
                                              return Math.random()*w;
                                            })
                                            .attr("cy",function(d){
                                              return Math.random()*h;
                                            })
                                            .attr("r","5")
                                            .attr("fill","green")
                                            .attr("opacity",0.5)
                                          .append("g")
                                            .attr("class","negneg")
  ;

  cover.selectAll("circles").data(queque).enter()
                                        .append("circle")
                                            .attr("cx",function(d){
                                              return Math.random()*w;
                                            })
                                            .attr("cy",function(d){
                                              return Math.random()*h;
                                            })
                                            .attr("r","5")
                                            .attr("fill","purple")
                                            .attr("opacity",0.5)
                                          .append("g")
                                            .attr("class","queque")
  ;
}


d3.json("data.json").then(gotData);
