var apiKey = "W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";
//var city = document.querySelector('#cityTypeBox').value;
//var date = dayjs().format("MM/DD/YYYY");
var runs = 0;    

async function getOtherDayWeather (){
    var forcastAPI = "https://developer.nps.gov/api/v1/parks?" + "&api_key=" + apiKey;
    let dataResults = fetch(forcastAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
//sets all the text content for curent day weather
 async function setCurrentDay(){
    var data = await getWeather(city);
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("Please input a City");
        return;
    }
    //creates element for location and date
    var curentDayAnchor = $("#currentDay");
    var daytext = $("<h3>");
    daytext.addClass("");
    daytext.text(data.name + " (" + date + ") ");
    curentDayAnchor.append(daytext);
    // adds weather img
    var coolIcon = $("<img>");
    coolIcon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
    curentDayAnchor.append(coolIcon);
//  adds tempature element at text
    var tempa = $("<p>");
    tempa.addClass("");
    tempa.text("Temp: " + data.main.temp + "°F");
    curentDayAnchor.append(tempa);
// above but for wind
    var windy = $("<p>");
    windy.addClass("");
    windy.text("Wind: " + data.wind.speed + " MPH");
    curentDayAnchor.append(windy);
// above also but for humidaty
    var water = $("<p>");
    water.addClass("");
    water.text("Humidity: " + data.main.humidity + "%");
    curentDayAnchor.append(water);

};
function clearOldStuff(){
    var curentday = document.getElementById("currentDay");
    console.log(curentday);
    while (curentday.firstChild) {
        curentday.removeChild(curentday.firstChild);
      }
    
    var c5day = document.getElementById("5dayforcast");
    while (c5day.firstChild) {
        c5day.removeChild(c5day.firstChild);
      }
};
getOtherDayWeather();