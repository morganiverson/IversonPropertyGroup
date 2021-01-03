var area_row_html = "<div class = 'area-row'> <span> [description-here]</span> <span> $[cost-here] </span></div>";


//var testArray = [new Repair ("fron", "Frontyard", 1000),
//                 new Repair ("back", "Backyard",5000),
//                 new Repair ("kitc", "Kitchen", 10000),
//                 new Repair ("kitc-paint", "Kitchen Paint", 500),
//                 new Repair ("kitc-floor", "Kitchen Flooring", 500),
//                 new Repair ("kitc-cab", "Kitchen Cabinets", 500),
//                 new Repair ("kitc-app", "Kitchen Appliances", 1000)];
//  

window.onmessage = function(e) {
//    var array = JSON.parse(sessionStorage.getItem("allAreaRepairs"));
    switch(e.data){
        case "load": fillTable(JSON.parse(sessionStorage.getItem("allAreaRepairs"))); break;
    }
}

function createRow(repairObject) {
    var rowString = area_row_html.replace("[description-here]", repairObject.repair);
    rowString = rowString.replace("[cost-here]", repairObject.cost);
    
    return rowString;
}

//ADD REPAIR ROW
function addRow(repairObject){
    var output_area = (repairObject.repair.toLowerCase().indexOf("yard") >= 0) ? output_area = document.getElementById("exterior-areas-here") : document.getElementById("interior-areas-here");
    
    var rowString = createRow(repairObject);
    output_area.innerHTML+=rowString;

}
//ADD ROWS TO TABLE
function fillTable(repairArray){
    for(var i = 0; i < repairArray.length; i++) {
//                console.log("fill");
        addRow(repairArray[i]);
    }
}

//CONTACT PARENT TO HIDE IFRAME
function hideVerification(){
    console.log(parent);
    parent.postMessage("hide");
}

function encodeURL(array) {
    return btoa(JSON.stringify(array));
}

//CREATE ENCODED CHECKLIST TO PASS TO CHECKLIST url
function generateChecklist(){
    var Repairs = JSON.parse(sessionStorage.getItem("allAreaRepairs"));
    console.log(Repairs);
    
    //ENCODE
    var encodedString = encodeURL(Repairs);
    console.log(encodedString);
    
    //ADD TO URL
    var checklistURL = "PropertyRepairEvaluation.html?DetailedEvaluation?" + encodedString;
    
    console.log(checklistURL);
    parent.window.location.href = checklistURL; 
    //GO TO LINK
}