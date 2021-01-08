//LOAD SCRIPS: PROFILE


window.onload = function(){
    addScripts();
}

var path = "Scripts/";
var scripts = [new Script("../../CommonScripts/Tooltip.js", 
                          function() {
    addTooltipStyles(); 
    tooltipEvents("save-button", "save-tooltip", 
                  function() {return !complete()}, 
                  function() {return complete()}, 
                  function() {save();});
    tooltipEvents("new-button", "new-tooltip", 
                  function() {return !saved();}, 
                  function() {return saved();},
                  function() {newProfile()});
    tooltipEvents("dl-button", "dl-tooltip", 
                  function() {return !saved()}, 
                  function() {return saved()}, 
                  function() {downloadpdf();});


}),

               new Script("events.js", function() {allEvents();}), 
               new Script("load.js", function(){ if(isEncoded()) load();}), 
               new Script("save.js", function() {}),
               new Script("download.js", function() {})];
//ADD ALL SCRIPTS FROM ARRAY
function addScripts() {
    for(var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script"); 
        script.src = path + scripts[i].URL; 
        script.onload = scripts[i].onload;

        document.head.appendChild(script);
    }
}

//SCRIPT OBJECT
function Script(URL, onload){
    this.URL = URL;
    this.onload = onload;
}