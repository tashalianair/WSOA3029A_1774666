var width = 750
    height = 750
    margin = 50

//radius of pieplot
var radius = Math.min(width, height) / 2 - margin


//append svg to my_piechart 
 var svg = d3.select("#my_piechart")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "white")
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
//data_set
var deaths = {easterncape: 4325, freestate: 1794, gauteng: 4960, kwazulunatal: 3309, limpopo: 487, mpumalanaga: 614, northwest: 541, northerncape: 301, westerncape: 4514}
var recoveries = {easterncape: 	101438, freestate: 49225, gauteng: 227469, kwazulunatal: 116571, limpopo: 17496, mpumalanaga: 29937, northwest: 32861, northerncape: 19275, westerncape: 113512}

//colour scale
var color = d3.scaleOrdinal()
    .domain(["easterncape", "freestate", "gauteng", "kwazulunatal", "limpopo", "mpumalanaga", "northwest", "northerncape", "westerncape"])
    .range(["#000839", "#6a2c70", "#b83b5e", "f08a5d", "#ffa41b", "#fbd46d", "#ffdf00", "#00a8cc", "#005082"]);

//fucntion to creat/update plot
function update(data) {
    var pie = d3.pie()
        .value(function(d) {return d.value; })
        .sort(function(a, b) {console.log(a) ; return d3.ascending(a.value, b.value);})
    var data_ready = pie(d3.entries(data))

    //map to data
    var u = svg.selectAll("path")
        .data(data_ready)
//build pie chart
    u 
        .enter()
        .append('path')
        .merge(u)
        .transition()
        .duration(1000)
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', function(d){return(color(d.data.value)) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)

        //remove group not present anymore 
        u  
            .exit()
            .remove()
}



//initialise plot with first dataset
update(deaths)

