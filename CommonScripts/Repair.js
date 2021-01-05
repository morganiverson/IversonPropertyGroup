//REPAIR OBJECT
function Repair(key, repair, cost){
    this.key = key;
    this.repair = repair;
    this.cost = cost;
}
//SCRIPT OBJECT
function Script(URL, onload){
    this.URL = URL;
    this.onload = onload;
}


function showToolTip(e, tipID, show) {
    var tooltip = document.getElementById(tipID);

    if(show){
        var left = e.clientX + "px";
        var scrollY = window.scrollY;
        var top = (e.clientY + scrollY) + "px";
        tooltip.style.left = left;
        tooltip.style.top = top;

        tooltip.style.visibility = "visible";

        if (onMobile()){
            setTimeout(function () {tooltip.style.visibility = "hidden";}, 3000);
        }

    }
    else {
        tooltip.style.visibility = "hidden";
    }
}
//TELL IF WEBPAGE IS IPEN IN MOBILE DEVICE
function onMobile(){
    return screen.width <= 480;
}