let profileSaved = false;

function Call(date, notes, offer) {
    this.date = date;
    this.notes = notes;
    this.offer = offer;
}
function Comp(address, link, price){
    this.address = address;
    this.link = link;
    this.price = price;

}



function saveComps() { return saveThis("comp", "comp", "comp-address");}
function saveCalls() { return saveThis("call", "call", "call-date");}
function saveContacts(){
    var array = [];

    Array.prototype.forEach.call(document.getElementById("add-contact-here").childNodes, function(item, index) {
        //        console.log(item);
        if(item.tagName == "DIV") {
            var object = {};
            Array.prototype.forEach.call(item.childNodes, function(div_item, div_index) {
                if(div_item.tagName == "INPUT") {

                    if(div_item.value != "") {
                        object.value = div_item.value;
                        //                        console.log(div_index);
                        array.push(object);
                    }
                }
            });
        }
    });
    //    console.log(array);
    return (array == []) ? null : array;
}

function saveThis(key, musthaveID){
    var empty = false;
    //GET ELEMENTS WITH CLASS NAME CALL
    var containers = document.getElementsByClassName(key);
    //    console.log(containers);
    var array = [];
    Array.prototype.forEach.call(containers, function(item,index){
        var obj = (key == "comp") ? new Comp(): new Call();

        for(var i = 0; i < item.childNodes.length; i++) {
            var child_item = item.childNodes[i];

            //GET ALL DIVS OF ELEMENTS WITH CLASS NAME CALL
            if(child_item.tagName == "DIV"){
                //                console.log(child_item);
                //GET SECOND CHILD OF EACH DIV OF ELEMENTS WITH CLASS NAME CALL
                var input = child_item.childNodes[1];
                console.log(input);
                if(input != null) {
                    if(input.name == musthaveID && input.value == ""){
                        console.log(input.id);
                        empty = true;
                    }
                    else {
                        if(key == "comp") {
                            switch(input.name){
                                case "comp-address": obj.address = input.value; break;
                                case "comp-link": obj.link = input.value; break;
                                case "comp-price": obj.price = input.value; break;
                            }
                        }
                        else { //CONTACT
                            switch(input.name){
                                case "call-date": obj.date = input.value; break;
                                case "call-notes": obj.notes = input.value; break;
                                case "call-offer": obj.offer = input.value; break;
                            }
                        }
                    }
                }
            }
        }
        if(!empty){
            array.push(obj);
        }
    });
    //    console.log(array);
    return (array == []) ? null : array;
}

function saveAll(){
    var empty = false;
    //ADD IDS TO EVERYTHING
    var array = [];
    //LOOP THROUGH CLASS
    var inputs = document.getElementsByClassName("detail");
    Array.prototype.forEach.call(inputs, function(item, index){
        if(item.id == "address" && item.value == "") {
            empty = true; 
            return;
        }
        else if (item.id == "investor" && item.value == ""){
            empty = true;
            return;
        }
        else {
            array.push({"id": item.id, "value": item.value});
        }
    });
    //    console.log(array);
    return (!empty) ? array: null;
}


function save(){
    var link = getEncodedLink();

    profileSaved = true;

    //CREATE TEXT FROM ARRAYS
    console.log(link);
    sessionStorage.setItem("edit-link", link);
//    window.open(link, "_blank");

        copy(link);
        alert("A link to edit this profile has been compied to your clipboard. Paste it somewhere safe!");

    return link;
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

function encode(elm){
    var key = "";
    var arr = [];
    switch(elm) {
        case "calls": key = "?CL?"; arr = saveCalls(); break;
        case "contacts": key = "?CT?"; arr = saveContacts(); break;
        case "comps": key = "?CP?"; arr = saveComps(); break;

        default: key = "?DP?"; arr = saveAll();
    }
    sessionStorage.setItem(elm, JSON.stringify(arr));
    //    console.log(arr);

    if(key == "?DP?" && arr == null) {return null;}
    else {
        var encodedArr = encodeArray(arr);

        console.log(elm);
        console.log(encodedArr);

        return key + encodedArr;
    }
}

function getEncodedLink(){
//    var link = "index.html";
    var link = "https://mwiv.github.io/IversonPropertyGroup/PropertyProfile/index.html";
    
    var all = encode("all");
    var encodings = [encode("contacts"), encode("comps"), encode("calls")];
    if (all != null) {
        link+= all;
        encodings.forEach(function(item) {link+= item});
        return link;
    }
    else return null;
}

function encodeArray(array) {
    return btoa(JSON.stringify(array));
}