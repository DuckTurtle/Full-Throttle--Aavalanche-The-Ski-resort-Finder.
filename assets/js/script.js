
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
    */
var cMBnt = document.querySelector('#clickMeBnt');
var state = "";
var runs = 0;
function getState(event){
    event.preventDefault();
    if( runs >= 1){
        clearOldStuff();
        }
     state = document.querySelector("#format-input").value;
    setParkBubbles(state);
    runs++;
}
// pass park code  though location
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
function clearOldStuff(){
    var curentday = document.getElementById("results");
    console.log(curentday);
    while (curentday.firstChild) {
        curentday.removeChild(curentday.firstChild);
      }
};

cMBnt.addEventListener("click",getState)