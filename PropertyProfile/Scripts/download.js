//SET PAGE NAME BASED ON PROPERTY AND VIEWR
//SET FILE NAME 
//DOWNLOAD PDF VERISON


//DOWNLOAD HTML VERSION OF PAGE
function downloadpdf() {
    addLink(redfin_string, "redfin-link", ["redfin-bed", "redfin-bath", "redfin-size", "redfin-year"]);
    
    //TXT FILE TEST - filesaver.js
    var blob = new Blob([getDocumentText()], {type: "text/plain;charset=utf-8"});
    //        saveAs(blob, getFileName() + ".txt");

    //JSPDF
    var pdf = new jsPDF();
    pdf.setFontSize(10);
    pdf.setTextColor(0, 255, 0);
    pdf.textWithLink("[Click Here to Edit]", 15, 10, {url: sessionStorage.getItem("edit-link")});

    pdf.setTextColor(0, 0, 0);
    pdf.text(getDocumentText(), 15, 20);

    //    pdf.save(getFileName());
    console.log("Downloading...");
}
function getFileName(){
    var address = document.getElementById("address").value;
    var investor = document.getElementById("investor").value;
    var state = document.getElementById("progress").value;

    var name = strip(address.toUpperCase()) + "_" + strip(investor.toUpperCase()) + "_" + state;
    return name;    
}
function strip(str) {
    return str.replaceAll(" ", "");
}

//CREATE TEXT STRING TO OUTPUR ONTO DOCUMENT DOWLOAD
var defaultTextString = "";

const detailString = "Property Details: [address]\n\n" + 
      "Investor: [investor]\nState: [progress]\n\nAddress: [address]\nCity: [city]\nState:[state]\nZip Code: [zip]\n" +
      "\n\nOwner Information\nName: [owner-name]\n[contacts]\n" + 
      "\nProperty Evaulation\nDescription: [property-description]\nRepair Cost: [repair-cost]\nReapir Eval Link: [repair-link]\n" + 
      "\n[Redfin]\n"+ 
      "\nStats\nList Price: [redfin-price]\nRedfin Estimate: [redfin-est]\n" + 
      "\n[comps]\n" + 
      "\n[calls]\n" + 
      "\n\n\nLink to Edit (Copy/Paste):";


function addDetails(ret, array){
    array.forEach(function(item) {
        ret = ret.replaceAll("[" + item.id + "]", item.value);
    });
    return ret;
}

function addMultiple(title, array){
    var ret = title + "\n";
    var content = "";

    array.forEach(function(item, index) {
        switch(title.toLowerCase()){
            case "contacts": content+=addContacts(item); break;
            case "calls": content+=addCalls(item, index); break;
            case "comps": content+=addComps(item); break;
        }
        content+= "\n";
    });

    return (content == "undefined" || content == "") ? title + ": "+ "None" : (title == "Contacts") ? content : ret + content ;
}

const contact_string = "Contact: [value]";
function addContacts(item){
    console.log(item);
    return contact_string.replaceAll("[value]", item.value);
}

const call_string = "\nCall [index]\nDate: [date-here]\nNotes:\n [notes-here]\nOffer: [offer-here]";
function addCalls(item, index){
    call_string.replaceAll("[index]", index + 1);
    call_string.replaceAll("[date-here]", item.date);
    call_string.replaceAll("[notes-here]", item.notes);
    call_string.replaceAll("[offer-here]", item.offer);
}

const comp_string = "Address: [address-here]\nLink: [link-here]\nSale Price: [price-here]"
function addComps(item){
    comp_string.replaceAll("[address-here]", item.address);
    comp_string.replaceAll("[link-here]", item.link);
    comp_string.replaceAll("[price-here]", item.price);

}

//redfin, property eval, comps
const redfin_string = ["\nRedfin\nRedfin Link: ", "[redfin-link]", "\nBed(s): [redfin-bed]", "\nBath(s): [redfin-bath]", "\nSquare Feet: [redfin-size]", "\nYear Built: [redfin-year]\n"
                      ];

//addLink(redfin_string, "redfin-link", ["redfin-bed", "redfin-bath", "redfin-size", "redfin-year]);
function addLink(replaceString, linkID, otherText){
    var array = [];

    replaceString.find(function(item) {return item = linkID});
    var link = getSessionDetail(linkID);
    array.push(new Text(link, "link"));

    replaceString.forEach(function (item, index) {
        if(item != linkID) {
            console.log(otherText[index]);
            array.push(new Text(item.replaceAll("[" + otherText[index] + "]", getSessionDetail(otherText[index]))));
        }

    });
    console.log(array);

}

function getSessionDetail(id) {
    return JSON.parse(sessionStorage.getItem("all")).find(o => o.id === id).value;
}
function getDocumentText() {

    //TEXT OBJECT WITH URL - comps, redfin

    var text = detailString;
    console.log(sessionStorage);

    //    var edit_link = sessionStorage.getItem("edit-link");
    //    text = text.replaceAll("[edit-link]", edit_link);

    //REDFIN


    //CALLS
    var calls = JSON.parse(sessionStorage.getItem("calls"));
    text = text.replaceAll("[calls]", addMultiple("Calls", calls));

    //COMPS
    var comps = JSON.parse(sessionStorage.getItem("comps"));
    text = text.replaceAll("[comps]", addMultiple("Comps", comps));

    //CALLS
    var contacts = JSON.parse(sessionStorage.getItem("contacts"));
    text = text.replaceAll("[contacts]", addMultiple("Contacts", contacts));

    var details = JSON.parse(sessionStorage.getItem("all"));
    text = addDetails(text, details);

    return text;
}




function Text(string, type){
    this.string = string;
    this.type = type;
}





