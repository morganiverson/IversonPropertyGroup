//SET PAGE NAME BASED ON PROPERTY AND VIEWR
//SET FILE NAME 
//DOWNLOAD PDF VERISON

window.onload = function(){
//    saveComps();
//    if(isEncoded()){
//        decodeURL();
//    }
//    else {
//        //    console.log()
//        encode("contacts");
//    }
}




function decodeURL(){
    var link = window.location.href;
    var detailencoding = link.substring(link.indexOf("?PP?") + 4, link.indexOf("?CL?"));

    //CALLS
    var calls = link.substring(link.indexOf("?CL?") + 4, link.indexOf("?CT?"));
    var contacts = link.substring(link.indexOf("?CT?") + 4);//, link.indexOf("?CP?"));
    var comps = link.substring(link.indexOf("?CP?") + 4);


        loadCalls(calls);
    loadContacts(contacts);
}







function save(){
    var Inputs = document.getElementsByClassName("detail");
}

