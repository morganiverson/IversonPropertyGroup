window.onload = function(){
    addScripts();
}

var scripts = ["/Scripts/Repair.js", "/Scripts/PREscripts.js"];
var path = "/IversonPropertyGroup";
function loadScript(URL, loadEvent){
    var script = document.createElement("script"); 
//    script.src = path + URL;
    script.src = URL; 
    
    document.head.appendChild(script);
    script.onload = loadEvent;

    console.log(script);
}

function addScripts(){
    var PREloadEvent = {"index": 1, "event": function() {
        baseEval();
//        console.log("onload");
    }};

    for(var i = 0; i < scripts.length; i++) {
        if(i == PREloadEvent.index){
            loadScript(scripts[i], PREloadEvent.event)
        }
        else {
            loadScript(scripts[i], null);
        }

    }
}