function Weapon(name,dmgBonus, attackChanceBonus){
	this.name = name;
	this.dmgBonus = dmgBonus;
	this.attackChanceBonus = attackChanceBonus;
	
	
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

var noWeapon = new Weapon("Bare Hands", 0, 0);
var stick = new Weapon('Wooden Stick', 2, 4)
var dagger = new Weapon('Dagger', 4, 5);
var shortSword = new Weapon('Short Sword', 6, 8);
var flail = new Weapon('Flail', 8, 8);
var longSword = new Weapon('Long Sword', 10, 10);
