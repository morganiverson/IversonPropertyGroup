var scripts = [new Script("Scripts/Repair.js", null), 
               new Script("Scripts/GENevents.js", function() {
                   interiorSpecs(); areaBoxEvents(); otherBoxEvent(); textAreaEvent(); exteriorEvents();
                                                             })
               , new Script("Scripts/GENscripts.js", function() {
                   tooltipEvents();
                   window.onmessage = function(e) {
                       switch(e.data) {
                           case "hide": hideVerificationPopup();
                       }
                   }
               })];

window.onload = function(){
    addScripts();
}

//ADD ALL SCRIPTS FROM ARRAY
function addScripts() {
    for(var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script"); 
//        script.src = path + scripts[i].URL; 
                script.src = scripts[i].URL;
        script.onload = scripts[i].onload;

        document.head.appendChild(script);
    }
}

//SCRIPT OBJECT
function Script(URL, onload){
    this.URL = URL;
    this.onload = onload;
}
