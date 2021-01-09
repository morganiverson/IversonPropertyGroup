

function isEncoded(){
    //SET EDIT LINK TO CURRENT HREF
    return window.location.href.indexOf("?DP?") >= 0;
}
function loadPropetyDetails(){
    //READ ENCODING FROM HREF AND FILL PROPERTY

}
function addN(n, elm){
    console.log(elm + " " + n);

    if(n <= 1) return;
    else {
        switch(elm){
            case "call": addCall(); break;
            case "contact": addContact(); break;
            case "comp": addComp(); break;
        }
        return addN(n - 1, elm);
    }
}

function loadThis(key, encoding) {
    console.log(key);
    //    console.log(encoding);
    var array = decodeArray(encoding);


    switch(key){
        case "call": addN(array.length, "call"); break;
        case "comp": addN(array.length, "comp"); break;
    }
    if(array.length == 0) return;
    console.log(key);
    console.log(array);
    var index = 0;
    var containers = document.getElementsByClassName(key);
    //    console.log(containers);
    Array.prototype.forEach.call(containers, function(item){
        if(index >= array.length) return;
console.log(index);
        Array.prototype.forEach.call(item.childNodes, function(child_item, child_index) {

            if(child_item.tagName == "DIV" && child_item.classList.contains("detail-input-line")){
                var input = child_item.childNodes[1];
                console.log(input);
                if(key == "call") {
                    console.log(array[index]);
                    switch(input.name){
                        case "call-notes": input.value = array[index].notes; break;
                        case "call-date": input.value = array[index].date; break;
                        case "call-offer": input.value = array[index].offer; break;
                    }
                }
                else {
                    //                    console.log(array[index]);

                    switch(input.name) {
                        case "comp-link": input.value = array[index].link; break;
                        case "comp-address": input.value = array[index].address; break;
                        case "comp-price": input.value = array[index].price; break;
                    }
                }
            }
        });
        index++;

    });
}
function loadContacts(encoding) {

    var array = decodeArray(encoding);
    addN(array.length, "contact");

    //    console.log("contact")
    console.log(array);
    if(array.length == 0) return;
    var index = 0;

    Array.prototype.forEach.call(document.getElementById("add-contact-here").childNodes, function(item) {
        if(item.tagName == "DIV") {
            var object = {};
            Array.prototype.forEach.call(item.childNodes, function(div_item) {
                if(div_item.tagName == "INPUT") {
                    //                       console.log(index);
                    div_item.value = array[index].value;
                    index++;
                }
            });
        }
    });}
function loadAll(encoding){
    var array = decodeArray(encoding);
    console.log("all");
    console.log(array)

    array.forEach(function (item, index) {
        var elm = document.getElementById(item.id);
        //        console.log(elm);
        elm.value = item.value});
}

function decodeArray(encoding) {
    return JSON.parse(atob(encoding));
}

function load(){
    //    document.getElementById("encoded-edit-link").href = window.location.href;


    console.log("Loading Encoded URL Data....")
    var link = window.location.href;

    var hasContacts = link.indexOf("?CT?") >= 0;
    var hasComps = link.indexOf("?CP?") >= 0;
    var hasCalls = link.indexOf("?CL?") >= 0;


    console.log(link);
    console.log(link.indexOf("?DP?"));
    console.log(link.indexOf("?CT?"));
    var details = link.substring(link.indexOf("?DP?") + 4, link.indexOf("?CT?"));

    var contacts = link.substring(link.indexOf("?CT?") + 4, link.indexOf("?CP?"));
    var comps = link.substring(link.indexOf("?CP?") + 4, link.indexOf("?CL?"));
    var calls = link.substring(link.indexOf("?CL?") + 4);


    //    console.lo

    loadAll(details);
    //    console.log(contacts);
    loadThis("call", calls);
    loadThis("comp", comps);
    loadContacts(contacts);

}