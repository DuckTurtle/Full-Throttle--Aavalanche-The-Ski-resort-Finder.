
function myFunction() {
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
                var a = document.getElementsByTagName("a").i.value
                console.log(a)
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
    parkdiv.attr({id: data.data[i].parkCode});
    pageAnchor.append(parkdiv);
    parkdiv.addClass("");

    var coolIcon = $("<img>");
    coolIcon.attr("src",  data.data[i].images[0].url);
    parkdiv.append(coolIcon);
    coolIcon.addClass("");

    var parkName = $("<h2>");
    parkName.addClass("text-center text-3xl mb-24 p-2 bg-green-400");
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