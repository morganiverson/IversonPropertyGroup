window.onload = function(){
    addScripts();
}

var scripts = [new Script("Scripts/Repair.js", null), 
               new Script("Scripts/EVALscripts.js", function() {
                   baseEval();
                   printEvents();
                   checkDetailedEval();
                   document.body.onload = function() {
                   console.log(" count: " + document.getElementById('add_repair_here').childElementCount);}
               })];
//ADD ALL SCRIPTS FROM ARRAY
function addScripts() {
     for(var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script"); 
//        script.src = path + item.URL; 
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