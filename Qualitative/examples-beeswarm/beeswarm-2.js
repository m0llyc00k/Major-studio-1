let height = 450;
let width = 1000;
let margin = ({top: 0, right: 40, bottom: 34, left: 40});
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
    .range(['#936C85','#530094','#A8B1E1','#0E09F8','#8C19E7','#12107A', '#8387F5', '#A8E1D8']);

d3.select("#buttonsColor").style("padding", "6px").style("color", colors("buttons"));
d3.select("#signsColor").style("color", colors("signs"));
d3.select("#postersColor").style("color", colors("posters"));
d3.select("#placardsColor").style("color", colors("placards"));
d3.select("#correspondenceColor").style("color", colors("correspondence"));
d3.select("#pamphletsColor").style("color", colors("pamphlets"));
d3.select("#fliersColor").style("color", colors("fliers"));
d3.select("#otherColor").style("color", colors("other"));


let svg = d3.select("#svganchor")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

let xScale = d3.scaleLinear()
    .domain(allDates.map(d => d.dateSort))
    .range([margin.left, width - margin.right])

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")");

// Create line that connects circle and X axis
let xLine = svg.append("line")
    .attr("stroke", "rgb(96,125,139)")
    .attr("stroke-dasharray", "3,4")
    .attr("stroke-width", "2");

// Create tooltip div and make it invisible
let tooltip = d3.select("#svganchor").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Load and process data
d3.csv("https://raw.githubusercontent.com/m0llyc00k/major-studio-1/main/Qualitative/examples-beeswarm/beeswarm-data-new-Images.csv").then(function (data) {

    let dataSet = data;

    redraw();



    // Trigger filter function whenever checkbox is ticked/unticked
    d3.selectAll("input").on("change", filter);

    function redraw() {

        // Set scale type based on button clicked
        if (chartState.scale === Scales.lin) {
            xScale = d3.scaleLinear().range([ margin.left, width - margin.right ])
        }

        if (chartState.scale === Scales.log) {
            xScale = d3.scaleLog().range([ margin.left, width - margin.right ]);
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
                return xScale(+d[chartState.measure]);  // This is the desired position
            }).strength(8))  // Increase velocity
            .force("y", d3.forceY((height / 2) - margin.bottom))  // // Apply positioning force to push nodes towards center along Y axis
            .force("collide", d3.forceCollide(10)) // Apply collision force with radius of 9 - keeps nodes centers 9 pixels apart
            .stop();  // Stop simulation from starting automatically

        // Manually run simulation
        for (let i = 0; i < dataSet.length; ++i) {
            simulation.tick(5);
        }

        // Create ephemera circles
        let titleCircles = svg.selectAll(".title")
            .data(dataSet, function(d) { return d.title });

        titleCircles.exit()
            .transition()
            .duration(1000)
            .attr("cx", 0)
            .attr("cy", (height / 2) - margin.bottom / 2)
            .remove();

        titleCircles.enter()
            .append("circle")
            .attr("class", "title")
            .attr("cx", width - margin.right)
            .attr("cy", (height) - margin.bottom)
            .attr("r", 10)
            .attr("stroke", "#F3F3F3")
            .attr("stroke-width", .5)
            .attr("fill", function(d){ return colors(d.typeSort)})
            .merge(titleCircles)
            .transition()
            .duration(2000)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        // Show tooltip when hovering over circle (data for respective country)
        d3.selectAll(".title").on("mousemove", function(d) {
            tooltip.html(`<div id="textTooltip">
                          <strong>${d.title}</strong><br>
                          ${d.typeTrue}<br> 
                          <strong>${d.dateTrue}</strong><br>
                          ${d.description} <br>
                          </div>
                          <div id="imageTooltip" float:right>
                          <img src="${d.primaryImage}" alt="image here">
                          </div>
                          `)
                .style('top', d3.event.pageY - 1 + 12 + 'px')
                .style('left', d3.event.pageX + 1 + 25 + 'px')
                .style("opacity", 0.9)
    
               
                
                

            xLine.attr("x1", d3.select(this).attr("cx"))
                .attr("y1", d3.select(this).attr("cy"))
                .attr("y2", (height - margin.bottom))
                .attr("x2",  d3.select(this).attr("cx"))
                .attr("opacity", 1);

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

        for (let i = 0; i < checkedBoxes.length; i++){
            let newArray = data.filter(function(d) {
                return d.typeSort === checkedBoxes[i];
            });
            Array.prototype.push.apply(newData, newArray);
        }

        dataSet = newData;
        redraw();
    }

}).catch(function (error) {
    if (error) throw error;
});