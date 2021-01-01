window.onload = function() {
    interiorSpecs();
    areaBoxEvents();
    otherBoxEvent();
}

function interiorSpecs(){
    var allIntSpec = document.getElementById("all-int-spec-box");
    allIntSpec.onchange = function() {
        var areaBoxes = document.getElementsByClassName("interior-area");
        
        
        if (allIntSpec.checked) {    
            for(var i = 0; i < areaBoxes.length; i++) {
                //CHECK ALL BOXES IN CLASS interior-area
                if(areaBoxes[i].type == "checkbox") areaBoxes[i].checked = true;
                else areaBoxes[i].value = 1;

                //CHECK MATCHING SPC BOX 
                var specBox = document.getElementById(areaToSpec(areaBoxes[i].id));
                var specRow = document.getElementById(areaToSpecRow(areaBoxes[i].id));
                
                console.log(specBox);
                
                if(specBox != null && specRow != null) {
                    specBox.checked = true;
                    showRow(specRow);
                }
                
            }
        }
        //NOT CHECKED
        else {
            for(var i = 0; i < areaBoxes.length; i++) {
                //TURN OF INTERIOR AREA BOXES
                //                            if(areaBoxes[i].type == "checkbox") areaBoxes[i].checked = false;
                //                            else areaBoxes[i].value = 0;

                //TURN OFF SPECIFICS
                var specBox = document.getElementById(areaToSpec(areaBoxes[i].id));
                if(specBox != null) specBox.checked = false;
            }
        }
    }
}


function areaBoxEvents(){
    var areaBoxes = document.getElementsByClassName("interior-area");
//    console.log(areaBoxes);
    
    Array.prototype.forEach.call(areaBoxes, function(item, index) {
        item.onchange = function() {
            var specRow = document.getElementById(areaToSpecRow(item.id));
            if(item.type == "checkbox") {
                if(item.checked) {showRow(specRow);}
                else {hideRow(specRow);}
            }
            else {
                if(item.value > 0) {showRow(specRow);}
                else {hideRow(specRow);}             
            }
        }

    });
}

function otherBoxEvent() {
    var otherBox = document.getElementById("other-box");
    otherBox.onchange = function() {
        if(otherBox.checked) {
            var otherListRow = document.getElementById(areaToSpecRow(otherBox.id));
            showRow(otherListRow);
        }
        else {
            var otherListRow = document.getElementById(areaToSpecRow(otherBox.id));
            var otherListInput = document.getElementById("other-input");
            otherListInput.innerHTML = "";
            hideRow(otherListRow);
        }
        
    }
}

function showRow(specRow){
    specRow.setAttribute("class", "divTableRow-SHOW");
}
function hideRow(specRow) {
    specRow.setAttribute("class", "divTableRow-HIDE");
}

function specToArea(specID){
    return specID.substring(0, specID.indexOf("-")) + "-box";
}

function areaToSpec(areaID) {
    return areaID.substring(0, areaID.indexOf("-")) + "-spec-box";
}

function areaToSpecRow(areaID) {
    return areaID.substring(0, areaID.indexOf("-")) + "-spec-row";

}