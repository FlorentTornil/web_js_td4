var timeout = setTimeout(function() {}, 0);
var selectedP;

setup();

function afficheVilles(tabVilles) {
    viderVilles(tabVilles.length === 0);
    var div = document.getElementById('myac');
    for(var i=0; i<tabVilles.length; i++) {
        div.innerHTML += "<p id=pVille" + i + ">" + tabVilles[i] + "</p>";
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
    var url = "http://infolimon.iutmontp.univ-montp2.fr/~tornilf/web_js_td4-master/cityRequest.php?city=" + ville;
    myajax(url, cityResponse, afficherGif, cacherGif);
}

function cityResponse(httpRequest) {
    var tabRep = JSON.parse(httpRequest.responseText);
    var tabVilles = new Array();
    for(var i=0; i<tabRep.length; i++) {
        tabVilles.push(tabRep[i].name);
    }
    afficheVilles(tabVilles);
}

function setup() {
    if(document.readyState === "loading") {
        setup();
    }
    else {
        var input = document.getElementById('inpcity');
        input.addEventListener("input", debounce);
        var div = document.getElementById('myac');
        div.addEventListener("click",autocomplete);
        var select = document.getElementById("continent");
        select.addEventListener("change",setupPays);
        document.addEventListener("keydown",traiterToucheClavier);
        viderVilles(true);
        setupContinent();
        setupPays();
    }
}

function traiterInput() {
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
    select.innerHTML = '<option disabled="" selected="">Choisissez un continent</option>';
    for(var i = 0; i < tabContinents.length; i++) {
        select.innerHTML += "<option>" + tabContinents[i] + "</option>";
    }
}

function setupPays() {
    var selectContinent = document.getElementById("continent");
    var tabPays = countries[selectContinent.value];
    var selectPays = document.getElementById("country");
		selectPays.innerHTML = '<option disabled="" selected="">Choisissez un pays</option>';
    if(!(tabPays === undefined)) {
		for(var i = 0; i < tabPays.length; i++) {
			selectPays.innerHTML += "<option>" + tabPays[i] + "</option>";
		}
	}
}

function debounce() {
	clearTimeout(timeout);
	timeout = setTimeout(traiterInput, 1000);
}

function traiterToucheClavier(event) {
	var codeTouche = event.keyCode;
	var div = document.getElementById('myac');
	if(div.innerHTML.length>0) {
		if(codeTouche === 38) {
			if(selectedP === undefined || selectedP === 0) {
				selectedP = 1;
			}
			var pAncien = document.getElementById('pVille' + selectedP);
			pAncien.style.backgroundColor = "";
			selectedP --;
			var pNouveau = document.getElementById('pVille' + selectedP);
			pNouveau.style.backgroundColor = "aliceblue";
		}
		if(codeTouche === 40) {
			if(selectedP === undefined) {
				selectedP = -1;
			}
			if(selectedP === 4) {
				selectedP --;
			}
			if(selectedP>=0) {
				var pAncien = document.getElementById('pVille' + selectedP);
				pAncien.style.backgroundColor = "";
			}
			selectedP ++;
			var pNouveau = document.getElementById('pVille' + selectedP);
			pNouveau.style.backgroundColor = "aliceblue";	
		}
		if(codeTouche === 13) {
			if(!(selectedP === undefined)) {
				var p = document.getElementById('pVille' + selectedP);
				var input = document.getElementById("inpcity");
				input.value = p.innerHTML;
				viderVilles(true);
			}
		}
	}
}
