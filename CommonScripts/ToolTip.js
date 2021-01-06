function tooltipEvents(buttonID, tooltipID, functionCaseShow, functionCaseHide, functionClick){
    var button = document.getElementById(buttonID);
//    console.log(button);

    if(!onMobile()){
        button.onmouseover = function(e) {
            if(functionCaseShow.call()){
                showToolTip(e, tooltipID, true);
            }
        }
        button.onmouseout = function(e) {
            if(functionCaseShow.call()){
                showToolTip(e, tooltipID, false);
            }
        }
    }
    button.onclick = function(e) {
//        console.log("click");
        if(functionCaseHide){
            functionClick.call();
        }
        else {
            showToolTip(e, tooltipID, true);
        }
    }
}

function showToolTip(e, tipID, show) {
    var tooltip = document.getElementById(tipID);
//console.log("show");
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
function addTooltipStyles(){
    var sheet = document.createElement("link");
    sheet.rel = "stylesheet";
    sheet.type = "text/css";
    sheet.href = "../CommonScripts/Tooltip.css";
    document.getElementsByTagName("head")[0].appendChild(sheet);
}

//TELL IF WEBPAGE IS IPEN IN MOBILE DEVICE
function onMobile(){
    return screen.width <= 480;
}