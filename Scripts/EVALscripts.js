//SET PRINT PAGE NAME
//GET LINK TO PDF PREVIEW OF WEBPAGE

const default_html_string = "<!-- ELEMENTS--> <div class = 'divTableRow'> <div class = 'divTableCell'>Repair_Here <div class= 'notes-text-box' id = 'desc-NOTES'><textarea class = 'notes-text-input' placeholder = 'Notes'></textarea></div> </div> <!-- INPUTS--> <div class = 'divTableCell-DEG'> <input type = 'checkbox' name = 'desc-repair-deg' value = 'none'> </div> <div class = 'divTableCell-DEG'> <input class = 'partial-input' type = 'tel' pattern = '\d' name = 'desc-repair-deg'> </div> <div class = 'divTableCell-DEG'> <input type = 'checkbox' name = 'desc-repair-deg' value = 'full'> </div> <div class = 'divTableCell-DEG'> <span class = 'repair-cost' id = 'desc-repair-cost'>$</span> </div> </div>";

const child_html_string = "<!-- ELEMENTS--> <div class = 'divTableRow'> <div class = 'divTableCell'>Repair_Here <div class= 'notes-text-box' id = 'desc-NOTES'><textarea class = 'notes-text-input' placeholder = 'Notes'></textarea></div> </div> <!-- INPUTS--> <div class = 'divTableCell-DEG'> <input class = 'desc-child-input' type = 'checkbox' name = 'desc-repair-deg' value = 'none'> </div> <div class = 'divTableCell-DEG'> <input class = 'desc-child-input partial-input' type = 'tel' pattern = '\d' name = 'desc-repair-deg'> </div> <div class = 'divTableCell-DEG'> <input class = 'desc-child-input' type = 'checkbox' name = 'desc-repair-deg' value = 'full'> </div> <div class = 'divTableCell-DEG'> <span class = 'repair-cost' id = 'desc-repair-cost'>$</span> </div> </div>";

var header_row_string = "<div class = 'divTableHeadingRow'> <div class = 'divTableHeadCell-DSC'>Repair</div> <div class = 'divTableHeadCell-DEG'>None</div> <div class = 'divTableHeadCell-DEG'>Partial</div> <div class = 'divTableHeadCell-DEG'>Full</div> <div class = 'divTableHeadCell-DEG'>Total</div> </div>";


function removeEncoding() {
    window.location.href = window.location.href.substring(0, window.location.href.indexOf("?"));
}
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

function loadEval(array) {
    clearEval();
    var parent;
    for(var i = 0; i < array.length; i++) {
        var key = array[i].key;
        var repair = array[i].repair;
        var cost = array[i].cost;

        if(key.indexOf(parent) >= 0) {
            addRepair(key, repair, cost, parent);
        }
        else {
            parent = key;
            addRepair(key, repair, cost, null);
        }
    }

    //ADD CHECK LISTSNERS
//    console.log(keys);
    keys.forEach(function(item, index) {
        checkListeners(item.Repair.key);
    });
    
}

//ADD LISTNERS FOR CHECK BOXES
function checkListeners(key){
    //        console.log(key);
    var inputs = document.getElementsByName(key + "-repair-deg");
    //    console.log(inputs);

    for(var j = 0; j < inputs.length; j++) {
        //        console.log(inputs[j]);
        var input = inputs[j];

        input.onchange = function(e) {
            //            console.log(this.value);
            console.log(this.type);
            //HORIZANTAL
            if((this.type == "checkbox" && this.checked) || (this.type == "tel" && this.value != null)) { //OIF THIS INPUT IS CHECKED OR HAS A VALUE
                console.log(key + " " + this.value);
                //REMOVE NON INTEGER NUMBERS
                if(this.type == "tel") {
                    this.value = this.value.replace(/\D/g,'');
                }
                //UNCHECK OR EMPTY OTHER INPUTS
                for(var k = 0; k < inputs.length; k++) {
                    if(inputs[k].value != this.value){
                        if(inputs[k].type == "checkbox")    
                            inputs[k].checked = false;
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

            //VERTICAL - CHILD

            if(this.className == null || this.className.indexOf("-child-input") < 0) {
                var child_class_name = this.name.substring(0, this.name.indexOf("-")) + "-child-input";
                var child_inputs = document.getElementsByClassName(child_class_name);
                //                console.log(this);
                if(this.checked){
                    //                    console.log("checked");

                    Array.prototype.forEach.call(child_inputs, function(item, index) {

                        item.checked = (item.type == "checkbox" && item.checked)? false:false;
                        item.value = (item.type == "tel" && item.value != null) ? null:null;
                        item.disabled = true;

                        var total_output = document.getElementById(item.name.replaceAll("deg", "cost"));
                        //                        console.log(total_output);
                        total_output.innerHTML = "$";
                    });
                }
                else {
                    var checkbox_count = 0;
                    Array.prototype.forEach.call(child_inputs, function(item, index) {
                        //RESTORE CHECKBOX VALUE
                        if(item.type == "checkbox") {
                            item.value = (checkbox_count % 2 == 0)? "none": "full";
                            checkbox_count++;
                        }
                        item.disabled = false;
                    });
                }
            }
        }

    }}


//REPLACE PLACEHOLDERS WITH ACTUAL REPAIR KEY
function replaceAllHTML(key, repair, html_string, parent_key){
    var newString = html_string;
    if(parent_key != null) {
        newString = html_string.replaceAll("desc-child-input", parent_key + "-child-input");
    }
    newString = newString.replaceAll("desc-", key + "-");
    newString = newString.replaceAll("Repair_Here", repair);

    return newString;
}

//ADD REPAIR TO CHECKLIST
function addRepair(key, repair, full_cost, parent_key){
    var obj = {"key": key, "repair": repair, "cost": full_cost};
    keys.push(new Key(obj, parent_key)); //ADD TO KEY ARRAY

    if(parent_key != null) {
        document.getElementById("add-repair-here").innerHTML+=replaceAllHTML(key, repair, child_html_string, parent_key); //ADD ROW TO CHECK LIST TABLE
    }
    else {
        document.getElementById("add-repair-here").innerHTML+=replaceAllHTML(key, repair, default_html_string, null); //ADD ROW TO CHECK LIST TABLE
        //    checkListeners(key);//ADD LISTENERS FOR CHECK BOXES
        //    console.log(keys);
    }
}

//HOW TO ADD ALL REPAIRS - dictionary key:desc

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
    addRepair("", "Repair", 0);
    
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

function printEvents(){
    var printButton = document.getElementById("print-button");
    var tooltipID = "print-tooltip";

    if(!onMobile()){
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
        console.log("click");
        if(evalComplete()){
            getFileName();
            console.log(document.title);
            window.print();
        }
        else {
            showToolTip(e, tooltipID, true);
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

        if (onMobile()){
            setTimeout(function () {tooltip.style.visibility = "hidden";}, 3000);
        }

    }
    else {
        tooltip.style.visibility = "hidden";
    }
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

function checkDetailedEval() {
    console.log(encodedEval());
    if(encodedEval()) {
        var encodedEvalURL = window.location.href.substring(window.location.href.indexOf("?DetailedEvaluation?") + "?DetailedEvaluation?".length);
        //        console.log(encodedEvalURL);
        //        console.log(decodeArray(encodedEvalURL));
        //        
        loadEval(decodeArray(encodedEvalURL));
    }
}
//TELL IF EVALUTAION IS ENCODED IN URL
function encodedEval(){
    return window.location.href.indexOf("?DetailedEvaluation?") >= 0;
}

//DECODE DATA IN URL
function decodeArray(URL) {
    return JSON.parse(atob(URL));
}

//KEY OBJECT TO TRACK REAPIR AND PARENTAGE
function Key(Repair, parent_key) {
    this.Repair = Repair;
    this.parent_key = parent_key;
}