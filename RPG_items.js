
function Weapon(name,dmgBonus, attackChanceBonus, cost){
	this.name = name;
	this.dmgBonus = dmgBonus;
	this.attackChanceBonus = attackChanceBonus;
	this.cost = cost;
	
	
	Weapon.prototype.equip = function(){
		hero.weapon.unequip();
		hero.weapon = this;
		hero.maxDmg += this.dmgBonus;
		hero.atk += this.attackChanceBonus;
		console.log("wielding :"+ hero.weapon.name);
	}
	
	Weapon.prototype.unequip = function(){
		hero.maxDmg -= this.dmgBonus;
		hero.atk -= this.attackChanceBonus;
	}
	Weapon.prototype.buy = function(){
		console.log(this);
		console.log(" buying = "+ this.name + " cost = " + this.cost);
		if(hero.gld >= this.cost){
			hero.weapons.push(new Weapon(this.name , this.dmgBonus, this.cost));
			hero.gld -= this.cost;		
			sendMessage("You bought a "+ this.name,true);
		}
		else{
			sendMessage("You cannot afford "+ this.name, true);
		}
		setStats();
	}
}

var noWeapon = new Weapon("Bare Hands", 0, 0, 0);
var stick = new Weapon('Wooden Stick', 2, 4, 5);
var dagger = new Weapon('Dagger', 4, 5, 20);
var shortSword = new Weapon('Short Sword', 6, 8, 50);
var flail = new Weapon('Flail', 8, 8, 100);
var longSword = new Weapon('Long Sword', 10, 10, 170);

var shopWeapons = [stick, dagger, shortSword, flail, longSword];

//Other Inventory

function healingPotion(name,strength, cost){
	this.name = name;
	this.strength = strength;
	this.cost = cost;
	
	healingPotion.prototype.quaff = function(){
		hero.hp += this.strength;
		if(hero.hp > hero.maxHp){
			hero.hp = hero.maxHp;
		}
		
		hero.inventory.splice(hero.inventory.indexOf(this), 1);
		setStats();
		closeItemMenu(itemMenu);
		sendMessage("You quaff the "+ this.name + " and gain " + this.strength + "hp", false);
	}
	
	healingPotion.prototype.buy = function(){
		console.log(this);
		console.log('trying to buy potion');
		console.log("name ="+ this.name + "cost = " + this.cost);
		if(hero.gld >= this.cost){
			console.log("buying Potion");
			
			hero.inventory.push(new healingPotion(this.name , this.strength, this.cost));
			hero.gld -= this.cost;
			
			sendMessage("You bought a "+ this.name,true);
			
			console.log("hero inventory length ="+ hero.inventory.length);
			console.log(hero.inventory);
			setStats();
		}
		else{
			sendMessage("You cannot afford "+ this.name, true);
		}
		
	}
}

var smallPotion = new healingPotion('Small Potion', 5, 5);
var largePotion = new healingPotion('Large Potion', 20, 15);

var shopInventory =[ smallPotion, largePotion];