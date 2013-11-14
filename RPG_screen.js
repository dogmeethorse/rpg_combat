/*
 * functions and objects for drawing things and visual effects.
 */

var fightArea = {};

fightArea.img = new Image();
fightArea.img.src = "fight_background.png";

fightArea.draw = function(){
	d_ctx.drawImage(fightArea.img, -10,-10, 420, 420);
}



function shakeGame(){
	var moveLeftX = '5px';
	var moveRightX = '-5px';
	background.setAttrubute();
}