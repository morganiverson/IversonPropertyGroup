//CREATE LINK TO FILLED EVAL
// CREATE PDF WITH LINK TO FILLED EVAL
function saveEntries() {
    //SAVE DETAILS
    var detailArray = getDetailPaneInputs();
    console.log(detailArray);
    
    var degreeArray = [];
    var degInputs = document.getElementsByClassName("divTableCell-DEG");
    console.log(degInputs);
    var degreeIndex = 0;
    Array.prototype.forEach.call(degInputs, function(item) {
    Array.prototype.forEach.call(item.childNodes, function(input) {
        if(input.tagName == "INPUT"){
            degreeIndex++;
            if(input.type == "checkbox") {
                if(input.checked) {
                    console.log(degreeIndex);
                    console.log(input)
                    degreeArray.push({"index": degreeIndex, "type": "checkbox", "value": null}); //COUNT UP TO DEGREE INDEX THEN ELM.CLICK()
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


}

function getDetailPaneInputs(){
    var array = [];
    var empty = false;
    var details = document.getElementsByClassName("detail-pane")[0].childNodes;
//        console.log(details);

    Array.prototype.forEach.call(details, function(item) {
        if(item.tagName == "DIV") {
            Array.prototype.forEach.call(item.childNodes, function(div_item) {
                if(div_item.tagName == "SPAN") {
                    Array.prototype.forEach.call(div_item.childNodes, function(span_item) {
                        if(span_item.tagName == "INPUT"){
//                            console.log("here");
                            if(isEmpty(span_item, "viewer")){empty == true;return;}
                            else if (isEmpty(span_item, "address")){empty == true;return;}
                            else {
                                array.push( {"id": span_item.id, "value": span_item.value});
                            }
                        }
                    });
                }
            });
        }
    });
//    console.log("here");
    return array;
}

function isEmpty(testID, inputID) {
    return (testID.id == inputID) && (testID.value == "");
}