window.onload = function(){
    addScripts();
}

var scripts = [new Script("../CommonScripts/Repair.js", null),
               new Script("Scripts/loadRepairs.js", null),
               new Script("Scripts/events.js", null),
               new Script("Scripts/scripts.js", function() {
                   baseEval();
                   checkDetailedEval();
               }), 
               new Script("Scripts/save.js", function(){}), 
               new Script("Scripts/download.js", function() {
               }), 
               new Script("../CommonScripts/Tooltip.js", 
                          function() {
                   addTooltipStyles(); 
                   tooltipEvents("print-button", "print-tooltip",       
                                 function() {return !evalComplete()}, 
                                 function() {return evalComplete()}, 
                                 function() {saveEntries(); window.print();});

                   tooltipEvents("save-button", "save-tooltip",
                                 function() {return !evalComplete()},
                                 function() {return evalComplete();}, 
                                 function() {saveEntries(false);
                                             alert("Sucess! A link to revisit and edit this form has been added to your clipboard. Paste it somewhere safe!");}
                                );
                   tooltipEvents("dl-button", "dl-tooltip",
                                 function() {return !evalComplete()},
                                 function() {return evalComplete();}, 
                                 function() {downloadpdf();
                                             }
                                );
               })
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