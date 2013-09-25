var slime1hp = 10;
var outputElement = document.getElementById('output');

function randomInt(min,max){
            return Math.floor(Math.random() * (max - (min-1) )) + min;
        }
        
function sendMessage(output,replace){
   	if(addOrReplace == true){
       	outputElement.innerHTML = '<p>' + output + '</p>';
    }
   	else{
        outputElement.innerHTML += '<p>' + output + '</p>';
    }
}

function Game_Entity(hp,dmg){
	this.dmg = 1;
	this.hp = 10;
}

hero = new Game_Entity(10,1);
