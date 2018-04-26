function p9() {
	// uniform width and height
	var svgWidth = innerWidth;
	var svgHeight = innerHeight/2;
	var size = 150;
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
	var svg = d3.select("#p2")
			 .append("svg")
		     .attr("class","svgp2")
		     .attr("width",svgWidth)
		     .attr("height",svgHeight)
		     .append('g').attr("class","viewp2").attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')')

    var text = d3.select("#p2")
    			 .append("p")
    			 .append("center")
    			 .append("text")
    			 .text("sharpness & blink time = 14.76s")
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
				     .style("fill","#ff5e00")
				     .attr("filter", "url(#blur)");



		var seedSet = getSeed(15);
		var seedArray = seedSet.map(function(d){return +d;});
		var thiscircle_blink = circle.filter(function(d,i){
			if (seedArray.slice(0,5).indexOf(i) != -1) {
				return 1;
			}
			else return 0;
		});
		var thiscircle_sharpness = circle.filter(function(d,i){
			if (seedArray.slice(5,10).indexOf(i) != -1) {
				return 1;
			}
			else return 0;
		});
		var thiscircle_mix = circle.filter(function(d,i){
			if (seedArray.slice(10,15).indexOf(i) != -1) {
				return 1;
			}
			else return 0;
		});

		thiscircle_sharpness.attr("filter", function(d){d.stdDeviation = 0;});


		thiscircle_mix.attr("filter", function(d){d.stdDeviation = 0;});	d3.interval(changecolor,200);




//seed function
	function getSeed(number) {
		var set = d3.set();
		while (set.size() < number) {
			var seed = Math.floor( Math.random()*size);
			if (!set.has(seed)) {
				set.add(seed);
			}
		}
		return set.values();
	}

	function changecolor() {
		thiscircle_blink
		  .style("fill","#ff5e00")
		  .transition()
		  .duration(100)
		  .style("fill","#ff985c");

		 thiscircle_mix
		  .style("fill","#ff5e00")
		  .transition()
		  .duration(100)
		  .style("fill","#ff985c");
	}

	function apply() {

		 filter.stdDeviation = (svgWidth + svgHeight) * 0.0025;
		 circle.attr("filter", "url(#blur)");

		 seedSet = getSeed(15);
		 seedArray = seedSet.map(function(d){return +d;});
		 thiscircle_blink = circle.filter(function(d,i){
			if (seedArray.slice(0,5).indexOf(i) != -1) {
				return 1;
			}
			else return 0;
		});
		 thiscircle_sharpness = circle.filter(function(d,i){
			if (seedArray.slice(5,10).indexOf(i) != -1) {
				return 1;
			}
			else return 0;
		});
		 thiscircle_mix = circle.filter(function(d,i){
			if (seedArray.slice(10,15).indexOf(i) != -1) {
				return 1;
			}
			else return 0;
		});

		thiscircle_sharpness.attr("filter", function(d){d.stdDeviation = 0;});


		thiscircle_mix.attr("filter", function(d){d.stdDeviation = 0;});
	}




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
	apply();


	text.style("font-size",innerWidth/4/15 + "px");

	svgWidth = innerWidth;
	svgHeight = innerHeight/2;

	d3.select(".svgp2").attr("width",svgWidth)
				  	  .attr("height",svgHeight);

	d3.select(".viewp2").attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')');

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
p9();

