function download(){
    saveEntries(true);
    addTotals();
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
