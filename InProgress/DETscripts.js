//SET PAGE NAME BASED ON PROPERTY AND VIEWR
//SET FILE NAME 
//DOWNLOAD PDF VERISON

var call_html = "<div class = 'call'><div class = 'detail-input-line'>Date: <input id = 'call-date' type= 'date' ></div> <div class = 'detail-input-line'>Notes: <textarea id = 'call-notes'></textarea></div> <div class = 'detail-input-line'>Offer: <input id = 'call-offer' type= 'tel' ></div> <span class = 'call-spacer'></span></div>";

function addCall() {
    //ADD DIV CONTAINING DATE AND DETAILS OF CONVERSATION
}

function loadPropetyDetails(){
    //READ ENCODING FROM HREF AND FILL PROPERTY

}

//ADD KEYS IDS TO ALL INPUTS LOAD INTO ARRAY

function addPhoneEntry() {
}

function removePhoneEntry() {
}

function loadCalls(){

}

function Call(date, notes, offer) {
    this.date = date;
    this.notes = notes;
    this.offer = offer;
}
//RESIZE TEXT AREA ACCORDING TO CONTENT
function textAreaEvent() {
    var textArea = document.getElementById("other-input");
    textArea.onkeyup = function() {
        textArea.style.height = "1px";
        textArea.style.height = (25 + textArea.scrollHeight) + "px";
    }
}


window.onload = function(){
    if(isEncoded()){
        decode();
    }

}

function encode(){
    var call_encoding = saveCalls();
    document.getElementById("encoded-edit-link").style.textDecoration = "underline";

    var encoded_link = "PropertyDetails.html" + "?C?" + call_encoding;
    document.getElementById("encoded-edit-link").href = encoded_link;   
    console.log(encoded_link);
}

function isEncoded(){
    //"?dp?"
    return window.location.href.indexOf("?C?")>= 0;
}
function decode(){
var detailencoding = window.location.href.substring(window.location.href.indexOf("?pd?"), window.location.href.indexOf("?C?"));
    //CALLS
    var callencoding = window.location.href.substring(window.location.href.indexOf("?C?") + "?C?".length);
    loadCalls(callencoding);
}
function saveCalls() {
    var empty = false;
    var calls = document.getElementsByClassName("call");
    console.log(calls);
    var callArray = [];
    Array.prototype.forEach.call(calls, function(item,index){
        var call = new Call();
        console.log(item.childNodes);


        for(var i = 0; i < item.childNodes.length; i++) {

            var child_item = item.childNodes[i];
            if(child_item.tagName == "DIV"){
                var input = child_item.childNodes[1];


                if(input.id == "call-date" && input.value == ""){
                    empty = true; 
                    break; 
                }
                else {
                    console.log(input.id);
                    switch(input.id){
                        case "call-notes": call.notes = input.value; break;
                        case "call-date": call.date = input.value; break;
                        case "call-offer": call.offer = input.value; break;
                    }
                }
            }

        }
        if(empty == false){
            console.log(call);
            callArray.push(call);
        }
    });


    return btoa(JSON.stringify(callArray));
    //loop through child of type input and text area to read ids and creat call object o push
}

function loadCalls(call_encoding) {
    var callArray = JSON.parse(atob(call_encoding));

    addNCalls(callArray.length);
    console.log(callArray);

    var calls = document.getElementsByClassName("call");
    console.log(calls);

    Array.prototype.forEach.call(calls, function(item,index){

        Array.prototype.forEach.call(item.childNodes, function(child_item, child_index) {
            if(child_item.tagName == "DIV"){

                
                var input = child_item.childNodes[1];
                switch(input.id){
                    case "call-notes": input.value = callArray[index].notes; break;
                    case "call-date": input.value = callArray[index].date; break;
                    case "call-offer": input.value = callArray[index].offer; break;

                }
            }
        });

    });
}

function addNCalls(n){
    if(n == 0) return;
    else {
        addCall();
        addNCalls(n - 1);
    }
}
function save(){
    var Inputs = document.getElemenntsByClassName("detail");
}
function addComp(){
    //ADD DIV
    //REMOVE BUTTON ** only 2 comps
}
//"id": "value"
//if(id.label == text area) innerHTML = value;
//"calls": [array of call objects]
