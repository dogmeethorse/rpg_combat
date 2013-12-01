/*
 * All images created by Chris Bellinger for his Open Source Game Heroine Dusk.
 * We now have a current enemy and have created a slime enemy
 * the next step is to make it so that the message box sends the user input so that we can test to see if the 
 * program is functioning properly so that we can debug.
 * Now I added some sample dialog and a name prop to enemy.
 * GET ATTACKS WORKING THEN ADD GAME STATES. <---- Done.
 *
 *
 * Run works and fight works. Now adding items. should create itemMenu. and then have functions 
 * that update it  open it and close it.
 * right now item menu won't close after second time you open it.
 ****************************************************************************************************
 * All buttons now work to some extent.
 * now
 1. Add intro screen
 2. Make it so you can buy weapons.  <----- DONE!
 3. add screen effects during combat <------Shaking implemented. Now need to do screen flashing.
 4. max hp so potions can't take you over your max hp
 5. make it so you increase in level and grow stronger <-----You can level up now.
 6. make it so you can die.
 7. make it so game is an object? <---- meh.
 8. sound with proper loader.
 9. Have to change enemy turn to start as an event so it doesn't overlap; with hero turn. or some other solution. <--- DONE!
 */

const BEGIN    = 10;
const ENDGAME  =  0;
const COMBAT   = 20;
const TREASURE = 30;

var state = BEGIN;

var dragon_screen = document.getElementById('game_screen');
var d_ctx = dragon_screen.getContext('2d');

var background = document.getElementById('background');
var outputElement = document.getElementById('output');
var statOutputEl = document.getElementById('stats');
var messageEl = document.getElementById('message_box');

var fightButton= document.getElementById('fight');
var shopButton = document.getElementById('shop');
var itemButton = document.getElementById('item');
var runButton = document.getElementById('run');

var current_enemy = null;

function randomInt(min,max){
            return Math.floor(Math.random() * (max - (min-1) )) + min;
        }
     
function sendMessage(output,addOrReplace){
	//pause(1000);
   	if(addOrReplace == true){ 		
       	messageEl.innerHTML = '<span class="game">' + output + '</span>';
    }
   	else{
        messageEl.innerHTML += '<br> <span class="game"> ' + output + '</span>';
    }
}

function setStats(){
	statOutputEl.innerHTML = "<p class='game'> HP: " + hero.hp +"<br>XP: " + hero.xp + "<br> LVL: " + hero.lvl+ "<br> GLD: " + hero.gld + "</p>";
}

function initCombat(){
	console.log('init COMBAT');
	shopButton.disabled= true;
	current_enemy = enemies[randomInt(0,8)];
	state = COMBAT;
	fightArea.draw();
	current_enemy.greeting();
	current_enemy.draw();
	console.log("enemy hp = " + current_enemy.hp);

}

function endCombat(how){
	//how is a string that says how combat ended
	console.log('ending combat');
	current_enemy.die();
	console.log("killing enemy hp reset to " + current_enemy.hp);
	d_ctx.clearRect(0,0,400,400);
	fightArea.draw();
	state = TREASURE;
	if(how =='victory'){
		handleTreasure('dead enemy');
		console.log('checking hero level.');
		hero.checkLevel();
	}
	sendMessage("Press 'fight' button to fight another monster.", false);
}
	
function Game_Entity(hp,dmg){
        this.maxDmg = dmg;
        this.minDmg = 1;
        this.hp = hp;
        this.atkChance = 50;
        this.alive = true;
        this.escChance = 50;
        
        Game_Entity.prototype.attack = function(target){
                if(this.atkChance >= randomInt(1,100)){
                        var attackDmg = randomInt(this.minDmg,this.maxDmg);
                        target.hp -= attackDmg;
                        return attackDmg;
                }
                else{
                        return null;
                }
        }
        Game_Entity.prototype.isAlive = function(){
                if(this.hp<= 0){
                        return false;
                }
                else{
                        return true;
                }
        }
        Game_Entity.prototype.run = function(){
                if(randomInt(1,100)< this.escChance){
                        console.log('running');
                        sendMessage("You ran away. Pretty lame.", true);
                        endCombat('run');
                        return true;
                }
                else{
                        sendMessage('blocked!!!!', true);
                        return false;
                }
        
        }
}

function Enemy(index, name,hp,dmg,aggro,atk,esc){
	this.index = index;
	this.name = name;
	this.hp = hp;
	this.maxDmg = dmg;
	this.minDmg = 0;
	this.atkChance = atk;
	this.escChance = esc;
	this.aggro = aggro;  //chance on whether monster will attack of flee from 0-1
	this.maxHp = this.hp;
	
	Enemy.prototype.draw = function(){		
		 d_ctx.drawImage(enemy_pics[this.index], 0, 0, 400,400);
	}
	
	Enemy.prototype.isAlive = function(){
		if(this.hp> 0){
			return true;
		}
		else{ 
			return false;
		}
	}
	Enemy.prototype.die = function(){
		this.hp = this.maxHp;
	}
	
	Enemy.prototype.takeTurn = function(){
		/*
		if(1-this.hp/maxhp >aggro){
			if(Math.random()> aggro){
				this.run();
				return;
			}
		}
		*/
		console.log("Enemy is attacking!");
		sendMessage("The " + this.name + " is attacking!", false);
		var result = this.attack(hero);
		if(result != null){
			var feedback = "The " + this.name + " hit you for " + result + " damage!"
			console.log("feedback string = " + feedback);
			if(result >= 5){
				console.log("doing shake");
				game_box.shake();
			}
			else if(result >=1){
				fightArea.redFlash();
			}
			sendMessage( feedback, false);
		}
		else{
			var feedback = "The " + this.name + " missed you!";
			sendMessage(feedback, false);
		}
	}
	
	Enemy.prototype.greeting = function(){
		sendMessage("A " + this.name + " approaches. The " + this.name + " leers at you.", true);
	}
}
Enemy.prototype.constructor = Enemy();
Enemy.prototype = new Game_Entity();

function handleBegin(){
	buttonsOn(false,false,false,false);
	loadEnemyPics();
	fillEnemyArray();
	sounds.init();

	var checkLoading = setInterval(function(){
		if(sounds.loadComplete()){
				buttonsOn(true,true,true,true);
				state = TREASURE;
				sendMessage("Press fight to begin your journey", true);
				clearInterval(checkLoading);
			}
		}, 100);
}


function resolveCombat(result){
	if(result!= null){
		var feedback = "You hit the " + current_enemy.name + " for " + result + " damage!"
		fightArea.whiteFlash();
		console.log("feedback string = " + feedback);
		sendMessage( feedback, true);
		console.log ("Enemy hp = " + current_enemy.hp);
	}
	else{
		console.log("miss");
		var feedback = "You missed the " + current_enemy.name + "!";
		sendMessage(feedback, true);
	}
	

}

function handleCombat(action){
	switch(action){
		case 'fight':
			var result = hero.attack(current_enemy);
			resolveCombat(result);
			break;
		case 'item':
			openItemMenu();
			break;
		case 'run':
			if(hero.run()){
				state = TREASURE;
				handleTreasure('run');
			}
			else{
				handleEnemy();
			}
			break;
	}	
}

function handleEnemy(){
			if(current_enemy.isAlive()){
				current_enemy.takeTurn();
			}
			else{
				var feedback = "You have defeated the "+ current_enemy.name + " Congratulations!";
				sendMessage(feedback, false);
				endCombat('victory');
			}
}

function giveTreasure(){
	var xpGain = current_enemy.hp;
	var gldGain = current_enemy.maxDmg;
	sendMessage( "you got " + xpGain + "xp and " + gldGain + " gold.", false );
	hero.xp += xpGain;
	hero.gld += gldGain;
}

function handleTreasure(action){
	shopButton.disabled= false;
	console.log('state = TREASURE');
	switch(action){
		case 'fight':
			initCombat();
			break;
		case 'dead enemy':
			giveTreasure();
			break;
		case 'item':
			openItemMenu();
			break;
		case 'shop':
			openShopMenu();
			break;
		case 'run':
			break;
	}
}

function handle(action){
	console.log("event function triggering " + action);
	switch(state){
		case BEGIN:
			handleBegin();
			break;
		case COMBAT:
			shopButton.disabled = true;
			handleCombat(action);
			break;
		case TREASURE:
			shopButton.disabled = false;
			handleTreasure(action);
			break;
	}
	console.log("setting stats");
	setStats();	
}

hero = new Game_Entity(10,1);
hero.weapon = noWeapon;
hero.name = "You";
hero.maxHp = 10;
hero.xp = 0;
hero.nextLvlXp = 100;
hero.lvl = 1;
hero.gld = 100;
hero.maxDmg = 1 + hero.lvl + hero.weapon.dmgBonus; 
hero.minDmg = 1 + hero.lvl -1;
hero.weapons = [noWeapon];
hero.inventory = [];

hero.levelUp = function(){
	console.log('hero gaining new level');
	hero.lvl++;
	sendMessage("You have reached the next Level.", false);
	hero.nextLvlXp =  hero.nextLvlXp * 2;
	sendMessage("xp to next level is " + hero.nextLvlXp, false);
	hero.maxDmg = 1 + hero.lvl + hero.weapon.dmgBonus; 
	hero.minDmg = 1 + hero.lvl -1;
	hero.maxHp += 10;
}

hero.checkLevel = function(){
	console.log(hero.nextLvlXp +" xp for next lvl " + hero.xp + " current xp");
	if(hero.xp >= hero.nextLvlXp){
		hero.levelUp();
	}
	else{
		console.log('no new level');
	}
}


setStats();



