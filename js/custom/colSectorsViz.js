
/**
 * @param _data -- the data array
 * @constructor
 */
ColSectorsViz = function(_data,_crimekey){
    this.data = _data;
    // defines constants
    this.padding= {top: 15, right: 5, bottom: 15, left: 45};
    this.width = $("#yearsectors").width();
    this.height = 0.55*this.width;
    this.initVis(_crimekey);
}


/**
 * Method that sets up the SVG and the variables
 */
ColSectorsViz.prototype.initVis = function(_crimekey){
  var that = this; // read about the this

  // constructs SVG layout
  this.svg = d3.select("#yearsectors").append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g");

    this.wrangleData(_crimekey);
    // call the update method
    this.updateViz(_crimekey);
}

/**
 * Method to wrangle the data. In this case it takes an options object
 * @param _filterFunction - a function that filters data or "null" if none
 */
ColSectorsViz.prototype.wrangleData= function(_crimekey){

  //get aggregated data
  var dataPrepare = new DataPrepare(this.data, "year", "sectorCd");

  //make a data object used for the multi-series scatterplot
  var firstKeyArray=[];
  for (var y=0; y<aggregatedData.length;y++){

    for (var s=0; s<aggregatedData[y].values.length;s++){
      firstKeyArray.push({
        "aggKey2": aggregatedData[y].values[s].key,
        "key":aggregatedData[y].values[s].values[_crimekey]*100,    
      });
    }          
  }
     
    this.ySecCrime ={};
      for (i=0;i<aggregatedData.length;i++){
         this.ySecCrime[aggregatedData[i].key]=firstKeyArray.slice(i*9,i*9+9);
      }
}

/**
 * Method to updata Viz. 
 */
ColSectorsViz.prototype.updateViz = function(){

// a data series
var dataSeries = d3.values(this.ySecCrime);

//scales
var x =d3.scale.ordinal()
    .domain([0,1,2,3,4,5,6,7,8,9,10])
    .rangePoints([this.padding.left, this.width-this.padding.left-this.padding.right]);

var yMax= d3.max( dataSeries, function(d) { 
      var innermax= d3.max(d, function(v) { 
          return v.key; });  
        return innermax;          
      } );

var y = d3.scale.linear()
    .domain([0, yMax])
    .range([this.height-this.padding.top-this.padding.bottom, this.padding.bottom]);

//x and y axis
    this.xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    this.yAxis = d3.svg.axis()
      .scale(y)
      .ticks(5)
      .orient("left");
  
  var series = this.svg.selectAll( "g" )
    // convert the object to an array of d3 entries
    .data( d3.map(this.ySecCrime).entries())
    
    series.enter()    
    // create a container for each series
    .append("g")
    .attr( "class", function(d) { return "series-" + d.key } );
    
  var circle=series.selectAll( "circle" )
        // do a data join for each series' values
        .data( function(d) { return d.value } );

  circle.enter()
        .append("circle");
  circle.attr( "cx", function(d) { return x(d.aggKey2) } )
        .attr( "r", "6" )
        .attr( "cy", function(d) { return y(d.key)-5} );
  
  series.exit().remove(); 
  circle.exit().remove();  

    // Add axes visual elements
    this.svg
      .append("g")
      .attr("class", "x_axis")
      .attr("transform", "translate(0," + (this.height - this.padding.bottom-this.padding.top) + ")") 
      .call(this.xAxis);

    this.svg
      .append("g")
      .attr("class", "y_axis")
      .attr("transform", "translate("+this.padding.left+",0)")  
      .call(this.yAxis);
    series.exit().remove();
    circle.exit().remove();
  }


/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 */
ColSectorsViz.prototype.onCrimeChange= function (_crimekey){
    this.wrangleData(_crimekey);
    this.updateViz(_crimekey);

}

ColSectorsViz.prototype.onYearChange= function (_slideryear){
  console.log(".series-" + _slideryear);
$(".series-" + _slideryear).css({"background-color":"blue"});
//$(".series-" + _slideryear).classed('clicked', true);
}
 
