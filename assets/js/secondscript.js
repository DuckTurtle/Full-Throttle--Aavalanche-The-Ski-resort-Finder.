var apiKey = "W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";
var curentPark = $("#itemStorgeBlock");
//var city = document.querySelector('#cityTypeBox').value;
//var date = dayjs().format("MM/DD/YYYY");
var runs = 0;    
var parkCode = "apco";
var city = setCity();

async function setCity(){
    var data = await getParkInfo(parkCode);
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("Car Crash");
        return;
    }
    var currentCity = data.data[0].addresses[0].city
    var ccity = currentCity;
    return ccity;

};
async function getCity(){
    var forcastAPI = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=" + apiKey;
    let dataResults = fetch(forcastAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
async function getParkInfo (){
    var forcastAPI = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=" + apiKey;
    let dataResults = fetch(forcastAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
async function setParkInfo(){
    var data = await getParkInfo(parkCode);
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("Please input a City");
        return;
    }
    var parkName = $("<h2>");
    parkName.text(data.data[0].fullName);
    curentPark.append(parkName);
    var parkcost = $("<p>");
    parkcost.text(data.data[0].entranceFees[0].description);
    curentPark.append(parkcost);
    var parkCall = $("<p>");
    parkCall.text(data.data[0].contacts.phoneNumbers[0].phoneNumber);
    curentPark.append(parkCall);
    var parklocation = $("<p>");
    parklocation.text(data.data[0].directionsInfo);
    curentPark.append(parklocation);
    var parkWebsite = $("<p>");
    parkWebsite.text(data.data[0].directionsUrl);
    curentPark.append(parkWebsite);
    var parkHours = $("<p>");
    parkHours.text(data.data[0].operatingHours[0].description);
    curentPark.append(parkHours);

}
//calls the weather api with given city.
async function getWeather (){
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    let dataResults = fetch(weatherAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
//calls the forcast and waits to pass it on till the api responds.
async function getOtherDayWeather (){
    var forcastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
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
// sets text values for forcast blocks. does same stuff as the one above but for the forcast
async function otherDayForcast(){
    var data = await getOtherDayWeather(city);
    console.log(data);
    if (!data){
        console.error("Please input a City");
        return;
    }
    var forcatDayAnchor = $("#5dayforcast");
    for(i=4; i<40; i+=8){
    var blockbox = $("<div>");
    blockbox.addClass("weatherBlock");
    forcatDayAnchor.append(blockbox)

    var daytext = $("<h4>");
    daytext.addClass("");
    var dateCovert = dayjs(data.list[i].dt_txt).format("MM/DD/YYYY")
    daytext.text(data.city.name + " (" + dateCovert + ") ");
    blockbox.append(daytext);

    var coolIcon = $("<img>");
    coolIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");
    blockbox.append(coolIcon);

    var tempa = $("<p>");
    tempa.addClass("");
    tempa.text("Temp: " + data.list[i].main.temp + "°F");
    blockbox.append(tempa);

    var windy = $("<p>");
    windy.addClass("");
    windy.text("Wind: " + data.list[i].wind.speed + " MPH");
    blockbox.append(windy);

    var water = $("<p>");
    water.addClass("");
    water.text("Humidity: " + data.list[i].main.humidity + "%");
    blockbox.append(water);
    }
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
getParkInfo();
setParkInfo();