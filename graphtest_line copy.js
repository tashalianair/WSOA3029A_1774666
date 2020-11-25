
var data1 = [
    {region: "Americas", key: "USA", value: 12780938},
    {region: "Asia", key: "India", value: 9181163},
    {region: "Americas", key: "Brazil", value: 6088004},
    {region: "Europe", key: "France", value: 2144660},
    {region: "Europe", key: "Russia", value: 2138828},
    {region: "Europe", key: "Spain", value: 1606905},
    {region: "Europe", key: "UK", value: 1527495},
    {region: "Europe", key: "Italy", value: 1431795},
    {region: "Americas", key: "Argentina", value: 1374631},
    {region: "Americas", key: "Colimbia", value: 1254979},
    {region: "Americas", key: "Mexico", value: 1049358},
    {region: "Americas", key: "Peru", value: 950557},
    {region: "Europe", key: "Germany", value: 950392},
    {region: "Europe", key: "Poland", value: 909066},
    {region: "Asia", key: "Iran", value: 880542},
    {region: "Africa", key: "South Africa", value: 769759},
    {region: "Europe", key: "Ukraine", value: 647976},
    {region: "Europe", key: "Belgium", value: 559902},
    {region: "Americas", key: "Chile", value: 542080},
    {region: "Asia", key: "Iraq", value: 539749},
    {region: "Asia", key: "Indonesia", value: 506302},
    {region: "Europe", key: "Czechia", value: 496638},
    {region: "Europe", key: "Netherlands", value: 493744},
    {region: "Asia", key: "Turkey", value: 453535},
    {region: "Asia", key: "Bangladesh", value: 451990},
];

var width = 460
    height = 460

var svg = d3.select("#circle_chart")
    .append("svg")
        .attr("width", width)
        .attr("height", height)

    data = data.filter(function(d){ return d.value>100000})

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
            .html('<u>' + d.key + '</u>' + "<br" + d.value + "cases")
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
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

           var simulation = d3.forceSimulation()
           .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
           .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
           .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping
     

        simulation
        .nodes(data)
        .on("tick", function(d){
          node
              .attr("cx", function(d){ return d.x; })
              .attr("cy", function(d){ return d.y; })
        });
  
    // What happens when a circle is dragged?
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
    
