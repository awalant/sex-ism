"use strict"


/*General basis of this code from Jonathan Soma, via https://www.youtube.com/watch?v=lPr60pexvEM and https://www.youtube.com/watch?v=NTS7uXOxQeM
Data from http://sexualitics.github.io/ */

//Sets the dimensions of the canvas
let width = 1200;
let height = 600;

//Attaches an SVG canvas to the div id canvas. leaves the chart starting at the top left of the window and attaches a group to it.
let canvas = d3.select("#canvas")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)");

//Sets the scale for the radius. Using a square root scale because they are circles, and the domain goes from the min to the max of the data.
let rScale = d3.scaleSqrt().domain([0, 25526])
    .range([2, 50]);

//groupedX is a variable for storing the x force of the simulation for when the bubbles are divided into their categories. It places each of the different categories at separate spots on the x axis.
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


//centralX is a variable for storing the x force of the simulation for when the bubbles are meant to be clumped in the center of the canvas together.
let centralX = d3.forceX(600).strength(.05);

//dontTouchMe is a variable for setting the distance between each bubble. It uses the same calculation for the radius (above) and adds 2 px to it.
let dontTouchMe = d3.forceCollide((d) => {
    return rScale(d.occurances) + 2;
});

//A force simulation for when the bubbles first load. They all start in the center.
let sim = d3.forceSimulation()
    .force("centralX", centralX)
    .force("centralY", d3.forceY(height / 2).strength(.05))
    .force("dontTouchMe", dontTouchMe)
.restart();

//Everything that uses the data goes here:

//Converts the data from a csv and gives it the temporary variable pornData. 
let data = d3.csv("data/the_data.csv", (error, pornData) => {
    
    //if there is an error, this will be a notification
    if (error) throw error;

    //Puts the circles in the body of index.html and uses the pornData to apply to each circle. It initializes it, each one getting a circle, gives them the class .terms, and says that for each instance of a circle the radius will be determined by the rScale and how many times the word was used. They are filled blue, and when they are clicked on they return the data of that instance to the console.
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


    //when the button for term is clicked, it (should) force the bubbles back to the center.
    d3.select("#term").on("click", () => {
        sim
            .force("centralX", centralX)
            .alphaTarget(.05)
            .restart();
    });

    //when the button for categories is clicked, it should spread the groups apart from one another.
    d3.select("#cat").on("click", () => {
        sim
            .force("groupedX", groupedX)
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