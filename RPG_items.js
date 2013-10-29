function createItemMenu(){
	var itemMenu = document.createElement('div');
	
	itemMenu.setAttribute('class','game');
	itemMenu.setAttribute('id', 'itemMenu');
	itemMenu.innerHTML = '<h3>ITEMS<h3>'
	
	var weaponList = document.createElement('select');
	
	weaponList.setAttribute("onChange","hero.weapons[this.selectedIndex].equip()");
	var option = [];
	
	for(var weap = 0; weap < hero.weapons.length; weap++){
		option[weap] = document.createElement('option')
		option[weap].setAttribute('value', hero.weapons[weap].name);
		option[weap].innerHTML = hero.weapons[weap].name;
		weaponList.appendChild(option[weap]);
	}
	
	var closeItems = document.createElement('button');
	closeItems.setAttribute('onclick', 'closeItemMenu(itemMenu)');
	closeItems.innerHTML = "CLOSE";
	itemMenu.appendChild(weaponList);
	itemMenu.appendChild(closeItems);
	
	return itemMenu;
	
}

function openItemMenu(){
	itemMenu = createItemMenu();
	background.appendChild(itemMenu);
}

function closeItemMenu(itemMenu){
	background.removeChild(itemMenu);
}