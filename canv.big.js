/*CANVjs (C) 2021.*/
/*gprov = gets provided, what are the arguments, etc.*/
var c,ctx,setup,draw,tempx,gsize,px,py;
var n=0;var famt=0;
function iAddEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}

class col {
	constructor(r,g,b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	toStr() {
		return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
	}
}
function curCNV(w,h,fps) { // create canvas, gprov width,height
	c = document.createElement("canvas"); // create canv
	c.width = w;c.height = h; // init width and height
	ctx = c.getContext("2d");
	document.body.appendChild(c); // add to body
}
function rect(x,y,w,h,col) { // create rectangle, gprov x,y,width,height,color
	try {
		t = ctx.fillStyle; // set temp color to revert
	} catch {
		t = "white"; // fall back to white if needed
	}
	ctx.fillStyle = col.toStr(); // set color
	ctx.fillRect(x,y,w,h); // create rect 
	ctx.fillStyle = t; // revert to temp
}
function strk(col,w) {
	ctx.strokeStyle = col.toStr();
	ctx.lineWidth = w;
}
function fill(col) {
	ctx.fillStyle = col.toStr();
}
function fnt(size, font) {
	ctx.font = size + " " + font;
	gsize = size;
}
function iStrkIfNotDef() {
	ctx.strokeStyle = ctx.fillStyle;
	ctx.lineWidth = 0;
}
function circle(x,y,rad,col) {
  	ctx.beginPath();
 	try {
		t = ctx.fillStyle; // set temp color to revert
	} catch {
		t = "white"; // fall back to white if needed
  	}
  	ctx.fillStyle = col.toStr(); // set color
  	ctx.arc(x,y, rad, 0,2*Math.PI, false); // create circle
  	ctx.fillStyle = col.toStr(); // fill circle
  	ctx.fill(); // fill circle
 	ctx.fillStyle = t; // revert to temp
	try {
		ctx.stroke();
	} catch(e) {
		console.log(e);
		iStrkIfNotDef();
	}
}
function cls() {
	rect(0,0,window.innerWidth,window.innerHeight, new col(255,255,255));
}
function text(x,y,text) {  // puts text, gprov x,y,textdata
	ctx.fillText(text,x,y);
}
function cWASD(gainAmt,log) { // gets movement_amt, to_log_or_not_to_log
	evtKeydown((kc) => {
		kc = kc.which; // get keycode
		if(kc == 87) {// w
			py-=gainAmt;
		} else if(kc == 65) { // a
			px-=gainAmt;
		} else if(kc == 68) { // d
			px+=gainAmt;
		} else if(kc == 83) { // s
			py+=gainAmt;
		}
		if(log) { // if log x and y coords == true
			console.log("x="+px+",y="+py)
		}
	})
}
function cWASDup(gainAmt,log) { // gets movement_amt, to_log_or_not_to_log
	evtKeyup((kc) => {
		kc = kc.which; // get keycode
		if(kc == 87) {// w
			py-=parseFloat((gainAmt).toPrecision(2));
		} else if(kc == 65) { // a
			px-=parseFloat((gainAmt).toPrecision(2));
		} else if(kc == 68) { // d
			px+=parseFloat((gainAmt).toPrecision(2));
		} else if(kc == 83) { // s
			py+=parseFloat((gainAmt).toPrecision(2));
		}
		if(log) { // if log x and y coords == true
			console.log("x="+px+",y="+py)
		}
	})
}
function iAddJump() {
	py-=(gs*0.2);
}
function cText(x,y) {
	tempx=x;
	evtKeydown((kc) => {
		kc = kc.which;
		text(tempx,y,ecbGetKey(kc));
		n++;
		if(n == 1) {
			tempx=parseInt(tempx.toString().replace("px", "").replace("pt", ""));
		} else {
			tempx=parseInt(tempx.toString().replace("px", "").replace("pt", ""))+parseInt(gsize.replace("px", "").replace("pt", ""));
		}
		console.log(String.fromCharCode(kc));
	})
}
function ecbGetKey(kc) {
	if (kc == 46 || kc == 8) {
		return "del";
	}
	return String.fromCharCode(kc);
}
function evtKeydown(func) {
	iAddEvent(window, "keydown", func);
}
function evtKeyup(func) {
	iAddEvent(window, "keyup", func);
}
function bg(col) { // background color, gprov color
	rect(0,0,c.width,c.height, col);
}
function rndCol() {
	return new col(Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256));
}
function run(obj,fps) {
	obj.setup();
	window.setInterval(()=>{
		obj.draw();
	}, 1000/fps);
}
