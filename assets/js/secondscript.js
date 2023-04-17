var apiKey = "W1L4ukvhh9ASpC8FYICufwmnwxcv6i16sNbSq9ZY";
var apiKey = "5282121f1a385049aa27e309e97fc347";
var curentPark = $("#itemStorgeBlock");
var titleEL = document.getElementById("parkTitle");
//var city = document.querySelector('#cityTypeBox').value;
//var date = dayjs().format("MM/DD/YYYY");
var runs = 0;    
var parkCode = "apco";
var date = dayjs().format("MM/DD/YYYY");
// var parkCode = getParkCode();
var city = setCity();

init();

function getParkCode(){
    var codes =  document.location.search.split("=").pop();
    return codes;
}

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
    parkName.addClass("text-center text-3xl mt-24 ml-8 p-2");
    parkName.text(data.data[0].fullName);
    curentPark.append(parkName);

    var parkcost = $("<p>");
    parkcost.text(data.data[0].entranceFees[0].description);
    curentPark.append(parkcost);
    parkcost.addClass("");

    var parkCall = $("<p>");
    parkCall.text(data.data[0].contacts.phoneNumbers[0].phoneNumber);
    curentPark.append(parkCall);
    parkCall.addClass("");

    var parklocation = $("<p>");
    parklocation.text(data.data[0].directionsInfo);
    curentPark.append(parklocation);
    parklocation.addClass("");

    var parkWebsite = $("<p>");
    parkWebsite.text(data.data[0].directionsUrl);
    curentPark.append(parkWebsite);
    parkWebsite.addClass("");

    var parkHours = $("<p>");
    parkHours.text(data.data[0].operatingHours[0].description);
    curentPark.append(parkHours);
    parkHours.addClass("");

}
//calls the weather api with given city.
async function getWeather (){
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKeyW + "&units=imperial";
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
    var curentDayAnchor = $("#weatherDiv");
    var blockbox = $("<div>");
    blockbox.addClass("weatherBlock");
    curentDayAnchor.append(blockbox)

    var daytext = $("<h4>");
    daytext.addClass("");
    daytext.text(data.name + " (" + date + ") ");
    blockbox.append(daytext);
    // adds weather img
    var coolIcon = $("<img>");
    coolIcon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
    blockbox.append(coolIcon);
//  adds tempature element at text
    var tempa = $("<p>");
    tempa.addClass("");
    tempa.text("Temp: " + data.main.temp + "°F");
    blockbox.append(tempa);

};
// sets text values for forcast blocks. does same stuff as the one above but for the forcast
async function otherDayForcast(){
    var data = await getOtherDayWeather(city);
    console.log(data);
    if (!data){
        console.error("AHHHHH");
        return;
    }
    var forcatDayAnchor = $("#weatherDiv");
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
    }
};
function clearOldStuff(){
    var curentday = document.getElementById("itemStorgeBlock");
    console.log(curentday);
    while (curentday.firstChild) {
        curentday.removeChild(curentday.firstChild);
      }
};

function init(){
    city = document.querySelector('#cityTypeBox').value;
    if( runs >= 1){
    clearOldStuff();
    }
    setCurrentDay(city);
    otherDayForcast(city);
getParkInfo();
setParkInfo();
}