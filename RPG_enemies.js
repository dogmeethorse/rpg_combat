/*
 * List of Enemies
 * Order of stats:
 * name,hp,dmg,aggro,atk,esc
 */

const NUM_ENEMIES = 9;

var enemy_pics = new Array(NUM_ENEMIES);
var enemies = new Array(NUM_ENEMIES);

function loadImage(imName){
	//imName must end in .png
	var im = new Image
	im.src="dusk_enemies/"+ imName;
	return im;
}

function loadEnemyPics(){
	//loads into img array
	console.log('loading images');
	enemy_pics[0] = loadImage('bone_shield.png');
	enemy_pics[1] = loadImage('death_speaker.png');
	enemy_pics[2] = loadImage('druid.png');
	enemy_pics[3] = loadImage('imp.png');
	enemy_pics[4] = loadImage('mimic.png');
	enemy_pics[5] = loadImage('shadow_soul.png');
	enemy_pics[6] = loadImage('shadow_tendrils.png');
	enemy_pics[7] = loadImage('skeleton.png');
	enemy_pics[8] = loadImage('zombie.png');
}

function  fillEnemyArray(){
	enemies[0] = new Enemy(0,'These are Supposed to be Bones', 11,1,0,20,0);
	enemies[1] = new Enemy(1,'Mean Lady', 25,10,0,30,0);
	enemies[2] = new Enemy(2,'Robed Jerk', 10,1,0,20,0);
	enemies[3] = new Enemy(3,'Imp', 4,1,0,20,0); 
	enemies[4] = new Enemy(4,'Angry Chest', 8,1,0,20,0);
	enemies[5] = new Enemy(5,'Scary Shadow', 7,1,0,20,0);
	enemies[6] = new Enemy(6,'Gross Thing', 6,1,0,20,0);
	enemies[7] = new Enemy(7,'Skeleton',3,1,0,50,20);
	enemies[8] = new Enemy(8,'Zombie', 5,1,0,20,0);
}