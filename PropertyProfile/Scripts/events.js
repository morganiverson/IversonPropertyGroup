

function allEvents(){
    saveButton();
    contactEvents();
    compEvents();
    callEvents();
    textAreaEvent();
    addressEvent();
    goButtons();
    peopleSearchEvent();
}

function saveButton() {
    document.getElementById("save-button").onclick = function(){
        save();
        //        downloadpdf(save());
    }
}
function contactEvents(){
    //ADD CONTACT 
    document.getElementById("add-contact-button").onclick = function() {
        console.log("add Contact");
        document.getElementById("add-contact-here").innerHTML+= contact_html;
        contactEvents();
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
        document.getElementById("add-comps-here").innerHTML+= comp_html;
        document.getElementById("add-comp-button").style.display = "none";
        compEvents();
        goButtons();

    }
    Array.prototype.forEach.call(document.getElementsByClassName("remove-comp-button"), function(item, index) {
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
        console.log(address_label.value);
        address_label.innerHTML = address_label.value;
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
    document.getElementById("add-contact-here").innerHTML+= contact_html;

}
function addCall() {
    //ADD DIV CONTAINING DATE AND DETAILS OF CONVERSATION
    document.getElementById("add-calls-here").innerHTML+= call_html;
}
function remove(elm) {
    elm.parentNode.parentNode.remove();
}
function removeContact(button){
    button.parentNode.parentNode.remove();
}




var call_html = "<div class = 'call'><span class = 'call-spacer'></span> <div class = 'detail-input-line'>Date*: <input id = 'call-date' type= 'date'></div> <div class = 'detail-input-line'>Notes: <textarea name = 'call-notes'></textarea></div> <div class = 'detail-input-line'>Offer: <input name = 'call-offer' type= 'tel' ></div> <br> <div class = 'button-cont'> <button class = 'remove-call-button'> Remove Call</button></div> </div>";

var contact_html = "<div class = 'detail-input-line'>Contact: <input  type= 'text' placeholder = 'Phone/Email/etc.'> <span><button class = 'remove-contact-button'>X</button></span> </div>";

var comp_html = "<div class = 'comp'> <span class = 'call-spacer'></span> <div class = 'detail-input-line'>Address: <input name = 'comp-address' type= 'text'></div> <div class = 'detail-input-line'>Link: <input name = 'comp-link' type= 'text' ></div> <div class = 'detail-input-line'>Sale Price: <input name = 'comp-price' type= 'text' ></div> <br> <div class = 'button-cont'> <button class = 'remove-comp-button'> Remove Comp</button></span> </div>";
function addComp(){
    //ADD DIV
    //REMOVE BUTTON ** only 2 comps
}

//CLEAR PROFILE

//