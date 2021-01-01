window.onload = function(){
    addScripts();
}
var scripts = ["/IversonPropertyGroup/Scripts/Repair.js", "/IversonPropertyGroup/Scripts/PREscripts.js"];

function loadScript(URL, loadEvent){
    var script = document.createElement("script"); 
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

    scripts.forEach(function(item, index) {
        if(index == PREloadEvent.index){
            loadScript(item, PREloadEvent.event)
        }
        else {
            loadScript(item, null);
        }

    });
}