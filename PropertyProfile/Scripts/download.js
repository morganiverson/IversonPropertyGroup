//SET PAGE NAME BASED ON PROPERTY AND VIEWR
//SET FILE NAME 
//DOWNLOAD PDF VERISON


//DOWNLOAD HTML VERSION OF PAGE
function downloadpdf(url) {
    //    var d = new jsPDF();
    //    d.autoPrint();
    var link = document.createElement('a');
    //FIGURE OUT HOW TO MAKE THIS LINK AN PDF TYPE --->>>
    link.href = document.getElementById("encoded-edit-link").href;
    link.target = "_blank";
    link.download = getFileName() + ".html";
    console.log(link);
    link.dispatchEvent(new MouseEvent('click'));
    console.log("Downloading...");
}
function getFileName(){
    var address = document.getElementById("address").value;
    var investor = document.getElementById("investor").value;
    var state = document.getElementById("state").value;

    var name = strip(address.toUpperCase()) + "_" + strip(investor.toUpperCase()) + "_" + state;
    return name;    
}
function strip(str) {
    return str.replaceAll(" ", "");
}