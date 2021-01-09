//set all input values to the values entered
function inputEvents() {
    var inputs = document.getElementsByTagName("INPUT");
    Array.prototype.forEach.call(inputs, function(item) {
        item.onchange = function() {
            item.setAttribute("value",item.value);
            console.log(item.value);
            console.log(item);
        }
    });

    inputs = document.getElementsByTagName("TEXTAREA");
    //    console.log(inputs);
    Array.prototype.forEach.call(inputs, function(item) {
        item.onchange = function() {
            item.setAttribute("innerHTML",item.value);
            console.log(item.value);
            console.log(item);
        }
    });
}

function allEvents(){
    //    saveButton();
    contactEvents();
    compEvents();
    callEvents();
    textAreaEvent();
    addressEvent();
    goButtons();
    peopleSearchEvent();
    //    inputEvents();
}

function saveButton() {
    document.getElementById("save-button").onclick = function(){
        if(save() != null) { downloadpdf();}
    }
}
function contactEvents(){
    var contacts = document.getElementsByClassName("")
    //ADD CONTACT 
    document.getElementById("add-contact-button").onclick = function() {
        console.log("add Contact");
        document.getElementById("add-contact-here").appendChild(getContactElement());
        contactEvents();
        inputEvents();
    }
    //RMEOVE CONTACT
    var remove_buttons = document.getElementsByClassName("remove-contact-button");
    Array.prototype.forEach.call(remove_buttons, function(item, index) {
        item.onclick = function() {
            remove(item);
            console.log("removed Contact");

        }
    });
}
function compEvents(){
    document.getElementById("add-comp-button").onclick = function(){
        console.log("add Comp");
        document.getElementById("add-comps-here").appendChild(getCompElement());
        document.getElementById("add-comp-button").style.display = "none";
        compEvents();
        goButtons();
        inputEvents();

    }
    Array.prototype.forEach.call(document.getElementsByClassName("remove-comp-button"), function(item, index) {
        console.log(item);
        item.onclick = function() {
            remove(item);
            document.getElementById("add-comp-button").style.display = "inline"; //ONLY 2 COMPS
        }
    });


}
function callEvents() {
    //ADD CALL
    document.getElementById("add-call-button").onclick = function() {
        addCall();
        textAreaEvent();
        callEvents();
    }
    //REMOVE CALL

    Array.prototype.forEach.call(document.getElementsByClassName("remove-call-button"), function(item, index) {
        console.log("remove");

        item.onclick = function() {
            remove(item);
        }
    });    
}
function textAreaEvent() {
    var textAreas = document.getElementsByTagName("TEXTAREA");
    //    console.log(textAreas);
    Array.prototype.forEach.call(textAreas, function(item, index) {

        item.onkeyup = function() {
            item.style.height = "1px";
            item.style.height = (25 + item.scrollHeight) + "px";
        }
    });
}
function addressEvent(){
    var address_input =  document.getElementById("address");
    var address_label = document.getElementById("property-title");

    address_label.innerHTML = address_input.value;

    address_input.onchange = function() {
        //        console.log(address_label.value);
        address_label.innerHTML = address_input.value;
    }
}
function peopleSearchEvent() {
    document.getElementById("get-owner-contact").onclick = function() {
        var link = "http://www.google.com/search?q=";
        var county = document.getElementById("county").value;
        if(county != "") {
            county.split(" ").forEach(function(item) {
                link+=item + "+";
            });
            document.getElementById("get-owner-contact").href = link + "Tax+Assessor";
            document.getElementById("get-owner-contact").target = "_blank";
        }
    }

}


function goButtons() {
    document.getElementById("redfin-go").onclick = function(){
        openLink(document.getElementById("redfin-link").value);
    }

    document.getElementById("repair-eval-go").onclick = function(){
        openLink(document.getElementById("repair-link").value);
    }

    var comp_buttons = document.getElementsByClassName("comp-go");
    Array.prototype.forEach.call(comp_buttons, function(item, index) {
        item.onclick = function(){
            var link = "#";
            Array.prototype.forEach.call(item.parentNode.parentNode.childNodes, function(child_item) {
                if(child_item.tagName == "INPUT") link = child_item.value;
            });
            openLink(link);
        }
    });
}

function openLink(link) {
    if(link != "") {
        console.log(link);

        var prefix = "https://www.";
        prefix = (link.indexOf(prefix) >= 0) ? "": prefix;
        window.open(prefix + link, "_blank");
    }
}

function addContact() {
    //        console.log("contact added.")

    document.getElementById("add-contact-here").appendChild(getContactElement());
}
function addCall() {
    //    console.log("call added.")
    //ADD DIV CONTAINING DATE AND DETAILS OF CONVERSATION
    document.getElementById("add-calls-here").appendChild(getCallElement());
}
function addComp() {
    //        console.log("comp added.")

    document.getElementById("add-comps-here").appendChild(getCompElement());
}

function remove(elm) {
    elm.parentNode.parentNode.remove();
}
function removeContact(button){
    button.parentNode.parentNode.remove();
}

function getCallElement() {
    var elm = document.createElement("div");
    elm.setAttribute("class", "call");

    var spacer = document.createElement("span");
    spacer.setAttribute("class", "call-spacer");


    var date_line = document.createElement("div");
    date_line.setAttribute("class", "detail-input-line");
    date_line.innerHTML = "Date*: ";
    var date = document.createElement("input");
    date.setAttribute("name", "call-date");
    date.setAttribute("type", "date");

    date_line.appendChild(date);

    var notes_area = document.createElement("div");
    notes_area.setAttribute("class", "detail-input-line");
    notes_area.innerHTML = "Notes: ";
    var notes = document.createElement("textarea");
    notes.setAttribute("name", "call-notes");

    notes_area.appendChild(notes);

    var offer_line = document.createElement("div");
    offer_line.setAttribute("class", "detail-input-line");
    offer_line.innerHTML = "Offer: ";
    var offer = document.createElement("input");
    offer.setAttribute("name", "call-offer");
    offer.setAttribute("type", "tel");

    offer_line.appendChild(offer);

    var break_line = document.createElement("br");

    var button_cont = document.createElement("div");
    button_cont.setAttribute("class", "button-cont");

    var button = document.createElement("button");
    button.setAttribute("class", "remove-call-button");
    button.innerHTML = "Remove Call";

    button_cont.appendChild(button);


    elm.appendChild(spacer);
    elm.appendChild(date_line);
    elm.appendChild(notes_area);
    elm.appendChild(offer_line);
    elm.appendChild(break_line);
    elm.appendChild(button_cont);

    document.body.appendChild(elm);

    console.log(elm);
    return elm;
}
function getContactElement() {
    var elm = document.createElement("div");
    elm.setAttribute("class", "detail-input-line");
    elm.innerHTML = "Contact: ";


    //TEXT INPUT
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Phone/Email/etc.";
    elm.appendChild(input);

    //SPAN
    var span = document.createElement("span");
    //BUTTON
    var button = document.createElement("button");
    button.setAttribute("class", "remove-contact-button");
    button.innerHTML = "X";
    span.appendChild(button);
    elm.appendChild(span);


    return elm;
}
function getCompElement(){

    var elm = document.createElement("div");
    elm.setAttribute("class", "comp");

    var spacer = document.createElement("span");
    spacer.setAttribute("class", "call-spacer");


    var address_line = document.createElement("div");
    address_line.setAttribute("class", "detail-input-line");
    address_line.innerHTML = "Address*: ";
    var address = document.createElement("input");
    address.setAttribute("name", "comp-address");
    address.setAttribute("type", "text");

    address_line.appendChild(address);

    var link_line = document.createElement("div");
    link_line.setAttribute("class", "detail-input-line");
    link_line.innerHTML = "Link: ";
    var link = document.createElement("input");
    link.setAttribute("name", "comp-link");
    link.setAttribute("type", "text");
    link_line.appendChild(link);

    var span = document.createElement("span");
    var go_button = document.createElement("button");
    go_button.setAttribute("class", "go-button comp-go");
    go_button.innerHTML = "Go";

    span.appendChild(go_button);
    link_line.appendChild(span);

    var price_line = document.createElement("div");
    price_line.setAttribute("class", "detail-input-line");
    price_line.innerHTML = "Sale Price: ";
    var price = document.createElement("input");
    price.setAttribute("name", "comp-price");
    price.setAttribute("type", "tel");

    price_line.appendChild(price);

    var break_line = document.createElement("br");

    var button_cont = document.createElement("div");
    button_cont.setAttribute("class", "button-cont");

    var button = document.createElement("button");
    button.setAttribute("class", "remove-comp-button");
    button.innerHTML = "Remove Comp";
    button_cont.appendChild(button);


    elm.appendChild(spacer);
    elm.appendChild(address_line);
    elm.appendChild(link_line);
    elm.appendChild(price_line);
    elm.appendChild(break_line);
    elm.appendChild(button_cont);

    document.body.appendChild(elm);

    console.log(elm);
    return elm;
    //REMOVE BUTTON ** only 2 comps
}

//CLEAR PROFILE
function newProfile() {
    document.getElementById("save-button").click();
    window.location.href = "index.html";
}

function saved(){
    return profileSaved;
}
function complete(){
    //    console.log(document.getElementById("investor").value != "");
    //        console.log(document.getElementById("address").value != "");

    return (document.getElementById("investor").value != "" && document.getElementById("address").value != "");
}