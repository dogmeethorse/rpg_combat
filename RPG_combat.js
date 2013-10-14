/* We now have a current enemy and have created a slime enemy
 * the next step is to make it so that the message box sends the user input so that we can test to see if the 
 * program is functioning properly so that we can debug.
 * Now I added some sample dialog and a name prop to enemy.
 * GET ATTACKS WORKING THEN ADD GAME STATES.
 */


const BEGIN    = 10;
const ENDGAME  =  0;
const COMBAT   = 20;
const TREASURE = 30;
const ITEMS    = 40;


var state = BEGIN;

var dragon_screen = document.getElementById('game_screen');
var d_ctx = dragon_screen.getContext('2d');

var outputElement = document.getElementById('output');
var statOutputEl = document.getElementById('stats');
var messageEl = document.getElementById('message_box');

var combat_happening = true;// should start the game as false
var current_enemy = null;


function randomInt(min,max){
            return Math.floor(Math.random() * (max - (min-1) )) + min;
        }
        
function sendMessage(output,addOrReplace){
   	if(addOrReplace == true){
       	messageEl.innerHTML = '<p class="game">' + output + '</p>';
    }
   	else{
        messageEl.innerHTML += '<p class="game">' + output + '</p>';
    }
}

function setStats(){
	statOutputEl.innerHTML = "<p class='game'> HP: " + hero.hp +"<br>XP: " + hero.xp + "<br> LVL: " + hero.lvl+ "<br> GLD: " + hero.gld + "</p>";
}

function endCombat(){

}

function Game_Entity(hp,dmg){
	this.maxDmg = dmg;
	this.minDmg = 1;
	this.hp = hp;
	this.atkChance = 50;
	this.alive = true;
	this.escChance = 50;
	
	Game_Entity.prototype.attack = function(target){
		if(atkChance >= randomInt(1,100)){
			attackDmg = randomInt(this.minDmg,this.maxDmg);
			target.hp -= attackDmg;
			return attackDmg;
		}
		else{
			return false;
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
		if(randomInt(1,50)< this.escChance){
			
		}
	
	}
}



function Enemy(hp,dmg,aggro,atk,esc, name){
	this.name = name;
	this.atkChance = atk;
	this.escChance = esc;
	this.aggro = aggro;  //chance on whether monster will attack of flee from 0-1
	var maxHp = this.hp;
	
	Enemy.prototype.takeTurn = function(){
		if(1-this.hp/maxhp >aggro){
			if(Math.random()> aggro){
				this.run();
				return;
			}
		}
		this.attack();
	}
	
	Enemy.prototype.greeting = function(){
		sendMessage("A " + this.name + " approaches. The " + this.name + " leers at you.", true);
	}
}
Enemy.prototype= new Game_Entity();
Enemy.prototype.constructor = Enemy();

function handleBegin(){
	current_enemy = new Enemy(3,1,0,0,20,'slime');
	console.log("check to see if slime.name exists: " + slime.name);
	console.log("Current Enemy: " + current_enemy.name);
	current_enemy.greeting();
	state = COMBAT;
}

function handleCombat(action){
	switch(action){
			case 'fight':
				var result = hero.attack(current_enemy);
			break;
			case 'defend':
			break;
			case 'item':
			break;
			case 'run':
			break;
		}
	
	if(result!= null){
		var feedback = "You hit the " + current_enemy.name + "for" + result + "damage!"
		console.log("feedback string = " + feedback);
		sendMessage( feedback, true);
	}
	
	if(current_enemy.isAlive()){
		current_enemy.attack(hero);
	}
	else{
		var feedback = "You have defeated the "+ current_enemy.name + " Congratulations!";
		sendMessage(feedback, false);
	}
	
}

function handle(action){
	console.log("event function triggering " + action);
	switch(state)
		case BEGIN:
			handleBegin();
			break;
		case COMBAT:
			handleCombat(action);
			break;
		
	}
	setStats();	
}

hero = new Game_Entity(10,1);
hero.xp = 0;
hero.lvl = 1;
hero.gld = 0;
setStats();



