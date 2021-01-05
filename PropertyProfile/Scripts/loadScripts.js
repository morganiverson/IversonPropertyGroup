window.onload = function(){
    addScripts();
}

var path = "https://mwiv.github.io/IversonPropertyGroup/PropertyProfile/Scripts/";
var scripts = [new Script("events.js", function() {allEvents();}), 
               new Script("load.js", function(){ if(isEncoded()) load();}), 
               new Script("save.js", function() {save();}),
              new Script("download.js", function() {
                  downloadpdf();
              })];
//ADD ALL SCRIPTS FROM ARRAY
function addScripts() {
    for(var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script"); 
        script.src = path + scripts[i].URL; 
        //        script.src = scripts[i].URL;
        script.onload = scripts[i].onload;

        document.head.appendChild(script);
    }

}

//SCRIPT OBJECT
function Script(URL, onload){
    this.URL = URL;
    this.onload = onload;
}