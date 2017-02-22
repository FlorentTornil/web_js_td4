setup();

function afficheVilles(tabVilles) {
    viderVilles(false);
    var div = document.getElementById('myac');
    for(var i=0; i<tabVilles.length; i++) {
        div.innerHTML += "<p>" + tabVilles[i] + "</p>";
    }
}

function viderVilles(cacher) {
    var div = document.getElementById('myac');
    div.innerHTML = "";
    if(cacher) {
        div.style.visibility = "hidden";
    }
    else {
        div.style.visibility = "visible";
    }
}

function myajax(url, callBack, startLoadingAction, endLoadingAction) {
    var httpRequest = new XMLHttpRequest();
    startLoadingAction();
    httpRequest.open("GET", url, true);
    httpRequest.addEventListener("load", function () {
        callBack(httpRequest); endLoadingAction(); });
    httpRequest.send(null);
}

function cityRequest(ville) {
    var url = "http://localhost:8080/web_js_td4-master/cityRequest.php?city=" + ville;
    myajax(url, cityResponse, afficherGif, cacherGif);
}

function cityResponse(httpRequest) {
    var tabRep = JSON.parse(httpRequest.responseText);
    var tabVilles = new Array();
    for(var i=0; i<tabRep.length; i++) {
        tabVilles[i] = tabRep[i].name;
    }
    afficheVilles(tabVilles);
}

function setup() {
    if(document.readyState === "loading") {
        setup();
    }
    else {
        var input = document.getElementById('inpcity');
        input.addEventListener("input", traiterInput);
        var div = document.getElementById('myac');
        div.addEventListener("click",autocomplete);
        var select = document.getElementById("continent");
        select.addEventListener("change",setupPays);
        viderVilles(true);
        setupContinent();
        setupPays();
    }
}

function traiterInput(event) {
    var input = document.getElementById('inpcity');
    if(input.value.length >= 2) {
        cityRequest(input.value);
    }
    else {
        viderVilles(true);
    }
    
}

function autocomplete(event) {
    var p = event.target;
    var input = document.getElementById('inpcity');
    input.value = p.innerText;
    viderVilles(true);
}

function afficherGif() {
    var img = document.getElementById('loading');
    img.style.visibility = "visible";
}

function cacherGif() {
    var img = document.getElementById('loading');
    img.style.visibility = "hidden";
}

function setupContinent() {
    var tabContinents = Object.keys(countries);
    var select = document.getElementById("continent");
    for(var i = 0; i < tabContinents.length; i++) {
        select.innerHTML += "<option>" + tabContinents[i] + "</option>";
    }
}

function setupPays() {
    var selectContinent = document.getElementById("continent");
    var tabPays = Object.values(countries)[selectContinent.selectedIndex];
    var selectPays = document.getElementById("country");
    selectPays.innerHTML = "";
    for(var i = 0; i < tabPays.length; i++) {
        selectPays.innerHTML += "<option>" + tabPays[i] + "</option>";
    }
}

