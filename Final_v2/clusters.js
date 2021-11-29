/* global d3 */

var w = 1400,
    h = 800;

var radius = 12;
var color = d3.scaleOrdinal()
    .domain(["buttons", "signs", "posters", "placards", "correspondence", "pamphlets", "fliers", "other"])
    .range(['#d4c874', '#ba8a30', '#db666f', '#5c86aa', '#a53d24', '#76943c', '#66988d', '#ba5f41']);

var centerScale = d3.scalePoint().padding(1).range([0, w]);
var forceStrength = 0.08;

var svg2 = d3.select("#svgclusters").append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("viewBox", `0 0 1400 800`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    


var simulation = d3.forceSimulation()
    .force("collide", d3.forceCollide(function(d) {
        return d.r + 2
    }).iterations(10))
    .force("charge", d3.forceManyBody())
    .force("y", d3.forceY().y(h / 2))
    .force("x", d3.forceX().x(w / 2))

d3.csv("beeswarm-data-new-rev_nov20.csv").then(function(data) {

    data.forEach(function(d) {
        d.r = radius;
        d.x = w / 2;
        d.y = h / 2;
    })
    // data.forEach(function(d){
    // d.r = radius;
    // d.x = w / 2;
    // d.y = h / 2;
    // })

    console.log(data);

        var defs2 = svg2.append('defs2');

        defs2.append("pattern")
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

        defs2.selectAll(".title-pattern2")
            .data(data)
            .enter().append("pattern")
            .attr("class", "title-pattern2")
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


    d3.selectAll("circle")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    function handleMouseOver(d, i) { // Add interactivity

        // Use D3 to select element, change size
        d3.select(this)
            .attr("r", 45)
            .attr("fill", function(d) {
                return "url(#" + d.id + ")"
            })
    };

    function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this)
            .attr("r", 12)
            
            tooltip.style("opacity", 0);
            xLine.attr("opacity", 0);
    };

    var circles = svg2.selectAll("circle")
        .data(data, function(d) { return d.id; });

    var circlesEnter = circles.enter().append("circle")
        .attr("r", function(d, i) { return d.r; })
        .attr("cx", function(d, i) { return 175 + 25 * i + 2 * i ** 5; })
        .attr("cy", function(d, i) { return 500; })
        .style("fill", function(d, i) { return color(d.typeSort); })
        .style("stroke", function(d, i) { return color(d.typeSort); })
        .style("stroke-width", 3)
        .style("pointer-events", "all")
        .style("padding", "none")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    circles = circles.merge(circlesEnter)

    function ticked() {
        //console.log("tick")
        //console.log(data.map(function(d){ return d.x; }));
        circles
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

    simulation
        .nodes(data)
        .on("tick", ticked);

    function dragstarted(d, i) {
        //console.log("dragstarted " + i)
        if (!d3.event.active) simulation.alpha(1).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d, i) {
        //console.log("dragged " + i)
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }




    function dragended(d, i) {
        //console.log("dragended " + i)
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        var me = d3.select(this)
        console.log(me.classed("selected"))
        me.classed("selected", !me.classed("selected"))

        d3.selectAll("circle")
            .style("fill", function(d, i) { return color(d.typeSort); })

        d3.selectAll("circle.selected")
                .style("fill", function(d) {
                return "url(#" + d.id + ")"
            })

    }

    function groupBubbles() {
        hideTitles();

        // @v4 Reset the 'x' force to draw the bubbles to the center.
        // simulation.force('x', d3.forceX().strength(forceStrength).x(w / 4));
        simulation.force('x', d3.forceX().strength(.05));



        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
    }

    function splitBubbles(byVar) {

        centerScale.domain(data.map(function(d) { return d[byVar]; }));

        if (byVar == "id") {
            hideTitles()
        }
        else {
            showTitles(byVar, centerScale);
        }

        // @v4 Reset the 'x' force to draw the bubbles to their year centers
        simulation.force('x', d3.forceX().strength(forceStrength).x(function(d) {
            return centerScale(d[byVar]);
        }));

        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(2).restart();
    }

    function hideTitles() {
        svg2.selectAll('.title').remove();
    }

    function showTitles(byVar, scale) {
        // Another way to do this would be to create
        // the year texts once and then just hide them.
        var titles = svg2.selectAll('.title')
            .data(scale.domain());

        titles.enter().append('text')
            .attr('class', 'title')
            .merge(titles)
            .attr('x', function(d) { return scale(d); })
            .attr('y', 60)
            .attr('text-anchor', 'middle')
            .text(function(d) { return d; })


        titles.exit().remove()
    }



    function setupButtons() {
        d3.selectAll('.button')
            .on('click', function() {

                // Remove active class from all buttons
                d3.selectAll('.button').classed('active', false);
                // Find the button just clicked
                var button = d3.select(this);

                // Set it as the active button
                button.classed('active', true);

                // Get the id of the button
                var buttonId = button.attr('id');

                console.log(buttonId)
                // Toggle the bubble chart based on
                // the currently clicked button.
                splitBubbles(buttonId);
            });
    }

    setupButtons()

})
