function p4() {
	// uniform width and height
	var svgWidth = innerWidth/4;
	var svgHeight = innerHeight/4;
	var size = 25;
	var factor = Math.sqrt(100/size) * 0.01;


//force parts
	var nodes = d3.range(size).map(function(i) {
	  return {
	  	cx: Math.floor( Math.random() * svgWidth),
	  	cy: Math.floor( Math.random() * svgHeight),
	    r: (svgWidth + svgHeight) * factor
	  };
	});

	console.log(nodes);

	//initialize the collide
	var forceCollide = d3.forceCollide()
	    .radius(function(d,i) { 
	       return d.r * (1.3 + Math.random()) ; 
	    })
	    .iterations(5);

	// force parameters
	  var stren = 0.04;
	  var forceX = d3.forceX().strength(stren * svgHeight / svgWidth);
	  var forceY = d3.forceY().strength(stren * svgWidth / svgHeight);

	//initiallize the force simulation
	  var force = d3.forceSimulation()
	    .velocityDecay(0.07)
	    .nodes(nodes)
	    .force("collide", forceCollide)
	    .force("x", forceX)
	    .force("y", forceY)
	    .on("tick", tick);



//create svg
	var svg = d3.select("#sharpness")
			 .append("svg")
		     .attr("class","svg4")
		     .attr("width",svgWidth)
		     .attr("height",svgHeight)
		     .append('g').attr("class","view4").attr('transform', 'translate(' + innerWidth/4 / 2 + ',' + innerHeight/4 / 2 + ')')

   var text = d3.select("#sharpness")
    			 .append("p")
    			 .append("center")
    			 .append("text")
    			 .text("sharpness")
    			 .style("font-size",innerWidth/4/15 + "px");

//create filter
	var filter = svg.append("defs")
	  				.append("filter")
	    			.attr("id", "blur")
	  				.append("feGaussianBlur")
	    			.attr("stdDeviation", (svgWidth + svgHeight) * 0.0025);



//create circle
	var circle = svg.append("g")
				     .selectAll("circle")
				     .data(nodes)
				     .enter()
				     .append("circle")
				     .attr("cx",d => d.cx)
				     .attr("cy",d => d.cy)
				     .attr("r",d => d.r)
				     .style("fill","gold")
				     .attr("filter", "url(#blur)");

	var seed = Math.floor( Math.random()*size);

	circle.filter(function(d,i){return i === seed})
				     .attr("filter", function(d){d.stdDeviation = 0;});




//tick function
	function tick() {
      circle
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
  }

      window.addEventListener("resize", myFunction4);

// resize function
	function myFunction4() {

	text.style("font-size",innerWidth/4/15 + "px");


	svgWidth = innerWidth/4;
	svgHeight = innerHeight/4;
		// console.log(4);
		// console.log(svgWidth);
	seed = Math.floor( Math.random()*size);

	filter.stdDeviation = (svgWidth + svgHeight) * 0.0025;
	circle.attr("filter", "url(#blur)");

	circle.filter(function(d,i){return i === seed})
				     .attr("filter", function(d){d.stdDeviation = 0;});


	// circle.filter(function(d,i){return i === seed})
	// 	  .attr("filter", function(d){d.stdDeviation = 0;});





	d3.select(".svg4").attr("width",svgWidth)
				  	  .attr("height",svgHeight);

	d3.select(".view4").attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')');

	nodes.forEach(function(d,i){
	  	d.cx = Math.floor( Math.random() * svgWidth);
	  	d.cy =  Math.floor( Math.random() * svgHeight);
	    d.r = (svgWidth + svgHeight) * factor;
	});

	forceX = d3.forceX().strength(stren * svgHeight / svgWidth);
	forceY = d3.forceY().strength(stren * svgWidth / svgHeight);

	// console.log(nodes)
	force.nodes(nodes)
	force.force("x", forceX)
	force.force("y", forceY)
	force.alpha(0.3).restart();
	}
}

p4();
