let topDiv = document.getElementById("top-div");
let darkOff = document.getElementById("dark-off");

let isLight = true;

function mngMode(event) {


// Change background color to black if light mode, otherwise its white
if (isLight) document.body.style.backgroundColor ="black";
  else document.body.style.backgroundColor ="white"; 
//change text color to white if else black
if (isLight) document.body.style.color ="white" ;
  else document.body.style.color ="black" ;
// Change the text to dark mode on" if light mode else "dark mode off" 
if (isLight) darkOff.innerHTML = "<p>Dark mode off</p>";
  else darkOff.innerHTML = "<p>Dark mode off</p>";
  
//flip the is light switch
  isLight = !isLight;

}
