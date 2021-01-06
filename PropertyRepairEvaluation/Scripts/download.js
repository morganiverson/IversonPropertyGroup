//LINK TO REVISIT
//ADD CONTETE TO PDF 
function download(){
//    saveEntries(true);
//    addTotals();
    
    var pdf = new jsPDF();
    pdf.setFont("sans-serif");
    pdf.setFontSize(10);
    pdf.text(getDocumentText(), 15, 20);
    pdf.setTextColor(0, 255, 0);
    pdf.textWithLink("[Click Here to Edit]", 15, 10, {url: sessionStorage.getItem("edit-link")});
//    pdf.save(getFileName());
//        console.log("Downloading...");
}

var download_txt = "Repair Cost Evalutaion: [address]\n\n" + 
    "Link To Edit (Copy/Paste): [link]" + 
    "Investor(s): [inversor]\nAddress: [address]\nCity: [city]\nState: [state]\nZip Code: [zip]\n" + 
    "\nDate: [date]\nShowing: [showing]\nContact: [contact]\n" + 
    "\nRepair Cost: $[repair-cost]";
function addTotals(){
    var array = [];
    var rows = document.getElementsByClassName("divTableRow");
}
