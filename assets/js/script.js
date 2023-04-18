//key
var apiKey = "W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";

//state data
var states = document.getElementsByTagName("option");
for (var i = 0; i < states.length ; i++) {
    states[i].addEventListener("click", 
        function (event) {
            console.log([i].value)
            chosenstatecode+='[i]'
            event.preventDefault();
        }, 
        false);
        }
// pass park code  though location
var pageAnchor = $("#results")
async function getParks(){
    var state = "wi";
    var parkAPI = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";
    let dataResults = fetch(parkAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
async function setParkBubbles(){
    var data = await getParks();
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("AHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
        return;
    }
     for(i=0; i<data.data.length; i++){
    var parkdiv = $("<button>");
    parkdiv.attr({id: data.data[i].parkCode});
    pageAnchor.append(parkdiv);
    parkdiv.addClass("");

    var coolIcon = $("<img>");
    coolIcon.attr("src",  data.data[i].images[0].url);
    parkdiv.append(coolIcon);
    coolIcon.addClass("");

    var parkName = $("<h2>");
    parkName.addClass("text-center text-3xl mt-24 ml-8 p-2");
    parkName.text(data.data[i].fullName);
    parkdiv.append(parkName);

    parkdiv.on("click", function (event) {
        event.preventDefault();

        var parkCode = "'" + data.data[i].parkCode + "'";

        var queryString = './resortpage.html?q=' + parkCode;
        location.assign(queryString);
      });


    }
     
};
setParkBubbles();

var apiKey = "W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";

var states = document.getElementsByTagName("a");

for (var i = 0; i < states.length ; i++) {
    states[i].addEventListener("click", 
        function (event) {
            event.preventDefault();
            if (confirm('Are you sure?')) {
                window.location = this.href;
                console.log()
            }
        }, 
        false);
        }
    

// pass park code  though location
var pageAnchor = $("#results")
async function getParks(){
    var state = "wi";
    var parkAPI = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";
    let dataResults = fetch(parkAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
async function setParkBubbles(){
    var data = await getParks();
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("AHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
        return;
    }
     for(i=0; i<data.data.length; i++){
    var parkdiv = $("<button>");
    parkdiv.addID(data.data[i].parkCode);
    pageAnchor.append(parkdiv);
    parkdiv.addClass("");

    var coolIcon = $("<img>");
    coolIcon.attr("src",  data.data[i].images[0].url);
    parkdiv.append(coolIcon);
    parkcost.addClass("");

    
    // Creates popup box
    parkdiv.on("mouseover", function (event) {
        var popup = $("<div>");
        popup.addClass("popup");
        popup.text(data.data[i].exceptionhours);
  
        // Positions popup box
        var parkdivPos = parkdiv.offset();
        popup.css({
          top: parkdivPos.top + parkdiv.outerHeight() + 10,
          left: parkdivPos.left,
        });
  
        // Displays the popup on page
        $("body").append(popup);
      });
  
      parkdiv.on("mouseout", function (event) {
        // Remove the popup when the mouse leaves the parkdiv element
        $(".popup").remove();
      });


    var parkName = $("<h2>");
    parkName.addClass("text-center text-3xl mt-24 ml-8 p-2");
    parkName.text(data.data[i].fullName);
    parkdiv.append(parkName);

    saveBnt.on("click", function (event) {
        event.preventDefault();

        var parkCode = "'" + data.data[i].parkCode + "'";

        var queryString = './resortpage.html?q=' + parkCode;
        location.assign(queryString);
      });


    }
     
};
setParkBubbles();