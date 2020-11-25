var width = 460
    height = 460

var svg = d3.select("#circle_chart")
    .append("svg")
        .attr("width", width)
        .attr("height", height)

d3.csv("D:\Documents\GitHub\WSOA3029A_1774666\spheredata.txt.csv", function(data) {

    data = data.filter(function(d){ return d.value>1000000})

    var color = d3.scaleOrdinal()
        .domain(["Asia", "Europe", "Africa", "Oceania", "Americas"])
        .range(d3.schemePastel2);

    var size = d3.scaleLinear()
        .domain([0, 1400000000])
        .range([7,55])

    var Tooltip = d3.select("#circle_chart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "yellow")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    var mouseover = function(d) {
        Tooltip
            .style("opacity", 1)
    }
    var mousemove = function(d) {
        Tooltip
            .html('<u>' + d.key + '</u>' + "<br>" + d.value + "cases")
            .style("left", (d3.mouse(this)[0]+20) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
        Tooltip
            .style("opacity", 0)
    }

    var node = svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("class", "node")
            .attr("r", function(d){ return size(d.value)})
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", function(d){ return color(d.region)})
            .style("fill-opacity", 0.8)
            .attr("stroke", "black")
            .style("stroke-width", 1)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

    var simulation = d3.forceSimulation()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2))
        .force("charge", d3.forceManyBody().strength(.1))
        .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1))

    simulation
        .nodes(data)
        .on("tick", function(d) {
            node
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
        });

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(.03).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
    }

})