//CREATE LINK TO FILLED EVAL
// CREATE PDF WITH LINK TO FILLED EVAL
function saveEntries(dl) {
    var filledEvalArray = [];
    //SAVE DETAILS
    var detailArray = getDetails();
    filledEvalArray.push({"name": "details", "array": detailArray});

    var degreeArray = getDegrees();
    filledEvalArray.push({"name": "degrees", "array": degreeArray});

    //ENCODE
    //CHECK IF THE ADD A DEFAULT EVALUATION
    
    var link = "mwiv.github.io/IversonPropertyGroup/PropertyRepairEvalutaion/index.html" + sessionStorage.getItem("generated-evaluation") + "?f?" +  btoa(JSON.stringify(filledEvalArray));
//    window.location.href = link;
    
    //ADD TO HREF
    if(!dl) copy(link);
    else {
        sessionStorage.setItem("link", link);
        sessionStorage.setItem("details",detailArray);
    }
}

function copy(text){
    var t = document.createElement("textarea");
    t.value = text;
    document.body.appendChild(t);

    t.select();
    t.setSelectionRange(0, 99999)

    document.execCommand("copy");
    document.body.removeChild(t);

}

function getDegrees() {
    var array = [];
    var degInputs = document.getElementsByClassName("divTableCell-DEG");
    //    console.log(degInputs);
    var degreeIndex = 0;

    Array.prototype.forEach.call(degInputs, function(item) {
        Array.prototype.forEach.call(item.childNodes, function(input) {
            if(input.tagName == "INPUT"){
                degreeIndex++;
                if(input.type == "checkbox") {
                    if(input.checked) {
                        console.log(degreeIndex);
                        console.log(input)
                        array.push({"index": degreeIndex, "type": "checkbox", "value": null}); //COUNT UP TO DEGREE INDEX THEN ELM.CLICK()
                    }
                }
                else{
                    if(input.value != "") {
                        console.log(degreeIndex);
                        console.log(input)
                        degreeArray.push({"index": degreeIndex, "type": "checkbox", "value": input.value}); //COUNT UP TO DEGREE INDEX THEN ELM.CLICK()
                    }
                }
            }

        });
    });
    //    console.log(degreeArray);
    return array;
}
function getDetails(){
    var array = [];
    var details = document.getElementsByClassName("property-details");
    Array.prototype.forEach.call(details, function(item) {
        array.push({"id" : item.id, "value": item.value});
    });
    return array;
}

function isEmpty(testID, inputID) {
    return (testID.id == inputID) && (testID.value == "");
}

