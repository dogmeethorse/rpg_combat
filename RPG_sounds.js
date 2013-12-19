/* This file contains an object that contains and plays the sound effects.
 */
 
 var sounds = {
 	bigHit    : document.createElement("audio"),
 	regHit    : document.createElement("audio"),
 	smallHit  : document.createElement("audio"),
 	enemyMiss : document.createElement("audio"),
 	heroMiss  : document.createElement("audio"),
 	heroRun   : document.createElement("audio"),
 	
 	numSounds : 6,
 	numLoaded : 0
 }
 
 sounds.loadComplete = function(){
 	if(sounds.numLoaded >= sounds.numSounds){
 		return true;
 	} 
 	else{
 		return false;
 	}
 }
 
 sounds.loaded = function(){
 	console.log("loaded " + this.src);
 	sounds.numLoaded++;
 }
 
 sounds.doLoad = function(){
 	
 	document.body.appendChild(this.bigHit);
 	document.body.appendChild(this.regHit);
 	document.body.appendChild(this.smallHit);
 	document.body.appendChild(this.enemyMiss);
 	document.body.appendChild(this.heroMiss);
 	document.body.appendChild(this.heroRun);
 	
 	this.regHit.addEventListener(    "canplaythrough", sounds.loaded, false);
 	this.bigHit.addEventListener(    "canplaythrough", sounds.loaded, false);
 	this.smallHit.addEventListener(  "canplaythrough", sounds.loaded, false);
 	this.enemyMiss.addEventListener( "canplaythrough", sounds.loaded, false);
 	this.heroMiss.addEventListener(  "canplaythrough", sounds.loaded, false);
 	this.heroRun.addEventListener(   "canplaythrough", sounds.loaded, false);
 	
 	this.heroMiss.addEventListener("ended", handleEnemy, false);
 	
 	
 	this.regHit.src    = "sounds/reg_hit.wav";
 	this.bigHit.src    = "sounds/big_hit.wav";
 	this.smallHit.src  = "sounds/small_hit.wav";
 	this.enemyMiss.src = "sounds/miss2.wav";
 	this.heroMiss.src  = "sounds/miss3.wav";
 	this.heroRun.src   = "sounds/running.wav";
 }
 
 sounds.init = function(){
 	//tests the first audio file to see if audio type is supported before loading all sounds
 	if(this.bigHit.canPlayType("audio/wav") == "probably"||
 	   this.bigHit.canPlayType("audio/wav") == "maybe"){
		sounds.doLoad();
 	}
 	else{
 		alert("This Browser does not support .wav files. There will be no sound.");
 	}
 }