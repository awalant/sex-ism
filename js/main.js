"use strict"


/*General basis of this code from Jonathan Soma, via https://www.youtube.com/watch?v=lPr60pexvEM and https://www.youtube.com/watch?v=NTS7uXOxQeM
Data from http://sexualitics.github.io/ */

//Sets the dimensions of the canvas
let width = 1200;
let height = 600;

 let tip = d3.tip().attr("class", "justTheTip")
        .html((d) => {
            let text = "Term: <span class='info'>" + d.term + "</span><br>";
           text += "Occurances: <span class='info'>" + d.occurances + "</span><br>";
            return text;
        });
//Attaches an SVG canvas to the div id canvas. leaves the chart starting at the top left of the window and attaches a group to it.
let canvas = d3.select("#canvas")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .call(tip)
    .attr("transform", "translate(0,0)");

//Sets the scale for the radius. Using a square root scale because they are circles, and the domain goes from the min to the max of the data.
let rScale = d3.scaleSqrt().domain([0, 25526])
    .range([2, 80]);

//groupedX is a variable for storing the x force of the simulation for when the bubbles are divided into their categories. It places each of the different categories at separate spots on the x axis.
let groupedX = d3.forceX((d) => {
    if (d.category === "female_anatomy") {
        return 150;
    } else if (d.category === "male_anatomy") {
        return 400;
    } else if (d.category === "interactions") {
        return 1120;
    } else if (d.category === "female") {
        return 640;
    } else {
        return 885;
    }
}).strength(.3);


//centralX is a variable for storing the x force of the simulation for when the bubbles are meant to be clumped in the center of the canvas together.
let centralX = d3.forceX(600).strength(.08);

//dontTouchMe is a variable for setting the distance between each bubble. It uses the same calculation for the radius (above) and adds 2 px to it.
let dontTouchMe = d3.forceCollide((d) => {
    return rScale(d.occurances) + 2;
});

//function from Jim Vallandingham, http://vallandingham.me//bubble_charts_with_d3v4.html
//it basically says to ????
function charge(d) {
    return -Math.pow(d.radius, 2.0) * .8;
}

//A force simulation for when the bubbles first load. They all start in the center.
let sim = d3.forceSimulation()
    .force("forceX", d3.forceX(width / 2).strength(.05))
    .force("centralY", d3.forceY(height / 2).strength(.05))
    .force("dontTouchMe", dontTouchMe)
    .force("charge", d3.forceManyBody().strength(charge));



//Everything that uses the data goes here:

//Converts the data from a csv and gives it the temporary variable pornData. 
let data = d3.csv("data/the_data.csv", (error, pornData) => {

    //if there is an error, this will be a notification
    if (error) throw error;


    pornData.forEach((d) => {
        d.category = d.category;
        d.term = d.term;
        d.occurances = +d.occurances;
        d.x = width / 2;
        d.y = height / 2;
    });


    //Puts the circles in the body of index.html and uses the pornData to apply to each circle. It initializes it, each one getting a circle, gives them the class .terms, and says that for each instance of a circle the radius will be determined by the rScale and how many times the word was used. They are filled blue, and when they are clicked on they return the data of that instance to the console.
    let circles = canvas.selectAll("body")
        .data(pornData)
        .enter().append("circle")
        .attr("class", "terms")
        .attr("r", (d) => {
            return rScale(d.occurances);
        })
        .attr("fill", (d, i) => {
            if (d.category === "female_anatomy") {
                return "#c9afaf";
            } else if (d.category === "male_anatomy") {
                return "#2870a0";
            } else if (d.category === "male") {
                return "#454858";
            } else if (d.category === "female") {
                return "#830534";
            } else if (d.category === "interactions") {
                return "#E39423";
            }
        })
        .on("click", (d) => {
            console.log(d)
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);


    //when the button for term is clicked, it (should) force the bubbles back to the center.
    d3.select("#term").on("click", () => {
        sim
            .force("forceX", centralX)
            .alphaTarget(.05)
            .restart();
    });

    //when the button for categories is clicked, it should spread the groups apart from one another.
    d3.select("#cat").on("click", () => {
        sim
            .force("forceX", groupedX)
            .alphaTarget(0.05)
            .restart();
    });

    //This specifies for the nodes to move at each tick (automatically applied in a force simulation)
    sim.nodes(pornData)
        .on("tick", ticked);

    //X and Y coordinates are determined by this function.
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
