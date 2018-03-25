"use strict"


let width = 1200;
let height = 600;

let canvas = d3.select("#canvas")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)");


let rScale = d3.scaleSqrt().domain([0, 30031])
    .range([2, 50]);

let groupedX = d3.forceX((d) => {
    if (d.category === "female_anatomy") {
        return 200;
    } else if (d.category === "male_anatomy") {
        return 440;
    } else if (d.category === "interactions") {
        return 1160;
    } else if (d.category === "female") {
        return 920;
    } else {
        return 680;
    }
}).strength(.3);

let centralX = d3.forceX(600).strength(.05);

let dontTouchMe = d3.forceCollide((d) => {
    return rScale(d.occurances) + 2;
});

let sim = d3.forceSimulation()
    .force("centralX", centralX)
    .force("centralY", d3.forceY(height / 2).strength(.05))
    .force("dontTouchMe", dontTouchMe)
.restart();
//.alphaDecay([.01]);

let data = d3.csv("data/the_data.csv", (error, pornData) => {
    if (error) throw error;

    let circles = canvas.selectAll("body")
        .data(pornData)
        .enter().append("circle")
        .attr("class", "terms")
        .attr("r", (d) => {
            return rScale(d.occurances);
        })
        .attr("fill", "blue")
        .on("click", (d) => {
            console.log(d)
        });


    d3.select("#term").on("click", () => {
        sim
            .force("centralX", centralX)
            .alphaTarget(.05)
            .restart();
    });

    d3.select("#cat").on("click", () => {
        sim
            .force("groupedX", groupedX)
            .alphaTarget(0.05)
            .restart();
    });

    sim.nodes(pornData)
        .on("tick", ticked);

    function ticked() {
        circles
            .attr("cx", (d) => {
                return d.x;
            })
            .attr("cy", (d) => {
                return d.y;
            });

    }

});









//let bubbleChart;
//
//let chart = bubbleChart();
//
//bubbleChart = ()=>{
//    let width = 600;
//    let height = 400;
//    
//    chart.width = (value)=>{
//        if (!arguments.length){
//            return width;
//        }
//        width = value;
//        return chart;
//    }
//    
//    chart.height = (value)=>{
//        if (!arguments.length){
//            return height;
//            }
//        height = value;
//        return chart;
//    }
//    return chart;
//}
//
//
//d3.csv("data/the_data.csv", (error, pornData)=>{
//    if (error){
//        console.error("the data hasn't worked...");
//        throw error;
//    }
//    
//    let data = pornData;
//    
//    let chart = bubbleChart().width(600).height(400);
//    
//    let div = d3.select("body")
//    .selectAll("div")
//    .data(data)
//    .enter()
//    .append("div");
//    d3.select("#canvas").data(data).call(chart);
//    console.log(data);
//    
//    
//     
//})









//var canvas = d3.select("#canvas"),
//    width = +canvas.attr("width"),
//    height = +canvas.attr("height");
//
//var format = d3.format(",d");
//
//var color = d3.scaleSequential(d3.interpolateMagma)
//    .domain([-4, 4]);
//
////var stratify = d3.stratify()
////    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });
//
//var pack = d3.pack()
//    .size([width - 2, height - 2])
//    .padding(3);
//
//var pornData = d3.json("data/hierarchy.json", function(error, data) {
//  if (error) throw error;
//    let root = pornData[0];
// 
//
//  pack(root);
//
//  var node = canvas.select("g")
//    .selectAll("g")
//    .data(root.descendants())
//    .enter().append("g")
//      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
//      .attr("class", function(d) { return "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root"); })
//      .each(function(d) { d.node = this; })
//      .on("mouseover", hovered(true))
//      .on("mouseout", hovered(false));
//
//  node.append("circle")
//      .attr("id", function(d) { return "node-" + d.id; })
//      .attr("r", function(d) { return d.r; })
//      .style("fill", function(d) { return color(d.depth); });
//
//  var leaf = node.filter(function(d) { return !d.children; });
//
//  leaf.append("clipPath")
//      .attr("id", function(d) { return "clip-" + d.id; })
//    .append("use")
//      .attr("xlink:href", function(d) { return "#node-" + d.id + ""; });
//
//  leaf.append("text")
//      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
//    .selectAll("tspan")
//    .data(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g); })
//    .enter().append("tspan")
//      .attr("x", 0)
//      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
//      .text(function(d) { return d; });
//
//  node.append("title")
//      .text(function(d) { return d.id + "\n" + format(d.value); });
//});
//
//function hovered(hover) {
//  return function(d) {
//    d3.selectAll(d.ancestors().map(function(d) { return d.node; })).classed("node--hover", hover);
//  };
//}
//









//let margin = {
//    left: 100,
//    right: 100,
//    top: 200,
//    bottom: 100
//};
//
//let width = 800 - margin.left - margin.right,
//    height = 600 - margin.top - margin.bottom;
//
//
//let pack = d3.pack()
//    .size([width, height])
//    .padding(2);
//
//let pornData = d3.json("data/hierarchy.json", function (error, pornData) {
//    if (error) throw error;
//
//    root = pornData[0];
//    console.log(root);
//    pack(root);
//
//    let node = svg.select("g")
//        .selectAll("g")
//        .data(root.descendants())
//        .enter().append("g")
//        .attr("transform", function (d) {
//            return "translate(" + d.x + "," + d.y + ")";
//        })
//        .attr("class", function (d) {
//            return "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root");
//        });
//        //    })
////        .each(function (d) {
////            d.node = this;
////        })
////        .on("mouseover", hovered(true))
////        .on("mouseout", hovered(false));
//
//
//});
//
//
//let flag = true;
//
//let trans = d3.transition().duration(750);
//
//let g = d3.select("#canvas")
//    .append("svg")
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom)
//    .append("g")
//    .attr("transform", "translate(" + margin.left + margin.top + ")");
//
//







////let data = d3.csv("data/the_data.csv", function(error, data) {
////    if (error) throw error;
//    
////    let root = d3.stratify(data);
////    console.log(root);
////});
//
//let stratify = d3.stratify()
//.parentId(function(d){
//    return d.id.substring(0, d.id.lastIndexOf(".")); });
//
//
//
//
//let data = d3.csv("data/the_data.csv", function (data) {
//    console.log(data);
//     data.forEach(function (d) {
//            d.occurances = +d.occurances;
//        });
//    
//    let root = stratify(data)
//    .sum(function(d){
//        return d.value;
//    })
//    .sort(function(a,b){
//        return b.value - a.value;
//    });
//    
////    let root = d3.hierarchy(data)
////    .sum(function(d){
////      return d.occurances;  
////    })
////    .sort(function(a,b){
////        return b.occurances - a.occurances;
////    });
//    console.log(root);
//});
