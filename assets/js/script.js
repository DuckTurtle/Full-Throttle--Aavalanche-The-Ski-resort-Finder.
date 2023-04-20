
/*function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if(!event.target.matches('.dropbtn')) {
        var dropwdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropwdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

var apiKey = "W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";

//state data
var states = document.getElementsByTagName("option");
var searchInputVal = document.querySelector
var formatinput

for (var i = 0; i < states.length ; i++) {
    states[i].addEventListener("click", 
        function (event) {
            var e = document.getElementByValue("format-input");
            console.log(e)
            event.preventDefault();
        }, 
        false);
        }
    */
var cMBnt = document.querySelector('#clickMeBnt');
var state = "";
var runs = 0;
//gets the the current state selected by user 
function getState(event){
    event.preventDefault();
    if( runs >= 1){
        clearOldStuff();
        }
        //pulls state from dropdown box.
     state = document.querySelector("#format-input").value;
    setParkBubbles(state);
    runs++;
}
// grabs a list of parks within the set state
var pageAnchor = $("#results")
async function getParks(){
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
// creates the blocks that contain the loaded list of parks.
async function setParkBubbles(){
    var data = await getParks(state);
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("AHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
        return;
    }
     for(i=0; i<data.data.length; i++){
    var parkdiv = $("<button>");
    parkdiv.attr({id: data.data[i].parkCode});
    parkdiv.attr("value", i );
    pageAnchor.append(parkdiv);
    parkdiv.addClass("parkBlock");

    var coolIcon = $("<img>");
    coolIcon.attr("src",  data.data[i].images[0].url);
    parkdiv.append(coolIcon);
    coolIcon.addClass("parkBlockimg");

    var parkName = $("<h2>");
    parkName.addClass("text-center text-2xl p-2");
    parkName.text(data.data[i].fullName);
    parkdiv.append(parkName);
    
 //adds event listoner for each park block, upon clicking sends you to next page.
    parkdiv.on("click", function (event) {
        event.preventDefault();

        var parkCode = $(this).attr("id")
        console.log(parkCode)
        var queryString = './resortpage.html?q=' + parkCode;
        location.assign(queryString);
      });

    // Add mouseover event listener to display additional information
    parkdiv.on("mouseover", function () {
        var parkInfo = $("<div>");
        parkInfo.addClass("parkBlock-info");
        console.log($(this).attr("value"))
        parkInfo.text("This park is located in " + data.data[$(this).attr("value")].addresses[0].city + "! Click me to show more info!");
      
  
        // Append the information box to the parent element
        $(this).append(parkInfo);
      });
  
      // Add mouseout event listener to remove the information box
      parkdiv.on("mouseout", function () {
        $(this).find(".parkBlock-info").remove();
      });
    }
     
};
//clears the last search results.
function clearOldStuff(){
    var curentday = document.getElementById("results");
    console.log(curentday);
    while (curentday.firstChild) {
        curentday.removeChild(curentday.firstChild);
      }
};
//grabs parks when the button is clicked
cMBnt.addEventListener("click",getState)