const default_html_string = "<!-- ELEMENTS--> <div class = 'divTableRow'> <div class = 'divTableCell'>Repair_Here <div class= 'notes-text-box' id = 'desc-NOTES'><textarea class = 'notes-text-input'>Notes</textarea></div> </div> <!-- INPUTS--> <div class = 'divTableCell-DEG'> <input type = 'checkbox' name = 'desc-repair-deg' value = 'none'> </div> <div class = 'divTableCell-DEG'> <input class = 'partial-input' type = 'text' pattern = '\d' name = 'desc-repair-deg'> </div> <div class = 'divTableCell-DEG'> <input type = 'checkbox' name = 'desc-repair-deg' value = 'full'> </div> <div class = 'divTableCell-DEG'> <span class = 'repair-cost' id = 'desc-repair-cost'>$</span> </div> </div>"
var keys = [];
var default_keys = [new Repair("land", "Landscape", 5000), 
                    new Repair("roof", "Roof", 10000), 
                    new Repair("floor", "Flooring", 5000), 
                    new Repair("paint", "Paint", 5000), 
                    new Repair("kitch", "Kitchen",10000),
                    new Repair("bath", "Bathroom", 3500) 
];

function Repair(key, repair, cost){
     this.key = key;
     this.repair = repair;
     this.cost = cost;
    }
/*
{"key": "key_val", "repair": "repair_val", "cost": 000} 


*/

window.onload = function(){ 
    addRepair("desc", "Brief Description", 1000);
} 


function checkListeners(key){
    var inputs = document.getElementsByName(key + "-repair-deg");

    for(var j = 0; j < inputs.length; j++) {
//        console.log(inputs[j].value);

        inputs[j].onchange = function(e) {
            console.log(this.value);
            if(this.checked || this.value != null) { //OIF THIS INPUT IS CHECKED OR HAS A VALUE

                //UNCHECK OR EMPTY OTHER INPUTS
                for(var k = 0; k < inputs.length; k++) {
                    if(inputs[k].value != this.value){
                        if(inputs[k].type == "checkbox") inputs[k].checked = false;
                        else inputs[k].value = null;
                    }
                }

                //CHANGE VALUE IN TOTAL COLUMN
                var total_output = document.getElementById(key + "-repair-cost");
                console.log(total_output);
                total_output.innerHTML = "$" + getRepairValue(key, this.value);
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
    keys.push(obj);
    document.getElementById("checklist-table").innerHTML+=replaceAll(key, repair);
    checkListeners(key);
//    console.log(keys);
}
//HOW TO ADD ALL REPAIRS - dictionary key:desc

//RETURN COST OF FULL REPAIR
function getFullValue(key){
    return keys.find(({ key }) => key === key).cost;
}

//RETURN REPAIR COST BASED ON VALUE AND KEY
function getRepairValue(key, value){
    switch(value){
        case "none": return 0; 
        case "full": return getFullValue(key);
        default: return value;
    }
}
function calcTotal(key){
    var total_cells = documnet.getElementsByClassName("repair-cost");
    var sum = 0;
    
    total_cells.forEach(function(item, index) {
        sum+= parseFloat(item.innerHTML);
    });
    
//    var total_output = ;
    
}