//LINK TO REVISIT
//ADD CONTETE TO PDF 
function downloadpdf(){
    saveEntries(true);

    var pdf = new jsPDF();
    pdf.setProperties({
        title: getFileName()
    });

    pdf.setFontSize(15);
    pdf.text("Repair Cost Evaluation: " + document.getElementById("address").value, 15, 20);
    pdf.setFontSize(10);
     pdf.textWithLink("[Click Here to Edit]", 15, 30, {url: sessionStorage.getItem("edit-link")});
    getDocumentText(pdf);

    //    pdf.text(getDocumentText(), 10, 30);

    //TITLE
       
    //    pdf.save(getFileName());
//    openInNewWindow(pdf);
}


var download_txt = "Repair Cost Evalutaion: [address]\n\n" + 
    "Link To Edit (Copy/Paste): [link]" + 
    "Investor(s): [investir]\nAddress: [address]\nCity: [city]\nState: [state]\nZip Code: [zip]\n" + 
    "\nDate: [date]\nShowing: [showing]\nContact: [contact]\n" + 
    "\nRepair Cost: $[repair-cost]";



function getDocumentText(pdf){
    var textArray = [];

    var line_index = 0;
    var line_height = 5;
    var x = 15;
    var y = 40;
    var ypos = y;

    var details = document.getElementsByClassName("property-details");
    var detail, input;
    Array.prototype.forEach.call(details, function (item){
        detail = item.parentNode.childNodes[0].textContent;
        input = item.value;

        ypos+= line_height;

        pdf.text(detail + " " + input, x, ypos);
        line_index++;
        pageCheck(x, ypos, pdf);

    });

    ypos+=line_height * 3;
    var previous_text_height = 0;

    Array.prototype.forEach.call(document.getElementsByClassName("divTableRow"), function (item) {
        var repair_title = item.childNodes[1].textContent; //REPAIR
        var repair_notes = item.childNodes[1].childNodes[1].childNodes[0].value; //NOTES
        var repair_cost = item.childNodes[11].childNodes[1].innerHTML; 
        repair_cost = (repair_cost == "$") ? "-" : repair_cost;

        var text = pdf.splitTextToSize(repair_title + ": " + repair_cost + "\nNotes: " + repair_notes + "\n");
        pdf.text(text, x, ypos);

        previous_text_height = pdf.getTextDimensions(text).h;
        ypos+= previous_text_height;

        if(pageCheck(x, ypos, pdf)) ypos = y;

    });

    ypos+=line_height * 2;
    pdf.text("Repair Cost: " + document.getElementById("detail-pane-repair-cost").value, x, ypos);


    //PRINT REPAIR TOTLA AGAIN
}

function getFileName() {
    return document.getElementById("address").value.replace(/\s/g, "").toLowerCase() + "_RepairEval";
}

function pageCheck(x, y, pdf){
    if(y >= pdf.internal.pageSize.height - 20){
        pdf.addPage();
        return true;
    }
}

