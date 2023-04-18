
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


// Anthony's code below

function showPopUp() {
  document.getElementById("popUp").style.visibility = "visible";
  document.getElementById("popUp").style.opacity = "1";
}

function hidePopUp() {
  document.getElementById("popUp").style.visibility = "hidden";
  document.getElementById("popUp").style.opacity = "0";
}