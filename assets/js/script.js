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


var states = document.getElementsByTagName("a");

for (var i = 0; i < states.length ; i++) {
    states[i].addEventListener("click", 
        function (event) {
            event.preventDefault();
            if (confirm('Are you sure?')) {
                window.location = this.href;
            }
        }, 
        false);
        }
    


