var paintRoomRepair = new SpecificRepair("paint", "Paint", 500);
var flooringRepair = new SpecificRepair("floor", "Flooring", 500);

function getRepairArray() {
    var allAreaRepairs = [];
    //GET ALL CHECKBOXES FOR AREA
    var RepairAreas = document.getElementsByClassName("repair-area");
    Array.prototype.forEach.call(RepairAreas, function(item, index) {

        var itemKey = getKey(item.id);

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
        else if(item.type == "number" && item.id.indexOf("spec") < 0) {
            //            console.log(item.id);

            if (item.value > 0) { 
                //            var rooms = getMultipleRoomRepairs(itemKey, item.value, areaToSpec(item.id));
                var rooms = getMultipleRoomRepairs(itemKey, item.value, document.getElementById(areaToSpec(item.id)).checked);
                allAreaRepairs.push.apply(allAreaRepairs, rooms);
            }
        }

    });
    console.log(allAreaRepairs);

}

//RETURN REPAIR OBJECT GIVEN KEY
function getRepair(key){
    var repairCost;
    var repair = cap(key);
    var repairKey = (key.length < 5) ? key : key.substring(0, 4);

    //set repair cost
    switch (key) {
        case "frontyard", "backyard": repairCost = 5000; break;
        case "kitchen": repairCost = 10000; break;
        default: repairCost = 1000;
    }

    return new Repair(repairKey, repair, repairCost);
}

//RETURN ARRAY OF SPECIFIC REPAIRS
function getSpecificRepairs(key, repair){
    var specificRepairList = [];

    var specifics;

    switch(key) {
        case "kitc": specifics = [paintRoomRepair, flooringRepair, 
                                  new SpecificRepair("cab", "Cabinets", 500), 
                                  new SpecificRepair("app", "Appliances", 1000)]; break;
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

//CAPIOTALIZE STRING
function cap(str) {
    var ret = str.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase());
    // "^\w" - first char in string
    // "|" - or 
    // "\s\w" - first char after space
    // g - global all occurrences
    return ret;
}