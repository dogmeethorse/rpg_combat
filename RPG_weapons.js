function Weapon(name,dmgBonus, attackChanceBonus){
	this.name = name;
	this.dmgBonus = dmgBonus;
	this.attackChanceBonus = attackChanceBonus;
}

var noWeapon = new Weapon('None', 0,0);
var shortSword = new Weapon('Short Sword', 2, 8);
var flail = new Weapon('Flail',3, 12);
var longSword = new Weapon('Long Sword', 5, 10);
