/*
 * functions and objects for drawing things and visual effects.
 */
var game_box = {}

var fightArea = {};

fightArea.img = new Image();
fightArea.img.src = "fight_background.png";

fightArea.draw = function(){
	d_ctx.drawImage(fightArea.img, -10,-10, 420, 420);
}

fightArea.flash = function(){

}

game_box.shake = function(){
	game_box.shakeStart = 0;
	game_box.shakePos = 0;
 	game_box.counter = 0;
 	game_box.margin = 0;
	game_box.increment = 1;
	game_box.shakeAmt = 50;
	
	function doShake(){
		if (game_box.shakePos >= game_box.shakeStart) {
			game_box.shakePos = game_box.shakeStart - game_box.shakeAmt;
			background.style.marginLeft =  game_box.shakePos +"px";
		}
		else{
			game_box.shakePos = game_box.shakeStart + (2 * game_box.shakeAmt);
			background.style.marginLeft = game_box.shakePos  + "px";
			game_box.shakeAmt -= 50 * (game_box.shakeAmt/200);
		}
		if (Math.abs(game_box.shakeAmt) > 2){
			setTimeout(doShake, Math.abs(game_box.shakeAmt));
		}
		else{
			background.style.marginLeft = game_box.shakeStart  + "px";
			buttonsOn(true,true,false,true);
		}
	}	
	buttonsOff(true,true,true,true);
	doShake();
}

function buttonsOff(fight,item,shop,run){
	if(fight) fightButton.disabled = true;
	if(item)  itemButton.disabled  = true;
	if(shop)  shopButton.disabled  = true;
	if(run)   runButton.disabled   = true;
}

function buttonsOn(fight,item,shop,run){
	if(fight) fightButton.disabled = false;
	if(item)  itemButton.disabled  = false;
	if(shop)  shopButton.disabled  = false;
	if(run)   runButton.disabled   = false;
}