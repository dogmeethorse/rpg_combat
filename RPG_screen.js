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
		console.log("shaking shakePos =" + game_box.shakePos);
		if (game_box.shakePos >= game_box.shakeStart) {
			game_box.shakePos = game_box.shakeStart - game_box.shakeAmt;
			background.style.marginLeft =  game_box.shakePos +"px";
		}
		else{
			shakePos = shakeStart + (2*shakeAmt);
			background.style.marginLeft = game_box.shakePos  + "px";
			game_box.shakeAmt -= 50*(game_box.shakeAmt/game_box.shakeStart);
		}
		if (game_box.shakeAmt > 2){
			setTimeout(doShake, game_box.shakeAmt);
		}
		else{
			background.style.marginLeft = game_box.shakeStart  + "px";
		}
	}	
	
	doShake();
}
