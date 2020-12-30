function calcMAO(DP, ARV, RC){
    var IP = (ARV * .7) - RC; //INVERSOR PRICE

    var MAO = IP - DP; //MAXIMUM ALLOWABLE OFFER
    
    return {IP, MAO};
}



function fillTable(){
    var step = document.getElementById("step").value;
    
     var CELLKEYS = ["MIN2", "MIN15", "MIN1", "MIN5", "GIV", "PLU5", "PLU1", "PLU15", "PLU2"];
    
     var ARV = parseFloat(document.getElementById("ARV").value);
    var RC = parseFloat(document.getElementById("RC").value);
    var DP = parseFloat(document.getElementById("DP").value);
    
    //FILL DP, IP, MAO
    CELLKEYS.forEach(function fill(item, index) {
       console.log(item);
        var offset = 0;
        //SET OFFSET FROM GIVEN DP
        switch(true) {
            case item.indexOf("2") >= 0: offset = 4 * step; break;
                case item.indexOf("15") >= 0: offset = 3 * step; break;
                case item.indexOf("1") >= 0: offset = 2 * step; break;
                case item.indexOf("5") >= 0: offset = 1 * step; break;
        }
                
        //MIN NEGATIVE PLUS POSITIVE
        offset = (item.indexOf("MIN") >= 0) ? offset * -1 : offset;
                
        var DPOUT = document.getElementById(item + "DP");
        var IPOUT = document.getElementById(item + "IP");
        var MAOOUT = document.getElementById(item + "MAO");
    
        var output = calcMAO(DP + offset, ARV, RC);
        console.log(output);
        
        document.getElementById(item + "DP").innerHTML = "$" + (DP + offset);
        IPOUT.innerHTML = "$" + output["IP"];
        MAOOUT.innerHTML = "$" + output["MAO"];
        
   });
    
   //FILL RC, ARV
    var RCOUTS = document.getElementsByClassName("GIVRC");
    
    for(var i = 0; i < RCOUTS.length; i++) {
        RCOUTS[i].innerHTML = "$" + RC;
    };
    
    var ARVOUTS = document.getElementsByClassName("GIVARV");
    
    for(var i = 0; i < ARVOUTS.length; i++) {
        ARVOUTS[i].innerHTML = "$" + ARV;
    };
    
    
    
}
