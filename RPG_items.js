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
}

var noWeapon = new Weapon("Bare Hands", 0, 0, 0);
var stick = new Weapon('Wooden Stick', 2, 4, 5)
var dagger = new Weapon('Dagger', 4, 5, 20);
var shortSword = new Weapon('Short Sword', 6, 8, 50);
var flail = new Weapon('Flail', 8, 8, 100);
var longSword = new Weapon('Long Sword', 10, 10, 170);

var shopWeapons = [stick, dagger, shortSword, flail, longSword];

//Other Inventory

function healingPotion(name,strength,cost){
	this.name = name;
	this.strength = strength;
	this.cost = cost;
	
	healingPotion.prototype.quaff = function(){
		hero.hp += this.strength;
		sendMessage("You quaff the "+ this.name + " and gain " + this.strength + "hp");
	}
}