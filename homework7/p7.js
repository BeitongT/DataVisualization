function p7() {
	// uniform width and height
	var svgWidth = innerWidth/4;
	var svgHeight = innerHeight/4;
	var size = 25;
	var row = 5;
	var col = 5;
	var factor = Math.sqrt(100/size) * 0.01;

//force parts
	var nodes = d3.range(size).map(function(i) {
	  return {
	  	cx: svgWidth / 6 * ((i % 5) + 1),
	  	cy: svgHeight / 6 * (Math.floor(i / 5) % 5 + 1),
	    r: Math.min(svgWidth / 12 ,svgHeight / 12)
	  };
	});

	console.log(nodes);




//create svg
	var svg = d3.select("#misalignment")
			 .append("svg")
		     .attr("class","svg7")
		     .attr("width",svgWidth)
		     .attr("height",svgHeight);
		     // .append('g').attr("class","view6").attr('transform', 'translate(' + innerWidth/4 / 2 + ',' + innerHeight/4 / 2 + ')')

	var text = d3.select("#misalignment")
    			 .append("p")
    			 .append("center")
    			 .append("text")
    			 .text("misalignment")
    			 .style("font-size",innerWidth/4/15 + "px");
//create rect
	var rect = svg.append("g")
				     .selectAll("rect")
				     .data(nodes)
				     .enter()
				     .append("rect")
				     .attr("class","p7rect")
				     .attr("x",d => d.cx - d.r)
				     .attr("y",d => d.cy - d.r)
				     .attr("width",d => d.r*1.6)
				     .attr("height",d => d.r / 3)
				     .style("fill","black")


	var seed = Math.floor( Math.random()*size);
	var thisrect = rect.filter(function(d,i){return i === seed});
	thisrect.attr("y", d =>  d.cy - d.r - d.r * 0.3);



    window.addEventListener("resize", myFunction);



function myFunction() {



	text.style("font-size",innerWidth/4/15 + "px");

	svgWidth = innerWidth/4;
	svgHeight = innerHeight/4;

	d3.select(".svg7").attr("width",svgWidth)
				  	  .attr("height",svgHeight);

	// d3.select(".view7").attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')');
	nodes = null;
	nodes = d3.range(size).map(function(i) {
	  return {
	  	cx: svgWidth / 6 * ((i % 5) + 1),
	  	cy: svgHeight / 6 * (Math.floor(i / 5) % 5 + 1),
	    r: Math.min(svgWidth / 12 ,svgHeight / 12)
	  };
	});
	console.log(nodes);

	d3.selectAll(".p7rect").remove();
	rect = svg.append("g")
				     .selectAll("rect")
				     .data(nodes)
				     .enter()
				     .append("rect")
				     .attr("class","p7rect")
				     .attr("x",d => d.cx - d.r)
				     .attr("y",d => d.cy - d.r)
				     .attr("width",d => d.r*1.6)
				     .attr("height",d => d.r / 3)
				     .style("fill","black");

	seed = Math.floor( Math.random()*size);
	thisrect = rect.filter(function(d,i){return i === seed});
	thisrect.attr("y", d =>  d.cy - d.r - d.r * 0.3);

}
}

p7();

