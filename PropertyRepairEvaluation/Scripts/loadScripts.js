window.onload = function(){
    addScripts();
}

var scripts = [new Script("../CommonScripts/Repair.js", null),
               new Script("Scripts/loadRepairs.js", null),
               new Script("Scripts/events.js", function() {
                   printEvents();
               }),
               new Script("Scripts/scripts.js", function() {
                   baseEval();
                   checkDetailedEval();}), 
               new Script("Scripts/save.js", function(){saveEntries();})
              ];
//ADD ALL SCRIPTS FROM ARRAY
function addScripts() {
    for(var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script"); 
        script.src = scripts[i].URL;
        script.onload = scripts[i].onload;
        document.head.appendChild(script);
//        console.log(script);
    }
}

//SCRIPT OBJECT
function Script(URL, onload){
    this.URL = URL;
    this.onload = onload;
}