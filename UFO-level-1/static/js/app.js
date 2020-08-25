// get data from data.js
var tableData = data;

// select filter button and form
var button = d3.select("#filter-btn");
var form = d3.select("#form");

// Create event handlers 
button.on("click",runEnter);
form.on("submit",runEnter);

// YOUR CODE HERE!
function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // get filter date
    var inputData = d3.select("#datetime").property("value");
    // apply filter
    var filterData = tableData.filter(data => data.datetime === inputData);
    // display number of sightings
    var searchLen=d3.select(".search-result");
    if (filterData.length>0) {
        searchLen.html(`<h3>${filterData.length} results found</h3>`);
    }
    else {
        searchLen.html("<h3>No results found.</h3><p>Select a date between 1/1/2010 and 1/13/2010</p>");
    }
    // clear table rows
    d3.select("tbody").html("");
    // add sightings to table
    filterData.forEach((sighting) => {
        var row=d3.select("tbody").append("tr");
        Object.entries(sighting).forEach(([key,value]) => {
            value=value.toString().replace(/\&#44/g,",");
            value=value.toString().replace(/\&#39/g,"'");
            value=value.toString().replace(/\&#33/g,"!");
            if (key==="country"||key==="state") {
                value=value.toUpperCase();
            }
            row.append("td").text(value);
        });
    });
};

