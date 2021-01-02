const default_html_string = "<!-- ELEMENTS--> <div class = 'divTableRow'> <div class = 'divTableCell'>Repair_Here <div class= 'notes-text-box' id = 'desc-NOTES'><textarea class = 'notes-text-input'>Notes</textarea></div> </div> <!-- INPUTS--> <div class = 'divTableCell-DEG'> <input type = 'checkbox' name = 'desc-repair-deg' value = 'none'> </div> <div class = 'divTableCell-DEG'> <input class = 'partial-input' type = 'tel' pattern = '\d' name = 'desc-repair-deg'> </div> <div class = 'divTableCell-DEG'> <input type = 'checkbox' name = 'desc-repair-deg' value = 'full'> </div> <div class = 'divTableCell-DEG'> <span class = 'repair-cost' id = 'desc-repair-cost'>$</span> </div> </div>"
var header_row_string = "<div class = 'divTableHeadingRow'> <div class = 'divTableHeadCell-DSC'>Repair</div> <div class = 'divTableHeadCell-DEG'>None</div> <div class = 'divTableHeadCell-DEG'>Partial</div> <div class = 'divTableHeadCell-DEG'>Full</div> <div class = 'divTableHeadCell-DEG'>Total</div> </div>";

var keys = [];

//ARRAY FO DEFAULT REPAIRS
var default_keys = [new Repair("land", "Landscape", 5000), 
                    new Repair("roof", "Roof", 10000),
                    new Repair("floor", "Flooring", 5000), 
                    new Repair("paint", "Paint", 5000), 
                    new Repair("kitch", "Kitchen",10000),
                    new Repair("bath", "Bathroom", 3500) 
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

//ADD LISTNERS FOR CHECK BOXES
function checkListeners(key){
    //    console.log(key);
    var inputs = document.getElementsByName(key + "-repair-deg");
    //    console.log(inputs);

    for(var j = 0; j < inputs.length; j++) {
                console.log(inputs[j]);
        var input = inputs[j];

        input.onchange = function(e) {
            //            console.log(this.value);
                        console.log(this.type);
            if((this.type == "checkbox" && this.checked) || (this.type == "tel" && this.value != null)) { //OIF THIS INPUT IS CHECKED OR HAS A VALUE
                //REMOVE NON INTEGER NUMBERS
                if(this.type == "tel") {
                    this.value = this.value.replace(/\D/g,'');
                }
                //UNCHECK OR EMPTY OTHER INPUTS
                for(var k = 0; k < inputs.length; k++) {
                    if(inputs[k].value != this.value){
                        if(inputs[k].type == "checkbox")    inputs[k].checked = false;
                        else inputs[k].value = null;
                    }
                }

                //CHANGE VALUE IN TOTAL COLUMN
                var total_output = document.getElementById(key + "-repair-cost");

                total_output.innerHTML = "$" + getRepairValue(key, this.value);

                calcTotal(false);
            }
            else {
                console.log(key);
                var total_output = document.getElementById(key + "-repair-cost");
                total_output.innerHTML = "$";
                calcTotal(false);
            }

        }


    }

}

//REPLACE PLACEHOLDERS WITH ACTUAL REPAIR KEY
function replaceAll(key, repair){
    var newString = default_html_string.replaceAll("desc-", key + "-");
    newString = newString.replaceAll("Repair_Here", repair);
    return newString;
}

//ADD REPAIR TO CHECKLIST
function addRepair(key, repair, full_cost){
    var obj = {"key": key, "repair": repair, "cost": full_cost};
    keys.push(obj); //ADD TO KEY ARRAY
    document.getElementById("add-repair-here").innerHTML+=replaceAll(key, repair); //ADD ROW TO CHECK LIST TABLE
    //    checkListeners(key);//ADD LISTENERS FOR CHECK BOXES
    //    console.log(keys);
}
//HOW TO ADD ALL REPAIRS - dictionary key:desc

//RETURN COST OF FULL REPAIR
function getFullValue(key){
    //    console.log(key);
    var repair = keys.find(r => r.key === key);
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

//REMOVE ALL REPAIRS FROM
function baseEval(){
    calcTotal(true);
    document.getElementById("add-repair-here").innerHTML = header_row_string;
    addRepair("", "Repair", 0);
    //MAKE TOTAL 0
}

function clearEval(){
    calcTotal(true);
    document.getElementById("add-repair-here").innerHTML = header_row_string;

}

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

function onMobile(){
    return screen.width <= 480;
}
function printEvents(){
    var printButton = document.getElementById("print-button");
    var tooltipID = "print-tooltip";
    if(onMobile()){
        printButton.onmouseover = function(e) {
            if(!evalComplete()){
                showToolTip(e, tooltipID, true);
            }
        }
        printButton.onmouseout = function(e) {
        if(!evalComplete()){
            showToolTip(e, tooltipID, false);
        }
    }
    }
    printButton.onclick = function(e) {
        if(evalComplete()){
            window.print();
        }
        
    }

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
    }
    else {
        tooltip.style.visibility = "hidden";

    }
}