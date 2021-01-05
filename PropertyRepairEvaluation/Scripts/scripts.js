//EVAL SCRIPTS
//SET PRINT PAGE NAME
//GET LINK TO PDF PREVIEW OF WEBPAGE
//GENERATE LINK TO FILLED EVAL

const default_html_string = "<!-- ELEMENTS--> <div class = 'divTableRow'> <div class = 'divTableCell'>Repair_Here <div class= 'notes-text-box' id = 'desc-NOTES'><textarea class = 'notes-text-input' placeholder = 'Notes'></textarea></div> </div> <!-- INPUTS--> <div class = 'divTableCell-DEG'> <input type = 'checkbox' name = 'desc-repair-deg' value = 'none'> </div> <div class = 'divTableCell-DEG'> <input class = 'partial-input' type = 'tel' pattern = '\d' name = 'desc-repair-deg'> </div> <div class = 'divTableCell-DEG'> <input type = 'checkbox' name = 'desc-repair-deg' value = 'full'> </div> <div class = 'divTableCell-DEG'> <span class = 'repair-cost' id = 'desc-repair-cost'>$</span> </div> </div>";

const child_html_string = "<!-- ELEMENTS--> <div class = 'divTableRow'> <div class = 'divTableCell'>Repair_Here <div class= 'notes-text-box' id = 'desc-NOTES'><textarea class = 'notes-text-input' placeholder = 'Notes'></textarea></div> </div> <!-- INPUTS--> <div class = 'divTableCell-DEG'> <input class = 'desc-child-input' type = 'checkbox' name = 'desc-repair-deg' value = 'none'> </div> <div class = 'divTableCell-DEG'> <input class = 'desc-child-input partial-input' type = 'tel' pattern = '\d' name = 'desc-repair-deg'> </div> <div class = 'divTableCell-DEG'> <input class = 'desc-child-input' type = 'checkbox' name = 'desc-repair-deg' value = 'full'> </div> <div class = 'divTableCell-DEG'> <span class = 'repair-cost' id = 'desc-repair-cost'>$</span> </div> </div>";

var header_row_string = "<div class = 'divTableHeadingRow'> <div class = 'divTableHeadCell-DSC'>Repair</div> <div class = 'divTableHeadCell-DEG'>None</div> <div class = 'divTableHeadCell-DEG'>Partial</div> <div class = 'divTableHeadCell-DEG'>Full</div> <div class = 'divTableHeadCell-DEG'>Total</div> </div>";



var keys = [];
var default_keys = [new Repair("land", "Landscape", 5000, null), 
                    new Repair("roof", "Roof", 10000, null),
                    new Repair("floor", "Flooring", 5000, null), 
                    new Repair("paint", "Paint", 5000, null), 
                    new Repair("kitch", "Kitchen",10000, null),
                    new Repair("bath", "Bathroom", 3500, null) 
                   ];

//GENERATE EVALUTAION WITH DEF REAPIRS
function loadDefaultEval(){
    clearEval();
    for(var i = 0; i < default_keys.length; i++) {

        var key = default_keys[i].key;
        var repair = default_keys[i].repair;
        var cost = default_keys[i].cost;

        addRepair(key, repair, cost);
    }

    //ADD CHECK LISTSNERS
    keys.forEach(function(item, index) {
        var key = item.key;
        checkListeners(key);
    });
}
//ADD REPAIR TO CHECKLIST

//RETURN COST OF FULL REPAIR
function getFullValue(key){
    //        console.log(key);
    var repair = keys.find(r => r.Repair.key === key).Repair;
    return repair.cost;
}

//RETURN REPAIR COST BASED ON VALUE AND KEY
function getRepairValue(key, value){
    switch(value){
        case "none": return 0; 
        case "full": return getFullValue(key);
        default: return value;
    }
}
function calcTotal(clear){
    if(!clear) {
        var total_cells = document.getElementsByClassName("repair-cost");
        //        console.log(total_cells);
        var sum = 0;

        for(var i = 0; i < total_cells.length; i++) {
            var content = total_cells[i].innerHTML.substring(1);
            if(content != ""){
                sum+= parseFloat(content);
            }
        }
        var total_output = document.getElementById("total-here");
        var detail_total_cost = document.getElementById("detail-pane-repair-cost");


        total_output.innerHTML = sum;
        detail_total_cost.value = "$" + sum;
    }
    else {
        var total_output = document.getElementById("total-here");
        var detail_total_cost = document.getElementById("detail-pane-repair-cost");
        total_output.innerHTML = "0";
        detail_total_cost.value = "$0";
    }
}

//CLEAR ALL REPAIRS FROM EVAL 
function baseEval(){
    
    calcTotal(true);
    document.getElementById("add-repair-here").innerHTML = header_row_string;
    addRepair("", "Repair", 0, null);
    
//    console.log(document.getElementById("add-repair-here").childElementCount);

    //MAKE TOTAL 0
    //CLEAR URL
    
}
//CLEAR ALL ENTRIES IN EVAL
function clearEval(){
    calcTotal(true);
    document.getElementById("add-repair-here").innerHTML = header_row_string;

}
//TELL IF EVALUATION IS COMPLETE
function evalComplete(){
    var totalCells = document.getElementsByClassName("repair-cost");
    for(var i = 0; i < totalCells.length; i++) {
        if(totalCells[i].innerHTML == "$") return false;
    }

    var propertyDetails = document.getElementsByClassName("property-details");

    for(var i = 0; i < propertyDetails.length; i++) {
        if(propertyDetails[i].value == "") return false;
    }

    return true;
}

//TELL IF WEBPAGE IS IPEN IN MOBILE DEVICE
function onMobile(){
    return screen.width <= 480;
}



//function convertDate(input){
//    var d = new Date(input);
//    return "".concat((d.getMonth() + 1),d.getDate(),d.getFullYear());
//    
//}

//function getFileName(){
//    var date = convertDate(document.getElementById("view-date").value);
//    console.log(date);
//    var viewer = document.getElementById("viewer").value.replace(/\s/g, "");
//    var address = document.getElementById("address").value.replace(/\s/g, "");
//    console.log(date + "-" + viewer + "-" + address);
//    
//    
//}
//KEY OBJECT TO TRACK REAPIR AND PARENTAGE
