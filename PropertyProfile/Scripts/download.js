//SET PAGE NAME BASED ON PROPERTY AND VIEWR
//SET FILE NAME 
//DOWNLOAD PDF VERISON


//DOWNLOAD HTML VERSION OF PAGE
function downloadpdf() {

    //    //JSPDF
    var pdf = new jsPDF();
    //    pdf.setFont
    text2PDF(pdf);
    pdf.save(getFileName());
    //    console.log("Downloading...");
}
function getFileName(){
    var address = document.getElementById("address").value;
    var investor = document.getElementById("investor").value;
    var state = document.getElementById("progress").value;

    var name = strip(address.toLowerCase()) + "_" + strip(investor.toLowerCase()) + "_" + state;
    return name;    
}
function strip(str) {
    return str.replaceAll(" ", "");
}

//CREATE TEXT STRING TO OUTPUR ONTO DOCUMENT DOWLOAD
var detailTextArray = ["Property Details: ", "[address]","\n\n",
                       "Investor: ", "[investor]", 
                       "State: ", "[progress]", 
                       "Address: ", "[address]", 
                       "City: ", "[city]", 
                       "County: ", "[county]", 
                       "State: ", "[state]", 
                       "Zip Code: ", "[zip]", "\n\n",
                       "Owner Information", 
                       "Name: ", "[owner-name]\n", 
                       "[Contacts]\n", "\n", "\n", 
                       "Property Evaluation", 
                       "Description: ", "[property-description]", 
                       "Repair Cost: ", "[repair-cost]", 
                       "Repair Eval Link: ", "[repair-link]", "\n", "\n",
                       "Redfin", 
                       "Redfin Link: ", "[redfin-link]",
                       "Bed(s): ", "[redfin-bed]", 
                       "Bath(s): ", "[redfin-bath]", 
                       "Square Feet: ", "[redfin-size]", 
                       "Year Built: ", "[redfin-year]", "\n", "\n", 
                       "Stats", 
                       "Redfin Estimate: ", "[redfin-est]", 
                       "[Comps]", "\n", 
                       "[Calls]",  "\n", 
                       "[Edit]"
                      ];
var compTextArray = ["Address: ", "[address]\n", 
                     "Link: ", "[link]\n", 
                     "Sale Price: ", "[price]"];
var callTextArray = ["Date: ", "[date]", 
                     "Notes: ", "[notes]", 
                     "Offer: ", "[offer]"];
var contactTextArray = ["Contact: ", "[value]"];

function fillText() {
    var textArray = [];
    detailTextArray.forEach(function(item) {
        if(item.indexOf("]") >= 0 && item.indexOf("[") >= 0){
            //            console.log("DATA ENTRY: " + item);
            //DATA ENTRY
            if(item.indexOf("link") >= 0) {
                //                console.log("LINK: " + item);
                var url = getSessionDetail(stripBrackets(item), "all");
                //IS LINK
                textArray.push(new Text(url + "\n", true, url));
            }
            else{
                //                console.log("NOT LINK: " + item);
                switch(stripBrackets(item)) {
                    case "Comps": textArray.push.apply(textArray, getMultiple("comps", compTextArray, "Comps\n")); break;
                    case "Contacts":     textArray.push.apply(textArray, getMultiple("contacts", contactTextArray, "Contacts"));
                        break;
                    case "Calls": textArray.push.apply(textArray, getMultiple("calls", callTextArray, "Calls\n")); 
                        break;

                    case "Edit": textArray.push(new Text("Click Here To Edit", true, sessionStorage.getItem("edit-link")));
                        break;
                    default: textArray.push(new Text(getSessionDetail(stripBrackets(item), "all") + "\n", false, null));
                }
            }
        }
        else{
            textArray.push(new Text(item, false, null));
        }
    });
    console.log(textArray);
    return textArray;
}

//FILL DATA ENTRIES OF ITEMS WITH REPITITTION
function getMultiple(sessionID, emptyTextArray, Title){
    var textArray = [new Text(Title, false)];

    //    console.log(JSON.parse(sessionStorage.getItem(sessionID)));
    JSON.parse(sessionStorage.getItem(sessionID)).forEach(function(item) {
        //                console.log(/**/item);
        emptyTextArray.forEach(function(text_item) {
            if(text_item.indexOf("[") >= 0 && text_item.indexOf("]") >= 0 ){
                if(text_item.indexOf("link") >= 0){
                    //                                        console.log(text_item);
                    var url = item[stripBrackets(text_item)];
                    textArray.push(new Text(url + "\n", true, url));
                }
                else {
                    textArray.push(new Text(item[stripBrackets(text_item)] + "\n", false, null))
                }
            }
            else {
                textArray.push(new Text(text_item, false, null))
            }

        });


    });
    //    console.log(textArray);
    return textArray;
}

//REMOVE BRACKETS AND NEW LINE CHAR
function stripBrackets(str){
    return str.replace(/[\[\]\n]/g, "");
}             

//RETURN THE VALUE OF A SESSION ARRAY DETAILS
function getSessionDetail(findID, array) {
    //        console.log("\"" + findID + "\"" );
    return JSON.parse(sessionStorage.getItem(array)).find(o => o.id === findID).value;
}

//TEXT OBJECT
function Text(string, isLink, url){
    this.string = string;
    this.isLink = isLink;
    this.url = url;
}

function text2PDF(pdf){
    var length = 0;
    pdf.setFontSize(10);
    pdf.setFont("Helvetica");
    //    pdf.setTextColor(0, 255, 0);


    var textArray = fillText();
    var base_left = 15;
    var base_top = 20;
    var line_height = 5;
    var y = base_left;
    var x = base_left;


    textArray.forEach(function(item, index) {
        if(item.isLink) {

            if(item.string == "Click Here To Edit"){
                //RECTANGLE CONTAINER

                //LINK STYLES
                 pdf.setTextColor(47, 182, 78).setFont("Helvetica", "bold");
//                console.log(pdf.getTextColor());
                
                pdf.textWithLink(item.string, y, x, {url: item.url});
            }
            else {
                 pdf.setTextColor(47, 182, 78).setFont("Helvetica", "bold");
//                console.log(pdf.getTextColor());
                pdf.textWithLink(item.string, y, x, {url: item.url});
            }
        }
        else{
            pdf.setTextColor(0, 0, 0);
            pdf.setFont("Helvetica");
            pdf.setFontSize( (index == 0 || index == 1) ? 15 : 10);
            pdf.setFontStyle( (index == 1) ? "italic" : "normal");
            
            pdf.text(item.string, y, x);

            //LINK PLACEMENT SETTINGS
            if(item.string.indexOf(":") >= 0){
                y = base_left + pdf.getTextWidth((item.string));
                //TOP NO CHNAGE
            }
            else {
                y = base_left;
                x = x + line_height;
            }
        }

        if(y >= pdf.internal.pageSize.height - 20){
            x = base_top;
            pdf.addPage();
        }
    });

    //    console.log(pdf.output());
}


function getValue(str) {
    return (str == "\n") ? "---" : str;
}

//underline 
//const textWidth = doc.getTextWidth(text);
//doc.line(x, y, x + textWidth, y)
//doc.setFontType("bold");
