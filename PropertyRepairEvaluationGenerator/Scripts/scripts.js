//*********************************************************GENERATOR SCRIPTS*******************************************************************************
var paintRoomRepair = new SpecificRepair("paint", "Paint", 1000);
var flooringRepair = new SpecificRepair("floor", "Flooring", 5000);
var verificationIframe = document.getElementsByTagName("iframe")[0];

//VERIFY SELECTED REPAIRS
function showVerificationPopup(){
    if(getRepairArray().length > 0) {
        sessionStorage.setItem("allAreaRepairs", JSON.stringify(getRepairArray())); //SEND ARRAY TO IFRAME
        console.log(sessionStorage);

        verificationIframe.contentWindow.postMessage("load"); //SEND MESSAGE TO IFRAME 

        verificationIframe.style.display = "block"; //SHOW IFRAME
        document.body.overflow = "hidden"; //LOCK SCROLLING

        document.getElementById("submit-but").disabled = true; //DISABLE BUTTONS
    }

}
function hideVerificationPopup(){
    
    sessionStorage.setItem("allAreaRepairs", "");
    console.log(sessionStorage);
    
    document.getElementsByTagName("iframe")[0].style.display = "none";
    document.getElementById("submit-but").disabled = false;
    document.body.overflow = "scroll";

}

//RETURN ARRAY OF ALL SELECTED REPAIRS
function getRepairArray() {
    var allAreaRepairs = [];
    //GET ALL CHECKBOXES FOR AREA
    var RepairAreas = document.getElementsByClassName("repair-area");
    Array.prototype.forEach.call(RepairAreas, function(item, index) {

        var itemKey = getKey(item.id);

        //GEYT CHECKS
        if(item.type == "checkbox" && item.id.indexOf("spec") < 0) {
            //            console.log(item.type);
            //            console.log(item.id);
            //ADD BASE REPAIR -- TURN ON IF CHECKED
            if(item.checked) {
                var repairObj;
                //ADD LATER 
                repairObj = getRepair(itemKey);
                allAreaRepairs.push(repairObj);

                //ADD SPECIFIC REPAIRS
                var spec = document.getElementById(areaToSpec(item.id));
                //                console.log(areaToSpec(item.id));

                if(spec != null || item.id.indexOf("kitch") >= 0) {
                    if(spec == null) {
                        spec = document.getElementById(item.id);
                    }
                    if(spec.checked) {
                        allAreaRepairs.push.apply(allAreaRepairs, getSpecificRepairs(repairObj.key, itemKey));
                    }

                }
            }
        }
        //GET ROOMS
        else if(item.type == "number" && item.id.indexOf("spec") < 0) {
            //            console.log(item.id);

            if (item.value > 0) { 
                //            var rooms = getMultipleRoomRepairs(itemKey, item.value, areaToSpec(item.id));
                var rooms = getMultipleRoomRepairs(itemKey, item.value, document.getElementById(areaToSpec(item.id)).checked);
                allAreaRepairs.push.apply(allAreaRepairs, rooms);
            }
        }

    });
    allAreaRepairs.push.apply(allAreaRepairs, getOtherAreas());

    return allAreaRepairs;
}
//GET ARRAY OF ENTRIES IN OTHER TEXT AREA
function getOtherAreas() {
    var otherRepairs= [];

    var otherBox = document.getElementById("other-box");
    var otherInput = document.getElementById("other-input");

    if(otherBox.checked && otherInput.value != ""){
        var otherAreas = otherInput.value.split("\n");

        //CREATE REPAIR FOR EACH LISTED AREA
        otherAreas.forEach(function(item, index){
            var itemList = item.split(",");

            //GET DECRIPTION AND COST FROM LIST
            var repairDesc = cap(itemList[0]);
            var repairKey = createKey(repairDesc);

            var repairCost = parseFloat(strip(itemList[1]));

            otherRepairs.push(new Repair(repairKey, repairDesc, repairCost));
        });
    }
    return otherRepairs;
}

//RETURN REPAIR OBJECT GIVEN KEY
function getRepair(key){
    var repairCost;
    var repair = cap(key);
//    console.log(repair);
    var repairKey = (key.length < 5) ? key : key.substring(0, 4);

    //set repair cost
    switch (key) {
        case "frontyard":
        case "backyard": repairCost = 5000; break;
        case "kitchen": repairCost = 11000; break;
        case "bathroom": repairCost = 4000; break;
        case "attic": repairCost = 3500; break;
        case "exteriorpaint": repairCost = 5000; break;
        default: repairCost = 6000;
    }

    return new Repair(repairKey, repair, repairCost);
}

//RETURN ARRAY OF SPECIFIC REPAIRS
function getSpecificRepairs(key, repair){
    var specificRepairList = [];

    var specifics;

    switch(key) {
        case "kitc": specifics = [new SpecificRepair("cab", "Cabinets", 5000), 
                                  new SpecificRepair("app", "Appliances", 2000), 
                                 paintRoomRepair, flooringRepair]; break;
        case "bath": specifics = [new Repair("fixt", "Fixtures", 2000),
                                  new Repair("floor", "Flooring (Tile)", 1000),
                                  paintRoomRepair]; break;
        case "atti": specifics = [new Repair("floor", "Flooring", 2500),
                                   paintRoomRepair]; break;
        default: specifics = [paintRoomRepair, flooringRepair];
    }

    specifics.forEach(function(item, index) {
        var repairKey = key + "-" + item.key;

        var repairDesc = cap(repair) + " " + item.repair;

        var repairCost = item.cost;

        var repairObject = new Repair(repairKey, repairDesc, repairCost);

        specificRepairList.push(repairObject);
    });

    return specificRepairList;
}

//RETURN ARRAY OF MULTIPLE ROOMS 
function getMultipleRoomRepairs(room, numberOfRooms, specific) {
    var repairList = [];
    var cost; 

    //SET COST AND REPAIR NAME
    switch(room) {
        case "bathroom": cost = 10000; break;
        case "bedroom": cost = 10000;break;
    }

    for(var i = 0; i < numberOfRooms; i++){
        var count = (i + 1);

        var key = room + count;
        var repair = cap(room) + " " + count;

        var repairObject = new Repair(key, repair, cost);
        repairList.push(repairObject);

        if(specific) {
            repairList.push.apply(repairList, getSpecificRepairs(key, repair));
        }
    }
    return repairList;
}

//GET KEY FROM ID
function getKey(id) {
    return id.substring(0, id.indexOf("-"));
}

//SPECIFIC ARRAY OBJECT
function SpecificRepair(key, repair, cost) {
    this.key = key;
    this.repair = repair;
    this.cost = cost;
}

//HELPERS
//CAPIOTALIZE STRING
//function cap(str) {
//    console.log("Before:" + str);
//    var ret = str.replace(/(^\w|\s\w)(\S*)/g, (_,m1, m2) => m1.toUpperCase() + m2);
//    
//    
//        
//    // "^\w" - first char in string
//    // "|" - or 
//    // "\s\w" - first char after space
//    // g - global all occurrences
//    console.log("After:" + ret);
//    return ret;
//}

//CREATE KEY FROM STRING
function createKey(area) {
    var areaName = area.split(" ");
    var areaKey = "";
    for(var i = 0; i < areaName.length; i++){
        //        console.log(areaName);
        if(areaName[i].length > 4) {
            areaKey+= areaName[i].substring(0, 3).toLowerCase();
        }
        else {
            areaKey+= areaName[i].toLowerCase();
        }
    }
    return areaKey;
}

//REMOVE SPACES
function strip(str) {
    return str.replace(/\s/g, '');
}

function tooltipEvents(){
    var button = document.getElementById("submit-but");
    var tooltipID = "submit-tooltip";

    if(!onMobile()){
        button.onmouseover = function(e) {
            if(getRepairArray().length <= 0){
                showToolTip(e, tooltipID, true);
            }
        }
        button.onmouseout = function(e) {
            if(getRepairArray().length <= 0){
                showToolTip(e, tooltipID, false);
            }
        }
    }


    button.onclick = function(e) {
        console.log("click");
        if(getRepairArray().length > 0){
            showVerificationPopup();
        }
        else {
            showToolTip(e, tooltipID, true);
        }
    }
}

function cap(str) {
    var ret = "";
    str.split("").forEach(function(item, index) {
        if(index == 0) {
            ret += item.toUpperCase();
        }
        else if(item == item.toUpperCase()){
            ret += " " + item;
        }
        else {
            ret += item;
        }
    });
    return ret;
}