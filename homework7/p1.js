function p1() {
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
	       return d.r * (1 + Math.random()) ; 
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
	var svg = d3.select("#filled")
			 .append("svg")
		     .attr("class","svg")
		     .attr("width",svgWidth)
		     .attr("height",svgHeight)
		     .append('g').attr("class","view").attr('transform', 'translate(' + innerWidth/4 / 2 + ',' + innerHeight/4 / 2 + ')')

    var text = d3.select("#filled")
    			 .append("p")
    			 .append("center")
    			 .append("text")
    			 .text("filled")
    			 .style("font-size",innerWidth/4/15 + "px");
//create circle
	var circle = svg.append("g")
				     .selectAll("circle")
				     .data(nodes)
				     .enter()
				     .append("circle")
				     .attr("cx",d => d.cx)
				     .attr("cy",d => d.cy)
				     .attr("r",d => d.r)
				     .style("stroke","black")
				     .style("fill","none");

	var seed = Math.floor( Math.random()*size);
	var thiscircle = circle.filter(function(d,i){return i === seed});

	thiscircle.style("fill","black");




//tick function
	function tick() {
      circle
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
  }

// resize function

// 	var body = d3.select("body");
// 	console.log(body);
// d3.select("body").onresize = function() {myFunction};

      window.addEventListener("resize", myFunction);



function myFunction() {
	seed = Math.floor( Math.random()*size);
	circle.style("fill","none");
	thiscircle = circle.filter(function(d,i){return i === seed});
	thiscircle.style("fill","black");

	// thiscircle.filter(function(d,i){return i === seed})
	// 	  .style("fill","black");

	text.style("font-size",innerWidth/4/15 + "px");

	svgWidth = innerWidth/4;
	svgHeight = innerHeight/4;

	d3.select(".svg").attr("width",svgWidth)
				  	  .attr("height",svgHeight);

	d3.select(".view").attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')');

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
p1();

