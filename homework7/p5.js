function p5() {
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
	var svg = d3.select("#added_surround_color")
			 .append("svg")
		     .attr("class","svg5")
		     .attr("width",svgWidth)
		     .attr("height",svgHeight)
		     .append('g').attr("class","view5").attr('transform', 'translate(' + innerWidth/4 / 2 + ',' + innerHeight/4 / 2 + ')')

    var text = d3.select("#added_surround_color")
    			 .append("p")
    			 .append("center")
    			 .append("text")
    			 .text("added_surround_color")
    			 .style("font-size",innerWidth/4/15 + "px");
//create rect
	var rect = svg.append("g")
				     .selectAll("rect")
				     .data(nodes)
				     .enter()
				     .append("rect")
				     .attr("x",d => d.cx - 1.5 * d.r)
				     .attr("y",d => d.cy)
				     .attr("width",d => d.r + 1.5 * d.r)
				     .attr("height",d => d.r/2)
				     .style("fill","black")


	var seed = Math.floor( Math.random()*size);
	var thisrect = rect.filter(function(d,i){return i === seed});
	thisrect.attr("style","outline: "+ thisrect.attr("height") * 1.5 +"px solid gold");






//tick function
	function tick() {
     rect
     .attr("x",d => d.x - 1.5 * d.r)
     .attr("y",d => d.y)
     .attr("width",d => d.r + 1.5 * d.r)
     .attr("height",d => d.r/2);
  }



      window.addEventListener("resize", myFunction);



function myFunction() {
	seed = Math.floor( Math.random()*size);
	thisrect.attr("style","outline: none;");
	thisrect = rect.filter(function(d,i){return i === seed});
	thisrect.attr("style","outline: "+ thisrect.attr("height") * 1.5 +"px solid gold");

	// thiscircle.filter(function(d,i){return i === seed})
	// 	  .style("fill","black");

	text.style("font-size",innerWidth/4/15 + "px");

	svgWidth = innerWidth/4;
	svgHeight = innerHeight/4;

	d3.select(".svg5").attr("width",svgWidth)
				  	  .attr("height",svgHeight);

	d3.select(".view5").attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')');

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
p5();

