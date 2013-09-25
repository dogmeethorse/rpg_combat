
var dragon_screen = document.getElementById('game_screen');
var d_ctx = dragon_screen.getContext('2d');

var outputElement = document.getElementById('output');
var statOutputEl = document.getElementById('stats');
var messageEl = document.getElementById('message_box');

function randomInt(min,max){
            return Math.floor(Math.random() * (max - (min-1) )) + min;
        }
        
function sendMessage(output,replace){
   	if(addOrReplace == true){
       	outputElement.innerHTML = '<p class="game">' + output + '</p>';
    }
   	else{
        outputElement.innerHTML += '<p class="game">' + output + '</p>';
    }
}

function setStats(){
	statOutputEl.innerHTML = "<p class='game'> HP: " + hero.hp +"<br>XP: " + hero.xp + "<br> LVL: " + hero.lvl+ "<br> GLD: " + hero.gld + "</p>";
}

function Game_Entity(hp,dmg){
	this.maxDmg = dmg;
	this.minDmg = 1;
	this.hp = hp;
	this.atkChance = 50;
	this.alive = true;
	
	Game_Entity.prototype.attack = function(target){
		if(atkChance >= randomInt(1,100)){
			attackDmg = randomInt(this.minDmg,this.maxDmg);
			target.hp -= attackDmg;
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
}

function handle(action){
	switch(action){
	case 'attack':
		hero.attack();
	break;
	case 'defend':
	break;
	case 'item':
	break;
	case 'run':
	break;
	}
	setStats();
}

hero = new Game_Entity(10,1);
hero.xp = 0;
hero.lvl = 1;
hero.gld = 0;
setStats();