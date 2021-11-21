/*global d3*/

let height = 800;
let width = 1120;
let margin = ({ top: 40, right: 40, bottom: 34, left: 40 });
let allDates = [];


// Data structure describing chart scales
let Scales = {
    lin: "scaleLinear",
    log: "scaleLog"
};

// Data structure describing volume of displayed data
let Count = {
    dateSort: "dateSort",
};

// Data structure describing legend fields value
let Legend = {
    dateSort: "dateSort",
};

let chartState = {};

chartState.measure = Count.dateSort;
chartState.scale = Scales.lin;
chartState.legend = Legend.dateSort;


// Colors used for circles depending on typeSort
let colors = d3.scaleOrdinal()
    .domain(["buttons", "signs", "posters", "placards", "correspondence", "pamphlets", "fliers", "other"])
    //vibrant
    //.range(['#ff7eb6', '#8a3ffc', '#fa4d56', '#d2a106', '#d4bbff', '#08bdba', '#ba4e00', '#33b1ff']);
    //dark-antique
    // .range(['#9ab6aa', '#d4c874', '#919f5e', '#825264', '#db666f', '#76943c', '#66988d', '#ba5f41']);
    .range(['#d4c874', '#ba8a30', '#db666f', '#5c86aa', '#a53d24', '#76943c', '#66988d', '#ba5f41']);


//#009392,#72aaa1,#b1c7b3,#f1eac8,#e5b9ad,#d98994,#d0587e
//#A16928,#bd925a,#d6bd8d,#edeac2,#b5c8b8,#79a7ac,#2887a1

d3.select("#buttonsColor").style("color", colors("buttons"));
d3.select("#signsColor").style("color", colors("signs"));
d3.select("#postersColor").style("color", colors("posters"));
d3.select("#placardsColor").style("color", colors("placards"));
d3.select("#correspondenceColor").style("color", colors("correspondence"));
d3.select("#pamphletsColor").style("color", colors("pamphlets"));
d3.select("#fliersColor").style("color", colors("fliers"));
d3.select("#otherColor").style("color", colors("other"));


let svg = d3.select("#svgbeeswarm")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

svg.append("text")
    .attr("x", 20)
    .attr("y", 70)
    .attr("text-anchor", "left")
    .style("font-size", "32px")
    .style("fill", "#a19d94")
    .style("font-family", "Zilla Slab")
    .style("font-variant", "small-caps")
    .style("font-weight", 500)
    .text("Political and Activist Ephemera at the Smithsonian");

// Add subtitle to graph
svg.append("text")
    .attr("x", 20)
    .attr("y", 110)
    .attr("text-anchor", "left")
    .style("font-size", "34px")
    .style("fill", "#a19d94")
    .style("max-width", 400)
    .style("font-family", "Zilla Slab Highlight")
    .style("font-weight", 600)
    .text("Temporary Objects with Permanent Impact");



let xScale = d3.scaleLinear()
    .domain(allDates.map(d => d.dateSort))
    .range([margin.left, width - margin.right])

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")


// Create line that connects circle and X axis
let xLine = svg.append("line")
    .attr("stroke", "rgb(96,125,139)")
    .attr("stroke-dasharray", "3,4")
    .attr("stroke-width", "2");

// Create tooltip div and make it invisible
let tooltip = d3.select("#svgbeeswarm").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

let tooltip2 = d3.select("#svgbeeswarm").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Load and process data
d3.csv("https://raw.githubusercontent.com/m0llyc00k/major-studio-1/main/Qualitative/examples-beeswarm/beeswarm-data-new-Images.csv").then(function(data) {

    let dataSet = data;

    redraw();



    // Trigger filter function whenever checkbox is ticked/unticked
    d3.selectAll("input").on("change", filter);

    function redraw() {

        // Set scale type based on button clicked
        if (chartState.scale === Scales.lin) {
            xScale = d3.scaleLinear().range([margin.left, width - margin.right])
        }

        if (chartState.scale === Scales.log) {
            xScale = d3.scaleLog().range([margin.left, width - margin.right]);
        }

        xScale.domain(d3.extent(dataSet, function(d) {
            return +d[chartState.measure];
        }));

        //set x axis
        let xAxis = d3.axisBottom(xScale)
            .ticks(12, ".0f");


        d3.transition(svg).select(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);

        // Create simulation with specified dataset
        let simulation = d3.forceSimulation(dataSet)
            // Apply positioning force to push nodes towards desired position along X axis
            .force("x", d3.forceX(function(d) {
                // Mapping of values from date/perCapita column of dataset to range of SVG chart (<margin.left, margin.right>)
                return xScale(+d[chartState.measure]); // This is the desired position
            }).strength(8)) // Increase velocity
            .force("y", d3.forceY((height / 1.75) - margin.bottom)) // // Apply positioning force to push nodes towards center along Y axis
            .force("collide", d3.forceCollide(14)) // Apply collision force with radius of 9 - keeps nodes centers 9 pixels apart
            .stop(); // Stop simulation from starting automatically

        // Manually run simulation
        for (let i = 0; i < dataSet.length; ++i) {
            simulation.tick(5);
        }


        // function changeColor() {

        // Create ephemera circles
        let titleCircles = svg.selectAll(".title")
            .data(dataSet, function(d) { return d.title });

        titleCircles.exit()
            .transition()
            .duration(1000)
            .attr("cx", 0)
            .attr("cy", (height / 2) - margin.bottom / 2)
            .remove();


        var defs = svg.append('defs');
        
        defs.append("pattern")
        .attr("id",  "d.title" )
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xlink:href", "+ d.primaryImage +")
        
        defs.selectAll(".title-pattern")
        .data(data)
        .enter().append("pattern")
        .attr("class", "title-pattern")
        .attr("id",  function(d) {
            return d.id
        } )
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xlink:href", function(d) {
            return d.primaryImage
        })


        titleCircles.enter()
            .append("circle")
            .attr("class", "title")
            .attr("cx", width - margin.right)
            .attr("cy", (height) - margin.bottom)
            .attr("r", 13)
            .attr("stroke", function(d) { return colors(d.typeSort) })
            .attr("stroke-width", 4)
            .merge(titleCircles)
            .transition()
            .duration(2000)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("fill", function(d) {
                return "url(#" + d.id + ")"
            })


        // }

//  })
        // function changeImage (){

        // var images = svg.selectAll(".primaryImage")
        //             .data(dataSet, function(d) { return d.primaryImage });

        //         images.exit()
        //             .transition()
        //             .duration(1000)
        //             .attr("x", 0)
        //             .attr("y", (height) - margin.bottom)
        //             .remove()



        //         images.enter()
        //             .append("image")
        //             .attr("xlink:href", function(d) { return d.primaryImage;})
        //             .attr("width", 26)
        //             .attr("height", 26)
        //             .attr("x", width - margin.right / 2)
        //             .attr("y", (height) - margin.bottom / 2)
        //             .merge(images)
        //             .transition()
        //             .duration(2000)
        //             .attr("x", function(d) { return d.x; })
        //             .attr("y", function(d) { return d.y; });

        // }



        // Show tooltip when hovering over circle (data for respective country)
        d3.selectAll(".title").on("mousemove", function(d) {
            tooltip.html(`   <div class="container" style="max-width:100%">
                            <div class="row"><div class="col-md-6">
                          <strong>${d.title}</strong><br>
                          ${d.typeTrue}<br> 
                          <strong>${d.dateTrue}</strong><br>
                          </div>
                          <div class="col-sm-4">
                          <img src="${d.primaryImage}" alt="image here">
                          </div></div>
                          `)
                // .style('top', d3.event.pageY - 1 + 5 + 'px')
                // .style('left', d3.event.pageX + 1 + 10 + 'px')
                .style("opacity", 0.9)
                .style("left", d3.select(this).attr("cx") + "px")
                .style("top", d3.select(this).attr("cy") + "px");




            xLine.attr("x1", d3.select(this).attr("cx"))
                .attr("y1", d3.select(this).attr("cy"))
                .attr("y2", (height - margin.bottom))
                .attr("x2", d3.select(this).attr("cx"))
                .attr("opacity", 1)


        }).on("mouseout", function(_) {
            tooltip.style("opacity", 0);
            xLine.attr("opacity", 0);
        });

    }

    // Filter data based on which checkboxes are ticked
    function filter() {

        function getCheckedBoxes(checkboxName) {

            let checkboxes = d3.selectAll(checkboxName).nodes();
            let checkboxesChecked = [];
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxesChecked.push(checkboxes[i].defaultValue);
                }
            }
            return checkboxesChecked.length > 0 ? checkboxesChecked : null;
        }

        let checkedBoxes = getCheckedBoxes(".typeSort");

        let newData = [];

        if (checkedBoxes == null) {
            dataSet = newData;
            redraw();
            return;
        }

        for (let i = 0; i < checkedBoxes.length; i++) {
            let newArray = data.filter(function(d) {
                return d.typeSort === checkedBoxes[i];
            });
            Array.prototype.push.apply(newData, newArray);
        }

        dataSet = newData;
        redraw();
    }

}).catch(function(error) {
    if (error) throw error;
});
