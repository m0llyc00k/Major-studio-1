/*global d3*/

let height = 850;
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
    .range(['#d4c874', '#ba8a30', '#db666f', '#5c86aa', '#a53d24', '#76943c', '#66988d', '#ba5f41']);


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
    .attr("x", 0)
    .attr("y", 70)
    .attr("text-anchor", "left")
    .style("font-size", "30px")
    .style("fill", "#b9b6af")
    .style("font-family", "Zilla Slab")
    // .style("font-variant", "small-caps")
    // .style("font-weight", 500)
        // .style("font-family", "Zilla Slab Highlight")
    .style("font-weight", 500)
    .text("Political and Activist Ephemera at the Smithsonian");

// Add subtitle to graph
svg.append("text")
    .attr("x", 0)
    .attr("y", 110)
    .attr("text-anchor", "left")
    .style("font-size", "34px")
    .style("fill", "#b9b6af")
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


// Load and process data
d3.csv("./beeswarm-data-new-rev_nov20.csv").then(function(data) {

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
            .force("collide", d3.forceCollide(16)) // Apply collision force with radius of 9 - keeps nodes centers 9 pixels apart
            .stop(); // Stop simulation from starting automatically

        // Manually run simulation
        for (let i = 0; i < dataSet.length; ++i) {
            simulation.tick(5);
        }



        // Create ephemera circles
        // let titleCircles = svg.selectAll(".title")
        //     .data(dataSet, function(d) { return d.title });

        // titleCircles.exit()
        //     .transition()
        //     .duration(1000)
        //     .attr("cx", 0)
        //     .attr("cy", (height / 2) - margin.bottom / 2)
        //     .remove();

        // function changeFillImage() {
        //     d3.selectAll("circle")
        //         .transition()
        //         .duration(2000)
        //         .attr("fill", function(d) {
        //             return "url(#" + d.id + ")"
        //         })
        // }

        //     function changeFillColor() {
        //     d3.selectAll("circle")
        //         .transition()
        //         .duration(2000)
        //             .attr("fill", function(d) {
        //                 return colors(d.typeSort)
        //             })
        // }




        //fill circles with images

        var defs = svg.append('defs');

        defs.append("pattern")
            .attr("id", "d.title")
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
            .attr("id", function(d) {
                return d.id
            })
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

//create circles


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
            .attr("cx", 0)
            .attr("cy", (height / 2) - margin.bottom / 2)
            // .attr("cx", width - margin.right)
            // .attr("cy", (height) - margin.bottom)
            .attr("r", 13)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .attr("stroke", function(d) { return colors(d.typeSort) })
            .attr("stroke-width", 4)
            .merge(titleCircles)
            .transition()
            .duration(1000)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("fill", function(d) {
                return "url(#" + d.id + ")";
            })
            //modal attributes
            .attr('data-toggle', 'modal')
            .attr('data-target', '#exampleModal')
            .attr('data-id', function(d) {
                return d.id
            })
            .attr('data-title', function(d) {
                return d.title
            })
            .attr('data-typeTrue', function(d) {
                return d.typeTrue
            })
            .attr('data-description1', function(d) {
                return d.description1
            })
            .attr('data-dateTrue', function(d) {
                return d.dateTrue
            })
            .attr('data-filename1', d => {
            // all our images are in the "images"
            // folder which we will need to 
            // add to our filename first
            return './downloads/' + d.filename1
            // return d.primaryImage
            // return d.primaryImage
             })





        $('#exampleModal').on('show.bs.modal', function(event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = button.data('id') // Extract info from data-* attributes
            var img = button.data('filename1')
            var titleModal = button.data('title')
            var descriptModal = button.data('description1')
            var yearModal = button.data('dateTrue')
            var typeModal = button.data('typeTrue')



           


            console.log(recipient)
            //   If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            //   Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this)
            modal.find('.modal-title').html(titleModal)
            modal.find('.col-md-5').html('<img src= "' + img + '"></img>')
            // modal.find('.modal-year').text(yearModal)
            // modal.find('.modal-type').text(typeModal)
            modal.find('.col-md-6').html('<strong>' + yearModal + '</strong>' + '<br>' + typeModal + '<br>' + descriptModal)
            
        })








        // Show tooltip when hovering over circle (data for respective country)
        d3.selectAll(".title").on("mousemove", function(d) {
            // tooltip.html(`   <div class="container" style="max-width:100%">
            //                 <div class="row"><div class="col-md-6">
            //               <strong>${d.title}</strong><br>
            //               ${d.typeTrue}<br> 
            //               <strong>${d.dateTrue}</strong><br>
            //               </div>
            //               <div class="col-sm-4">
            //               <img src="${d.primaryImage}" alt="image here">
            //               </div></div>
            //               `)
            tooltip.html(`<div>
                          <strong>${d.title}</strong><br>
                          ${d.typeTrue}<br> 
                          <strong>${d.dateTrue}</strong><br>
                          </div>
                          `)
                .style('top', d3.event.pageY - 1 + 5 + 'px')
                .style('left', d3.event.pageX + 1 + 10 + 'px')
                .style("opacity", 0.9)
            // .style("left", d3.select(this).attr("cx") + "px")
            // .style("top", d3.select(this).attr("cy") + "px");



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


    function handleMouseOver(d, i) { // Add interactivity

        // Use D3 to select element, change size
        d3.select(this)
            .attr("r", 45)
        tooltip.style("opacity", 1);

    };

    function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this)
            .attr("r", 13)
        tooltip.style("opacity", 0);
        xLine.attr("opacity", 0);
    };




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

        d3.selectAll("circle")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);
    }



}).catch(function(error) {
    if (error) throw error;
});
