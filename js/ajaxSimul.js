var fini1 = false;
var fini2 = false;
var fini3 = false;

function ajaxCallSimulated(message,duration,callBack){
    console.log("Init : " + message);
    // The callback will be executed after 'duration' milliseconds
    setTimeout(function(){
        if(callBack !== undefined) {
			callBack(message, duration);
		}
	},duration);
};

ajaxCallSimulated("1", 40, callBack1);
ajaxCallSimulated("2", 30, callBack2);
ajaxCallSimulated("3", 20, callBack3);
ajaxCallSimulated("4", 10, callBack4);

function callBack1(message, duration){
	console.log("Done : " + message);
	fini1 = true;
}

function callBack2(message, duration){
	if(!fini1) {
		setTimeout(function(){
			callBack2(message, duration)}
			, duration);
	}
	else {
		console.log("Done : " + message);
		fini2 = true;
	}
}

function callBack3(message, duration){
	if(!fini2) {
		setTimeout(function(){
			callBack3(message, duration)}
			, duration);
	}
	else {
		console.log("Done : " + message);
		fini3 = true;
	}
}

function callBack4(message, duration){
	if(!fini3) {
		setTimeout(function(){
			callBack4(message, duration)}
			, duration);
	}
	else {
		console.log("Done : " + message);
	}
}









