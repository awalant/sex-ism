"use strict"


/*General basis of this code from Jonathan Soma, via https://www.youtube.com/watch?v=lPr60pexvEM and https://www.youtube.com/watch?v=NTS7uXOxQeM
Data from http://sexualitics.github.io/ */

//SET UP

//Sets the dimensions of the canvas
let width = 1200;
let height = 600;

/*Tool tip code. Applies the class, inserts text into the html DOM that corrosponds to each piece of data. writes the terms and occurances. Via D3 tool tip API https://github.com/Caged/d3-tip */
let tip = d3.tip().attr("class", "justTheTip")
    .html((d) => {
        let text = "Term: <span class='info'>" + d.term + "</span><br>";
        text += "Occurances: <span class='info'>" + d.occurances + "</span><br>";
        return text;
    });

/*Attaches an SVG canvas to the div id canvas. leaves the chart starting at the top left of the window and attaches a group to it.*/
let canvas = d3.select("#canvas")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .call(tip)
    .attr("transform", "translate(0,0)");

/*Sets the scale for the radius. Using a square root scale because they are circles, and the domain goes from the min to the max of the data.*/
let rScale = d3.scaleSqrt().domain([0, 25526])
    .range([2, 80]);

/*groupedX is a variable for storing the x force of the simulation for when the bubbles are divided into their categories. It places each of the different categories at separate spots on the x axis.*/
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

/*centralX is a variable for storing the x force of the simulation for when the bubbles are meant to be clumped in the center of the canvas together.*/
let centralX = d3.forceX(600).strength(.08);

/*dontTouchMe is a variable for setting the distance between each bubble. It uses the same calculation for the radius (above) and adds 2 px to it.*/
let dontTouchMe = d3.forceCollide((d) => {
    return rScale(d.occurances) + 2;
});

/*A force simulation for when the bubbles first load. They all start in the center.*/
let sim = d3.forceSimulation()
    .force("forceX", d3.forceX(width / 2).strength(.05))
    .force("centralY", d3.forceY(height / 2).strength(.05))
    .force("dontTouchMe", dontTouchMe);


//DATA

//Converts the data from a csv and gives it the temporary variable pornData. 
let data = d3.csv("data/the_data.csv", (error, pornData) => {

    //if there is an error, this will be a notification
    if (error) throw error;

/*This is the data that I want the chart to pull from. With the + it changes that variable to digits. The specification of the x and y coordinates position the starting points of the bubbles*/
    pornData.forEach((d) => {
        d.category = d.category;
        d.term = d.term;
        d.occurances = +d.occurances;
        d.x = width / 2;
        d.y = height / 2;
    });


/*Puts the circles in the body of index.html and uses the pornData to apply to each circle. It initializes it, each one getting a circle, gives them the class .terms, and says that for each instance of a circle the radius will be determined by the rScale and how many times the word was used. They are filled based on their category using conditionals, and event listeners are applied to the circles.*/
    let circles = canvas.selectAll("g")
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

/*the text is created based on the data in the pornData and is appended to the canvas (despite them technically not existing yet.)*/
    let text = canvas.selectAll("text")
        .data(pornData)
        .enter()
        .append("text");

/*the labels position the text above to follow each of the bubbles, and to use the terms from the data. They are placed in the middle of the function, use a sans serif font, filled white, and the font size is a third of the radius of the circle it belongs to.*/
    let labels = text
        .attr("x", (d) => {
            return d.x;
        })
        .attr("y", (d) => {
            return d.y;
        })
        .text((d) => {
            return d.term;
        })
    .style("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", (d)=>{
        return rScale(d.occurances)/3;
    })
        .attr("fill", "white");
    
    /*When the button for term is clicked, it forces the bubbles back to the center by using centralX from above. Restart allows there to be more forces applied to the bubbles after they are moved.*/
    d3.select("#term").on("click", () => {
        sim
            .force("forceX", centralX)
            .alphaTarget(.05)
            .restart();
    });

    /*When the button for categories is clicked, it spreads the groups apart from one another by applying the groupedX from above.Restart allows there to be more forces applied to the bubbles after they are moved.*/
    d3.select("#cat").on("click", () => {
        sim
            .force("forceX", groupedX)
            .alphaTarget(0.05)
            .restart();
    });

    /*This specifies for the nodes to move at each tick (automatically "ticking," like a clock, in a force simulation). Nodes are just the D3 term for the circles that have already been created. This function, and the one beneath it, are from the youtube video mentioned in the first comment.*/
    sim.nodes(pornData)
        .on("tick", ticked);

    /*X and Y coordinates are determined by this function and are constantly being adjusted based on the forces applied to both the circles and the text.*/
    function ticked() {
        circles
            .attr("cx", (d) => {
                return d.x;
            })
            .attr("cy", (d) => {
                return d.y;
            });
        text
            .attr("x", (d)=>{
            return d.x;
        })
        .attr("y", (d)=>{
            return d.y;
        });
    }

});
