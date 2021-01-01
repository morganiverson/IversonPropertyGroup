window.onload = function() {
    interiorSpecs();

}

function interiorSpecs(){
    var allIntSpec = document.getElementById("all-int-spec-box");
    allIntSpec.onchange = function() {
        if (allIntSpec.checked) {    
            var areaBoxes = document.getElementsByClassName("interior-area");
            console.log(areaBoxes);

            for(var i = 0; i < areaBoxes.length; i++) {
                if(areaBoxes[i].type == "checkbox") areaBoxes[i].checked = true;
                else areaBoxes[i].value = 1;
                
                var specBox = document.getElementById(areaToSpec(areaBoxes[i].in));
                if(specBox != null) specBox.checked = true;
            }
        }
    
    else {
        var areaBoxes = document.getElementsByClassName("interior-area");

        areaBoxes.forEach(function(item, index) {
            if(item.type == "checkbox") item.checked = false;
            else item.value = 0;

            var specBox = document.getElementById(areaToSpec(item.in));
            if(specBox != null) specBox.checked = false;
        });
    }
    }
}


}

function areaBoxEvents(){
    var areaBoxes = document.getElementsByClassName("interior-area");

    areaBoxes.forEach(function(item, index) {
        item.onchange = function() {
            var specRow = document.getElementById(areaToSpecRow(item.id));

            if(item.type == "checkbox") {

                if(item.checked) {
                    specRow.style.display = "none";
                }
                else {
                    specRow.style.display = "inline";
                }
            }
            else {
                if(item.value > 1) specRow.style.display = "inline";
                else specRow.style.display = "none";              
            }
        }

    });
}
function specToArea(specID){
    return specID.substring(0, specID.indexOf("-")) + "-box";
}

function areaToSpec(areaID) {
    return areaID.substring(0, areaID.indexOf("-")) + "spec-box";
}

function areaToSpecRow(areaID) {
    return areaID.substring(0, areaID.indexOf("-")) + "spec-row";

}