  function handleMouseOver(d, i) { // Add interactivity
            // Use D3 to select element, change size
            d3.select(this)
                .attr("r", 50)
                .attr("fill", function(d) {
                    return "url(#" + d.id + ")"
                })

            d3.select(this).raise()
            tooltip.style("opacity", 1)
        };


        function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this)
                .attr("r", 13)
                .attr("fill", function(d, i) { return colors(d.typeSort); })
            tooltip.style("opacity", 0);
            xLine.attr("opacity", 0);
        };

        function clicked(d) {

            var me = d3.select(this)
            console.log(me.classed("selected"))
            me.classed("selected", !me.classed("selected"))

            // d3.selectAll("circle")
            //     .style("fill", function(d, i) { return colors(d.typeSort); })

            d3.selectAll("circle.selected")
                .style("fill", function(d) {
                    return "url(#" + d.id + ")"
                })

            svg.selectAll(".title")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)
        }




   

    

