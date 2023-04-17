// js file

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
var city = document.querySelector('#cityTypeBox').value;
var date = dayjs().format("MM/DD/YYYY");
var parkCode = "apco";
var date = dayjs().format("MM/DD/YYYY");
// var parkCode = getParkCode();
var city = setCity();



