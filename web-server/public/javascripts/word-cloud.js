$( document ).ready(function() {
var fill = d3.scale.category20b();

var w = 750,
        h = 500;

var max,
        fontSize;

var layout = d3.layout.cloud()
        .timeInterval(Infinity)
        .size([w, h])
        .fontSize(function(d) {
            return fontSize(+d.value);
        })
        .text(function(d) {
            return d.key;
        })
        .on("end", draw);

var svg = d3.select("#chart").append("svg")
        .attr("width", w)
        .attr("height", h);

var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

update();

window.onresize = function(event) {
    update();
};

function draw(data, bounds) {
    var w = window.innerWidth,
        h = window.innerHeight;

    svg.attr("width", 750).attr("height", 500);


    scale = bounds ? Math.min(
            w / Math.abs(bounds[1].x - w / 2),
            w / Math.abs(bounds[0].x - w / 2),
            h / Math.abs(bounds[1].y - h / 2),
			h / Math.abs(bounds[0].y - h / 2)) / 2 : 1; 

    var text = vis.selectAll("text")
            .data(data, function(d) {
                return d.text.toLowerCase();
            });
    text.transition()
            .duration(1000)
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
                return d.size + "px";
            });
    text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .style("opacity", 1e-6)
            .transition()
            .duration(2000)
            .style("opacity", 1);
    text.style("font-family", function(d) {
        return d.font;
    })
            .style("fill", function(d) {
                return fill(d.text.toLowerCase());
            })
            .text(function(d) {
                return d.text;
            });		
	text.on("click", function(d) {
		//draw trend chart for brand
		barGraph( d.text)
		});
	
	var org_size = 10;	
	text.on("mouseover", function(d){
		org_size = d.size
		d3.select(this).style("font-size", d.size+15).transition();
		});
	text.on("mouseout", function(d) {
			d3.select(this).style("font-size", org_size).transition();
		});
		
    //vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
}

function update() {
    layout.font('impact').spiral('archimedean');
    fontSize = d3.scale['sqrt']().range([10, 100]);
    if (tags.length){
        fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
    }
    layout.stop().words(tags).start();
}

var opts = {
  lines: 17, // The number of lines to draw
  length: 2, // The length of each line
  width: 14, // The line thickness
  radius: 10, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#fff', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 38, // Afterglow percentage
  shadow: true, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};



function barGraph(brand){
	svg.remove("g");
	var target = document.getElementById('chart');
	var spinner = new Spinner(opts).spin(target);
	$('h1.page-header').html(brand + "'s opinion trend <small> by user sentiments<small>");
	$('.vizdesc').html("Brand-based average sentiments and polarity plotted based on per review year. This graph shows the brand review trend over the years. The overall  behavior of the graph can be attributed to brand's gaining/loosing traction as well as an increase in public's willingness to share opinions online.");
	    var options = {
	        chart: {
	            renderTo: 'chart',
	            type: 'spline',
				backgroundColor: "#222"
	        },
	        title: {
	            text: ''
	        },
	        yAxis: {
	            title: {
	                text: 'Avg Sentiment Score'
	            }
	        },
	        xAxis: {categories : [] },
	        series: [{}]
	    };
		var url = "http://52.24.34.160:8080/api/v1/getAverageYearlySentiment/" + brand;
	    $.getJSON(url, function(data) {
			var arr_data = [];
			var arr_date = [];
			data.forEach(function(d){
				arr_data.push(d.avg_sentiment);
				arr_date.push(d._id);
			});
	        options.series[0].data = arr_data;
			options.xAxis.categories = arr_date;
			options.series[0].name = brand
			spinner.stop();
	        var chart = new Highcharts.Chart(options);
	    });

	
}

});