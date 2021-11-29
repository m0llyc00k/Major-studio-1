{"filter":false,"title":"beeswarm.js","tooltip":"/Final/beeswarm.js","undoManager":{"mark":100,"position":100,"stack":[[{"start":{"row":281,"column":16},"end":{"row":281,"column":19},"action":"remove","lines":["// "],"id":2648},{"start":{"row":282,"column":16},"end":{"row":282,"column":19},"action":"remove","lines":["// "]}],[{"start":{"row":284,"column":16},"end":{"row":284,"column":19},"action":"insert","lines":["// "],"id":2649},{"start":{"row":285,"column":16},"end":{"row":285,"column":19},"action":"insert","lines":["// "]}],[{"start":{"row":307,"column":8},"end":{"row":307,"column":12},"action":"remove","lines":["    "],"id":2650}],[{"start":{"row":323,"column":26},"end":{"row":324,"column":0},"action":"insert","lines":["",""],"id":2651},{"start":{"row":324,"column":0},"end":{"row":324,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":324,"column":12},"end":{"row":325,"column":0},"action":"insert","lines":["            tooltip.style(\"opacity\", 0);",""],"id":2652}],[{"start":{"row":324,"column":20},"end":{"row":324,"column":24},"action":"remove","lines":["    "],"id":2653},{"start":{"row":324,"column":16},"end":{"row":324,"column":20},"action":"remove","lines":["    "]},{"start":{"row":324,"column":12},"end":{"row":324,"column":16},"action":"remove","lines":["    "]}],[{"start":{"row":324,"column":40},"end":{"row":325,"column":0},"action":"insert","lines":["",""],"id":2654},{"start":{"row":325,"column":0},"end":{"row":325,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":325,"column":12},"end":{"row":326,"column":0},"action":"insert","lines":["            xLine.attr(\"opacity\", 0);",""],"id":2655}],[{"start":{"row":325,"column":20},"end":{"row":325,"column":24},"action":"remove","lines":["    "],"id":2656},{"start":{"row":325,"column":16},"end":{"row":325,"column":20},"action":"remove","lines":["    "]},{"start":{"row":325,"column":12},"end":{"row":325,"column":16},"action":"remove","lines":["    "]}],[{"start":{"row":328,"column":6},"end":{"row":329,"column":0},"action":"insert","lines":["",""],"id":2657},{"start":{"row":329,"column":0},"end":{"row":329,"column":4},"action":"insert","lines":["    "]},{"start":{"row":329,"column":4},"end":{"row":330,"column":0},"action":"insert","lines":["",""]},{"start":{"row":330,"column":0},"end":{"row":330,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":330,"column":4},"end":{"row":362,"column":5},"action":"insert","lines":["","    function dragstarted(d, i) {","        //console.log(\"dragstarted \" + i)","        if (!d3.event.active) simulation.alpha(1).restart();","        d.fx = d.x;","        d.fy = d.y;","    }","","    function dragged(d, i) {","        //console.log(\"dragged \" + i)","        d.fx = d3.event.x;","        d.fy = d3.event.y;","    }","","","","","    function dragended(d, i) {","        //console.log(\"dragended \" + i)","        if (!d3.event.active) simulation.alphaTarget(0);","        d.fx = null;","        d.fy = null;","        var me = d3.select(this)","        console.log(me.classed(\"selected\"))","        me.classed(\"selected\", !me.classed(\"selected\"))","","        d3.selectAll(\"circle\")","            .style(\"fill\", function(d, i) { return color(d.typeSort); })","","        d3.selectAll(\"circle.selected\")","            .style(\"fill\", \"none\")","","    }"],"id":2658}],[{"start":{"row":343,"column":0},"end":{"row":344,"column":0},"action":"remove","lines":["",""],"id":2659},{"start":{"row":342,"column":5},"end":{"row":343,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":229,"column":14},"end":{"row":230,"column":0},"action":"insert","lines":["",""],"id":2660},{"start":{"row":230,"column":0},"end":{"row":230,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":230,"column":12},"end":{"row":232,"column":35},"action":"insert","lines":["            .on(\"start\", dragstarted)","            .on(\"drag\", dragged)","            .on(\"end\", dragended));"],"id":2661}],[{"start":{"row":232,"column":33},"end":{"row":232,"column":34},"action":"remove","lines":[")"],"id":2662}],[{"start":{"row":230,"column":20},"end":{"row":230,"column":24},"action":"remove","lines":["    "],"id":2663},{"start":{"row":230,"column":16},"end":{"row":230,"column":20},"action":"remove","lines":["    "]},{"start":{"row":230,"column":12},"end":{"row":230,"column":16},"action":"remove","lines":["    "]}],[{"start":{"row":229,"column":14},"end":{"row":230,"column":0},"action":"insert","lines":["",""],"id":2664},{"start":{"row":230,"column":0},"end":{"row":230,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":230,"column":12},"end":{"row":230,"column":35},"action":"insert","lines":["        .call(d3.drag()"],"id":2665}],[{"start":{"row":233,"column":33},"end":{"row":233,"column":34},"action":"insert","lines":[")"],"id":2666}],[{"start":{"row":230,"column":16},"end":{"row":230,"column":20},"action":"remove","lines":["    "],"id":2667},{"start":{"row":230,"column":12},"end":{"row":230,"column":16},"action":"remove","lines":["    "]}],[{"start":{"row":333,"column":0},"end":{"row":333,"column":4},"action":"remove","lines":["    "],"id":2668},{"start":{"row":333,"column":0},"end":{"row":334,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":334,"column":0},"end":{"row":341,"column":37},"action":"insert","lines":["","var simulation = d3.forceSimulation()","    .force(\"collide\", d3.forceCollide(function(d) {","        return d.r + 2","    }).iterations(10))","    .force(\"charge\", d3.forceManyBody())","    .force(\"y\", d3.forceY().y(h / 2))","    .force(\"x\", d3.forceX().x(w / 2))"],"id":2669}],[{"start":{"row":340,"column":31},"end":{"row":340,"column":32},"action":"insert","lines":["e"],"id":2670},{"start":{"row":340,"column":32},"end":{"row":340,"column":33},"action":"insert","lines":["i"]}],[{"start":{"row":340,"column":30},"end":{"row":340,"column":33},"action":"remove","lines":["hei"],"id":2671},{"start":{"row":340,"column":30},"end":{"row":340,"column":36},"action":"insert","lines":["height"]}],[{"start":{"row":341,"column":31},"end":{"row":341,"column":32},"action":"insert","lines":["i"],"id":2672},{"start":{"row":341,"column":32},"end":{"row":341,"column":33},"action":"insert","lines":["d"]}],[{"start":{"row":341,"column":30},"end":{"row":341,"column":33},"action":"remove","lines":["wid"],"id":2673},{"start":{"row":341,"column":30},"end":{"row":341,"column":35},"action":"insert","lines":["width"]}],[{"start":{"row":335,"column":0},"end":{"row":356,"column":0},"action":"remove","lines":["var simulation = d3.forceSimulation()","    .force(\"collide\", d3.forceCollide(function(d) {","        return d.r + 2","    }).iterations(10))","    .force(\"charge\", d3.forceManyBody())","    .force(\"y\", d3.forceY().y(height / 2))","    .force(\"x\", d3.forceX().x(width / 2))","    ","    function dragstarted(d, i) {","        //console.log(\"dragstarted \" + i)","        if (!d3.event.active) simulation.alpha(1).restart();","        d.fx = d.x;","        d.fy = d.y;","    }","","    function dragged(d, i) {","        //console.log(\"dragged \" + i)","        d.fx = d3.event.x;","        d.fy = d3.event.y;","    }","",""],"id":2674}],[{"start":{"row":230,"column":0},"end":{"row":234,"column":0},"action":"remove","lines":["            .call(d3.drag()","            .on(\"start\", dragstarted)","            .on(\"drag\", dragged)","            .on(\"end\", dragended));",""],"id":2675}],[{"start":{"row":140,"column":25},"end":{"row":140,"column":26},"action":"insert","lines":["2"],"id":2676}],[{"start":{"row":140,"column":25},"end":{"row":140,"column":26},"action":"remove","lines":["2"],"id":2677}],[{"start":{"row":332,"column":2},"end":{"row":347,"column":5},"action":"remove","lines":["  function dragended(d, i) {","        //console.log(\"dragended \" + i)","        if (!d3.event.active) simulation.alphaTarget(0);","        d.fx = null;","        d.fy = null;","        var me = d3.select(this)","        console.log(me.classed(\"selected\"))","        me.classed(\"selected\", !me.classed(\"selected\"))","","        d3.selectAll(\"circle\")","            .style(\"fill\", function(d, i) { return color(d.typeSort); })","","        d3.selectAll(\"circle.selected\")","            .style(\"fill\", \"none\")","","    }"],"id":2678}],[{"start":{"row":332,"column":2},"end":{"row":349,"column":5},"action":"insert","lines":["    function dragended(d, i) {","        //console.log(\"dragended \" + i)","        if (!d3.event.active) simulation.alphaTarget(0);","        d.fx = null;","        d.fy = null;","        var me = d3.select(this)","        console.log(me.classed(\"selected\"))","        me.classed(\"selected\", !me.classed(\"selected\"))","","        d3.selectAll(\"circle\")","            .style(\"fill\", function(d, i) { return color(d.typeSort); })","","        d3.selectAll(\"circle.selected\")","                .style(\"fill\", function(d) {","                return \"url(#\" + d.id + \")\"","            })","","    }"],"id":2679}],[{"start":{"row":342,"column":56},"end":{"row":342,"column":57},"action":"insert","lines":["s"],"id":2680}],[{"start":{"row":330,"column":0},"end":{"row":337,"column":37},"action":"insert","lines":["","var simulation = d3.forceSimulation()","    .force(\"collide\", d3.forceCollide(function(d) {","        return d.r + 2","    }).iterations(10))","    .force(\"charge\", d3.forceManyBody())","    .force(\"y\", d3.forceY().y(h / 2))","    .force(\"x\", d3.forceX().x(w / 2))"],"id":2681}],[{"start":{"row":337,"column":37},"end":{"row":338,"column":0},"action":"insert","lines":["",""],"id":2682},{"start":{"row":338,"column":0},"end":{"row":338,"column":4},"action":"insert","lines":["    "]},{"start":{"row":338,"column":4},"end":{"row":339,"column":0},"action":"insert","lines":["",""]},{"start":{"row":339,"column":0},"end":{"row":339,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":339,"column":4},"end":{"row":340,"column":12},"action":"insert","lines":["var w = 1400,","    h = 800;"],"id":2683}],[{"start":{"row":341,"column":0},"end":{"row":367,"column":0},"action":"insert","lines":[" function ticked() {","        //console.log(\"tick\")","        //console.log(data.map(function(d){ return d.x; }));","        circles","            .attr(\"cx\", function(d) { return d.x; })","            .attr(\"cy\", function(d) { return d.y; });","    }","","    simulation","        .nodes(data)","        .on(\"tick\", ticked);","","    function dragstarted(d, i) {","        //console.log(\"dragstarted \" + i)","        if (!d3.event.active) simulation.alpha(1).restart();","        d.fx = d.x;","        d.fy = d.y;","    }","","    function dragged(d, i) {","        //console.log(\"dragged \" + i)","        d.fx = d3.event.x;","        d.fy = d3.event.y;","    }","","",""],"id":2684}],[{"start":{"row":340,"column":12},"end":{"row":341,"column":0},"action":"insert","lines":["",""],"id":2685},{"start":{"row":341,"column":0},"end":{"row":341,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":341,"column":4},"end":{"row":342,"column":50},"action":"insert","lines":["    var circles = svg2.selectAll(\"circle\")","        .data(data, function(d) { return d.id; });"],"id":2686}],[{"start":{"row":341,"column":25},"end":{"row":341,"column":26},"action":"remove","lines":["2"],"id":2687}],[{"start":{"row":229,"column":14},"end":{"row":230,"column":0},"action":"insert","lines":["",""],"id":2688},{"start":{"row":230,"column":0},"end":{"row":230,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":230,"column":12},"end":{"row":233,"column":35},"action":"insert","lines":["        .call(d3.drag()","            .on(\"start\", dragstarted)","            .on(\"drag\", dragged)","            .on(\"end\", dragended));"],"id":2689}],[{"start":{"row":319,"column":12},"end":{"row":319,"column":15},"action":"insert","lines":["// "],"id":2693},{"start":{"row":320,"column":12},"end":{"row":320,"column":15},"action":"insert","lines":["// "]}],[{"start":{"row":321,"column":12},"end":{"row":321,"column":15},"action":"insert","lines":["// "],"id":2694}],[{"start":{"row":230,"column":12},"end":{"row":230,"column":20},"action":"remove","lines":["        "],"id":2695},{"start":{"row":231,"column":0},"end":{"row":231,"column":4},"action":"insert","lines":["    "]},{"start":{"row":232,"column":12},"end":{"row":232,"column":16},"action":"insert","lines":["    "]},{"start":{"row":233,"column":0},"end":{"row":233,"column":4},"action":"insert","lines":["    "]},{"start":{"row":279,"column":12},"end":{"row":279,"column":13},"action":"remove","lines":[" "]},{"start":{"row":288,"column":12},"end":{"row":288,"column":16},"action":"remove","lines":["    "]},{"start":{"row":289,"column":0},"end":{"row":289,"column":4},"action":"remove","lines":["    "]},{"start":{"row":309,"column":0},"end":{"row":309,"column":4},"action":"remove","lines":["    "]},{"start":{"row":312,"column":8},"end":{"row":312,"column":10},"action":"remove","lines":["  "]},{"start":{"row":319,"column":8},"end":{"row":319,"column":12},"action":"remove","lines":["    "]},{"start":{"row":320,"column":0},"end":{"row":320,"column":4},"action":"remove","lines":["    "]},{"start":{"row":321,"column":0},"end":{"row":321,"column":4},"action":"remove","lines":["    "]},{"start":{"row":328,"column":8},"end":{"row":328,"column":12},"action":"remove","lines":["    "]},{"start":{"row":329,"column":0},"end":{"row":329,"column":4},"action":"remove","lines":["    "]},{"start":{"row":335,"column":0},"end":{"row":335,"column":4},"action":"insert","lines":["    "]},{"start":{"row":336,"column":4},"end":{"row":336,"column":8},"action":"insert","lines":["    "]},{"start":{"row":337,"column":8},"end":{"row":337,"column":12},"action":"insert","lines":["    "]},{"start":{"row":338,"column":0},"end":{"row":338,"column":4},"action":"insert","lines":["    "]},{"start":{"row":339,"column":4},"end":{"row":339,"column":8},"action":"insert","lines":["    "]},{"start":{"row":340,"column":0},"end":{"row":340,"column":2},"action":"insert","lines":["  "]},{"start":{"row":340,"column":6},"end":{"row":340,"column":8},"action":"insert","lines":["  "]},{"start":{"row":341,"column":0},"end":{"row":341,"column":4},"action":"insert","lines":["    "]},{"start":{"row":342,"column":0},"end":{"row":342,"column":4},"action":"remove","lines":["    "]},{"start":{"row":344,"column":4},"end":{"row":344,"column":8},"action":"insert","lines":["    "]},{"start":{"row":345,"column":0},"end":{"row":345,"column":4},"action":"remove","lines":["    "]},{"start":{"row":347,"column":0},"end":{"row":348,"column":3},"action":"insert","lines":["","   "]},{"start":{"row":375,"column":4},"end":{"row":375,"column":6},"action":"remove","lines":["  "]},{"start":{"row":388,"column":0},"end":{"row":388,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":345,"column":0},"end":{"row":346,"column":50},"action":"remove","lines":["    var circles = svg.selectAll(\"circle\")","        .data(data, function(d) { return d.id; });"],"id":2696}],[{"start":{"row":350,"column":8},"end":{"row":350,"column":15},"action":"remove","lines":["circles"],"id":2697},{"start":{"row":350,"column":8},"end":{"row":350,"column":9},"action":"insert","lines":["t"]},{"start":{"row":350,"column":9},"end":{"row":350,"column":10},"action":"insert","lines":["i"]},{"start":{"row":350,"column":10},"end":{"row":350,"column":11},"action":"insert","lines":["t"]}],[{"start":{"row":350,"column":8},"end":{"row":350,"column":11},"action":"remove","lines":["tit"],"id":2698},{"start":{"row":350,"column":8},"end":{"row":350,"column":20},"action":"insert","lines":["titleCircles"]}],[{"start":{"row":104,"column":0},"end":{"row":106,"column":25},"action":"remove","lines":["let tooltip2 = d3.select(\"#svgbeeswarm\").append(\"div\")","    .attr(\"class\", \"tooltip\")","    .style(\"opacity\", 0);"],"id":2699},{"start":{"row":103,"column":0},"end":{"row":104,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":310,"column":0},"end":{"row":311,"column":0},"action":"insert","lines":["",""],"id":2702},{"start":{"row":311,"column":0},"end":{"row":312,"column":0},"action":"insert","lines":["",""]},{"start":{"row":312,"column":0},"end":{"row":313,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":311,"column":0},"end":{"row":312,"column":50},"action":"insert","lines":["    var circles = svg2.selectAll(\"circle\")","        .data(data, function(d) { return d.id; });"],"id":2703}],[{"start":{"row":311,"column":21},"end":{"row":311,"column":22},"action":"remove","lines":["2"],"id":2704}],[{"start":{"row":312,"column":44},"end":{"row":312,"column":45},"action":"remove","lines":["d"],"id":2705},{"start":{"row":312,"column":43},"end":{"row":312,"column":44},"action":"remove","lines":["i"]}],[{"start":{"row":312,"column":43},"end":{"row":312,"column":44},"action":"insert","lines":["t"],"id":2706},{"start":{"row":312,"column":44},"end":{"row":312,"column":45},"action":"insert","lines":["i"]},{"start":{"row":312,"column":45},"end":{"row":312,"column":46},"action":"insert","lines":["t"]}],[{"start":{"row":312,"column":43},"end":{"row":312,"column":46},"action":"remove","lines":["tit"],"id":2707},{"start":{"row":312,"column":43},"end":{"row":312,"column":48},"action":"insert","lines":["title"]}],[{"start":{"row":311,"column":0},"end":{"row":312,"column":53},"action":"remove","lines":["    var circles = svg.selectAll(\"circle\")","        .data(data, function(d) { return d.title; });"],"id":2708}],[{"start":{"row":334,"column":0},"end":{"row":335,"column":53},"action":"insert","lines":["    var circles = svg.selectAll(\"circle\")","        .data(data, function(d) { return d.title; });"],"id":2709}],[{"start":{"row":335,"column":53},"end":{"row":336,"column":0},"action":"insert","lines":["",""],"id":2710},{"start":{"row":336,"column":0},"end":{"row":336,"column":8},"action":"insert","lines":["        "]},{"start":{"row":336,"column":8},"end":{"row":337,"column":0},"action":"insert","lines":["",""]},{"start":{"row":337,"column":0},"end":{"row":337,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":335,"column":43},"end":{"row":335,"column":48},"action":"remove","lines":["title"],"id":2711},{"start":{"row":335,"column":43},"end":{"row":335,"column":44},"action":"insert","lines":["i"]},{"start":{"row":335,"column":44},"end":{"row":335,"column":45},"action":"insert","lines":["d"]}],[{"start":{"row":334,"column":4},"end":{"row":362,"column":32},"action":"remove","lines":["var circles = svg.selectAll(\"circle\")","        .data(data, function(d) { return d.id; });","        ","        ","    var simulation = d3.forceSimulation()","        .force(\"collide\", d3.forceCollide(function(d) {","            return d.r + 2","        }).iterations(10))","        .force(\"charge\", d3.forceManyBody())","        .force(\"y\", d3.forceY().y(h / 2))","        .force(\"x\", d3.forceX().x(w / 2))","","    var w = 1400,","        h = 800;","","","    function ticked() {","        //console.log(\"tick\")","        //console.log(data.map(function(d){ return d.x; }));","        titleCircles","            .attr(\"cx\", function(d) { return d.x; })","            .attr(\"cy\", function(d) { return d.y; });","    }","","    simulation","        .nodes(data)","        .on(\"tick\", ticked);","","    function dragstarted(d, i) {"],"id":2712}],[{"start":{"row":334,"column":4},"end":{"row":364,"column":14},"action":"remove","lines":["","        //console.log(\"dragstarted \" + i)","        if (!d3.event.active) simulation.alpha(1).restart();","        d.fx = d.x;","        d.fy = d.y;","    }","","    function dragged(d, i) {","        //console.log(\"dragged \" + i)","        d.fx = d3.event.x;","        d.fy = d3.event.y;","    }","","","","    function dragended(d, i) {","        //console.log(\"dragended \" + i)","        if (!d3.event.active) simulation.alphaTarget(0);","        d.fx = null;","        d.fy = null;","        var me = d3.select(this)","        console.log(me.classed(\"selected\"))","        me.classed(\"selected\", !me.classed(\"selected\"))","","        d3.selectAll(\"circle\")","            .style(\"fill\", function(d, i) { return colors(d.typeSort); })","","        d3.selectAll(\"circle.selected\")","            .style(\"fill\", function(d) {","                return \"url(#\" + d.id + \")\"","            })"],"id":2713}],[{"start":{"row":336,"column":4},"end":{"row":336,"column":5},"action":"remove","lines":["}"],"id":2714}],[{"start":{"row":334,"column":4},"end":{"row":335,"column":0},"action":"remove","lines":["",""],"id":2715}],[{"start":{"row":227,"column":0},"end":{"row":231,"column":0},"action":"remove","lines":["            .call(d3.drag()","                .on(\"start\", dragstarted)","                .on(\"drag\", dragged)","                .on(\"end\", dragended));",""],"id":2716}],[{"start":{"row":302,"column":0},"end":{"row":305,"column":40},"action":"remove","lines":["","    d3.selectAll(\"circle\")","        .on(\"mouseover\", handleMouseOver)","        .on(\"mouseout\", handleMouseOut);"],"id":2717}],[{"start":{"row":369,"column":0},"end":{"row":370,"column":0},"action":"insert","lines":["",""],"id":2718}],[{"start":{"row":328,"column":4},"end":{"row":331,"column":40},"action":"insert","lines":["","    d3.selectAll(\"circle\")","        .on(\"mouseover\", handleMouseOver)","        .on(\"mouseout\", handleMouseOut);"],"id":2720}],[{"start":{"row":367,"column":5},"end":{"row":368,"column":0},"action":"insert","lines":["",""],"id":2721},{"start":{"row":368,"column":0},"end":{"row":368,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":368,"column":4},"end":{"row":371,"column":40},"action":"insert","lines":["","    d3.selectAll(\"circle\")","        .on(\"mouseover\", handleMouseOver)","        .on(\"mouseout\", handleMouseOut);"],"id":2722}],[{"start":{"row":369,"column":0},"end":{"row":371,"column":40},"action":"remove","lines":["    d3.selectAll(\"circle\")","        .on(\"mouseover\", handleMouseOver)","        .on(\"mouseout\", handleMouseOut);"],"id":2723}],[{"start":{"row":366,"column":17},"end":{"row":367,"column":0},"action":"insert","lines":["",""],"id":2724},{"start":{"row":367,"column":0},"end":{"row":367,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":367,"column":8},"end":{"row":370,"column":40},"action":"insert","lines":["","    d3.selectAll(\"circle\")","        .on(\"mouseover\", handleMouseOver)","        .on(\"mouseout\", handleMouseOut);"],"id":2725}],[{"start":{"row":327,"column":0},"end":{"row":331,"column":40},"action":"remove","lines":["    ","    ","    d3.selectAll(\"circle\")","        .on(\"mouseover\", handleMouseOver)","        .on(\"mouseout\", handleMouseOut);"],"id":2726}],[{"start":{"row":312,"column":8},"end":{"row":312,"column":11},"action":"remove","lines":["// "],"id":2727},{"start":{"row":313,"column":8},"end":{"row":313,"column":11},"action":"remove","lines":["// "]},{"start":{"row":314,"column":8},"end":{"row":314,"column":11},"action":"remove","lines":["// "]}],[{"start":{"row":311,"column":23},"end":{"row":311,"column":24},"action":"remove","lines":["2"],"id":2728}],[{"start":{"row":311,"column":23},"end":{"row":311,"column":24},"action":"insert","lines":["4"],"id":2729}],[{"start":{"row":311,"column":24},"end":{"row":311,"column":25},"action":"remove","lines":["5"],"id":2730},{"start":{"row":311,"column":23},"end":{"row":311,"column":24},"action":"remove","lines":["4"]}],[{"start":{"row":311,"column":23},"end":{"row":311,"column":24},"action":"insert","lines":["6"],"id":2731},{"start":{"row":311,"column":24},"end":{"row":311,"column":25},"action":"insert","lines":["0"]}],[{"start":{"row":226,"column":14},"end":{"row":227,"column":0},"action":"insert","lines":["",""],"id":2732},{"start":{"row":227,"column":0},"end":{"row":227,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":227,"column":12},"end":{"row":228,"column":42},"action":"insert","lines":[".on(\"click\", function(d) {","        alert(\"on click get data\" + d.id);"],"id":2733}],[{"start":{"row":228,"column":8},"end":{"row":228,"column":12},"action":"insert","lines":["    "],"id":2734}],[{"start":{"row":227,"column":12},"end":{"row":227,"column":15},"action":"insert","lines":["// "],"id":2735},{"start":{"row":228,"column":12},"end":{"row":228,"column":15},"action":"insert","lines":["// "]}],[{"start":{"row":227,"column":0},"end":{"row":228,"column":49},"action":"remove","lines":["            // .on(\"click\", function(d) {","            // alert(\"on click get data\" + d.id);"],"id":2736},{"start":{"row":227,"column":0},"end":{"row":227,"column":1},"action":"insert","lines":["s"]}],[{"start":{"row":227,"column":0},"end":{"row":227,"column":1},"action":"remove","lines":["s"],"id":2737}],[{"start":{"row":226,"column":14},"end":{"row":227,"column":0},"action":"insert","lines":["",""],"id":2739},{"start":{"row":227,"column":0},"end":{"row":227,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":227,"column":12},"end":{"row":228,"column":40},"action":"insert","lines":["        .on(\"mouseover\", handleMouseOver)","        .on(\"mouseout\", handleMouseOut);"],"id":2740}],[{"start":{"row":227,"column":16},"end":{"row":227,"column":20},"action":"remove","lines":["    "],"id":2741},{"start":{"row":227,"column":12},"end":{"row":227,"column":16},"action":"remove","lines":["    "]}],[{"start":{"row":228,"column":8},"end":{"row":228,"column":12},"action":"insert","lines":["    "],"id":2742}],[{"start":{"row":227,"column":17},"end":{"row":227,"column":26},"action":"remove","lines":["mouseover"],"id":2743},{"start":{"row":227,"column":17},"end":{"row":227,"column":18},"action":"insert","lines":["c"]},{"start":{"row":227,"column":18},"end":{"row":227,"column":19},"action":"insert","lines":["l"]},{"start":{"row":227,"column":19},"end":{"row":227,"column":20},"action":"insert","lines":["o"]},{"start":{"row":227,"column":20},"end":{"row":227,"column":21},"action":"insert","lines":["c"]},{"start":{"row":227,"column":21},"end":{"row":227,"column":22},"action":"insert","lines":["k"]}],[{"start":{"row":227,"column":21},"end":{"row":227,"column":22},"action":"remove","lines":["k"],"id":2744},{"start":{"row":227,"column":20},"end":{"row":227,"column":21},"action":"remove","lines":["c"]},{"start":{"row":227,"column":19},"end":{"row":227,"column":20},"action":"remove","lines":["o"]}],[{"start":{"row":227,"column":19},"end":{"row":227,"column":20},"action":"insert","lines":["i"],"id":2745},{"start":{"row":227,"column":20},"end":{"row":227,"column":21},"action":"insert","lines":["c"]},{"start":{"row":227,"column":21},"end":{"row":227,"column":22},"action":"insert","lines":["k"]}],[{"start":{"row":227,"column":17},"end":{"row":227,"column":22},"action":"remove","lines":["click"],"id":2746},{"start":{"row":227,"column":17},"end":{"row":227,"column":18},"action":"insert","lines":["m"]},{"start":{"row":227,"column":18},"end":{"row":227,"column":19},"action":"insert","lines":["o"]},{"start":{"row":227,"column":19},"end":{"row":227,"column":20},"action":"insert","lines":["u"]}],[{"start":{"row":227,"column":17},"end":{"row":227,"column":20},"action":"remove","lines":["mou"],"id":2764},{"start":{"row":227,"column":17},"end":{"row":227,"column":18},"action":"insert","lines":["s"]},{"start":{"row":227,"column":18},"end":{"row":227,"column":19},"action":"insert","lines":["e"]},{"start":{"row":227,"column":19},"end":{"row":227,"column":20},"action":"insert","lines":["o"]},{"start":{"row":227,"column":20},"end":{"row":227,"column":21},"action":"insert","lines":["v"]},{"start":{"row":227,"column":21},"end":{"row":227,"column":22},"action":"insert","lines":["e"]},{"start":{"row":227,"column":22},"end":{"row":227,"column":23},"action":"insert","lines":["r"]}],[{"start":{"row":227,"column":22},"end":{"row":227,"column":23},"action":"remove","lines":["r"],"id":2765},{"start":{"row":227,"column":21},"end":{"row":227,"column":22},"action":"remove","lines":["e"]},{"start":{"row":227,"column":20},"end":{"row":227,"column":21},"action":"remove","lines":["v"]},{"start":{"row":227,"column":19},"end":{"row":227,"column":20},"action":"remove","lines":["o"]},{"start":{"row":227,"column":18},"end":{"row":227,"column":19},"action":"remove","lines":["e"]},{"start":{"row":227,"column":17},"end":{"row":227,"column":18},"action":"remove","lines":["s"]}],[{"start":{"row":227,"column":17},"end":{"row":227,"column":18},"action":"insert","lines":["m"],"id":2766},{"start":{"row":227,"column":18},"end":{"row":227,"column":19},"action":"insert","lines":["o"]},{"start":{"row":227,"column":19},"end":{"row":227,"column":20},"action":"insert","lines":["u"]}],[{"start":{"row":227,"column":17},"end":{"row":227,"column":20},"action":"remove","lines":["mou"],"id":2767},{"start":{"row":227,"column":17},"end":{"row":227,"column":26},"action":"insert","lines":["mouseover"]}],[{"start":{"row":314,"column":24},"end":{"row":314,"column":25},"action":"remove","lines":["0"],"id":2768},{"start":{"row":314,"column":23},"end":{"row":314,"column":24},"action":"remove","lines":["6"]}],[{"start":{"row":314,"column":23},"end":{"row":314,"column":24},"action":"insert","lines":["4"],"id":2769},{"start":{"row":314,"column":24},"end":{"row":314,"column":25},"action":"insert","lines":["5"]}],[{"start":{"row":227,"column":12},"end":{"row":227,"column":15},"action":"insert","lines":["// "],"id":2770},{"start":{"row":228,"column":12},"end":{"row":228,"column":15},"action":"insert","lines":["// "]}],[{"start":{"row":314,"column":24},"end":{"row":314,"column":25},"action":"remove","lines":["5"],"id":2771},{"start":{"row":314,"column":23},"end":{"row":314,"column":24},"action":"remove","lines":["4"]}],[{"start":{"row":314,"column":23},"end":{"row":314,"column":24},"action":"insert","lines":["2"],"id":2772},{"start":{"row":314,"column":24},"end":{"row":314,"column":25},"action":"insert","lines":["5"]}]]},"ace":{"folds":[],"scrolltop":1560.5,"scrollleft":0,"selection":{"start":{"row":110,"column":13},"end":{"row":110,"column":13},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":81,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1637709479176,"hash":"fe5f2d828627ac7128e7f349005488a07541bec0"}