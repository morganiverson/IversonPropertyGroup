var keys = [];

function removeEncoding() {
    window.location.href = window.location.href.substring(0, window.location.href.indexOf("?"));
}

//GENERATE EVAL FROM ARRAY
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

function checkDetailedEval() {
    var link = window.location.href;
    if(encodedEval()) {
        //CHECK IF DEFAULT EVAL
        if(link.indexOf("?f?") >= 0) {
            var eval = link.substring(link.indexOf("?de?") + "?de?".length, link.indexOf("?f?"));
            sessionStorage.setItem("generated-evaluation", eval);
            var encodedEntries = link.substring(link.indexOf("?f?") + "?f?".length);
            loadEval(decodeArray(eval));
            loadEntries(encodedEntries);
        }
        else {
            var eval = window.location.href.substring(window.location.href.indexOf("?de?") + "?de?".length);
            sessionStorage.setItem("generated-evaluation", eval);

            loadEval(decodeArray(eval));

        }
        //        console.log(encodedEvalURL);
        //        console.log(decodeArray(encodedEvalURL));
        //        
    }
}

//TELL IF EVALUTAION IS ENCODED IN URL
function encodedEval(){
    return window.location.href.indexOf("?de?") >= 0;
}

//DECODE DATA IN URL
function decodeArray(URL) {
    return JSON.parse(atob(URL));
}

function Key(Repair, parent_key) {
    this.Repair = Repair;
    this.parent_key = parent_key;
}

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

//LOAD A FILLED OUT EVAL
function loadEntries(encoding) {
    console.log("Loading...");
    console.log(encoding);
    var array = decodeArray(encoding);
    //DETAILS
    var details = array[0].array;
    fillDetails(details);

    var degrees = array[1].array;
    console.log(degrees);
    fillDegrees(degrees);
}

function fillDetails(array){
    array.forEach(function(item) {
        document.getElementById(item.id).value = item.value;
    })
}

function fillDegrees(array) {
    var inputs = document.getElementsByClassName("divTableCell-DEG");
    var degreeIndex = 0;
    var arrayIndex = 0;
    Array.prototype.forEach.call(inputs, function(item) {
        Array.prototype.forEach.call(item.childNodes, function(input) {
            if(input.tagName == "INPUT"){
                degreeIndex++;
                if(degreeIndex == array[arrayIndex].index){
                    console.log("match");
                    input.click();
                    arrayIndex++;
                }
            }
        });
    });
}