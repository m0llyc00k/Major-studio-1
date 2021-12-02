/* global d3 */

var w = 1400,
    h = 750;

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

d3.csv("./beeswarm-data-new-rev_dec1.csv").then(function(data) {

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



    function handleMouseOver2(d, i) { // Add interactivity
        // Add interactivity

        // Use D3 to select element, change size
        d3.select(this)
            .attr("r", 50)
            .style("fill", function(d) {
                return "url(#" + d.id + ")";
            })

        d3.select(this).raise()
    }


    function handleMouseOut2(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this)
            .attr("r", 13)
            .style("fill", function(d, i) { return color(d.typeSort); })
        tooltip.style("opacity", 0);
        xLine.attr("opacity", 0);

    };

    // function clicked2(d) {

    //     var me = d3.select(this)
    //     console.log(me.classed("selected"))
    //     me.classed("selected", !me.classed("selected"))

    //     d3.selectAll("circle")
    //         .style("fill", function(d, i) { return color(d.typeSort); })

    //     d3.selectAll("circle.selected")
    //         .style("fill", function(d) {
    //             return "url(#" + d.id + ")"
    //         })
    //     d3.selectAll("circle")
    //         .on("mouseover", handleMouseOver2)
    //         .on("mouseout", handleMouseOut2);
    // }

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
        .style("color", "white")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("mouseover", handleMouseOver2)
        .on("mouseout", handleMouseOut2)
        // .on("click", clicked2)
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


    ///modal///

    $('#exampleModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('id') // Extract info from data-* attributes
        var imge = button.data('filename1')
        var titleModal = button.data('title')
        var descriptModal = button.data('description1')
        var yearModal = button.data('dateTrue')
        var typeModal = button.data('typeTrue')

        var modal = $(this)
        modal.find('.modal-title').html(titleModal)
        // modal.find('.col-md-5').html('<img id="image2" src= "' + imge + '"></img>')
        modal.find('img').attr("src", imge)
        modal.find('.col-md-6').html('<strong>' + yearModal + '</strong>' + '<br>' + typeModal + '<br>' + descriptModal)

        magnify("imageMagnify", 2);

    })

    circles = circles.merge(circlesEnter)

    d3.selectAll("circle")
        .on("mouseover", handleMouseOver2)
        .on("mouseout", handleMouseOut2);


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
        simulation.force('x', d3.forceX().strength(.05));
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

        simulation.force('x', d3.forceX().strength(forceStrength).x(function(d) {
            return centerScale(d[byVar]);
        }));
        simulation.alpha(1.2).restart();
    }


///////////////// labels for clusters ////////////////
    function hideTitles() {
        svg2.selectAll('.title2').remove();
    }

	
    function showTitles(byVar, scale) {
        var titles = svg2.selectAll('.title2')
            .data(scale.domain())
            .style('color', 'white');

        titles.enter().append('text')
            .attr('class', 'title2')
            .style('color', 'white')
            .style('font-size', '15px')
            .merge(titles)
            .attr('x', function(d) { return scale(d); })
            .attr('y', 120)
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




////////////////magnifying glass////////////////////////
function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    console.log(img)
    /*create magnifier glass:*/

    glass = document.createElement("DIV");
    if (glass == 0) {
        glass++
    }
    glass.setAttribute("class", "img-magnifier-glass");
    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img);
    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);


    function moveMagnifier(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /*set the position of the magnifier glass:*/
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /*display what the magnifier glass "sees":*/
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }


    function getCursorPos(e) {
        var a, x = 0,
            y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}
