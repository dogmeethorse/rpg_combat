function buyItem(item){
	return function(){
		shopInventory[item].buy()
	}
}
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
	
	var itemList = document.createElement('div');
	var itemButtons = [];
	var itemNo;
	
	for(itemNo = 0; itemNo < hero.inventory.length; itemNo++){
		itemButtons[itemNo] = document.createElement('button');
		itemButtons[itemNo].setAttribute('value',hero.inventory[itemNo]);
		itemButtons[itemNo].click = function(){ hero.inventory[itemNo].quaff;};// not going to work
		itemButtons[itemNo].innerHTML = hero.inventory[itemNo].name;
		itemsToBuy.appendChild(itemButtons[itemNo]);	
	}
	
	var closeItems = document.createElement('button');
	closeItems.setAttribute('onclick', 'closeItemMenu(itemMenu)');
	closeItems.innerHTML = "CLOSE";
	itemMenu.appendChild(weaponList);
	itemMenu.appendChild(itemList);
	itemMenu.appendChild(closeItems);
	
	return itemMenu;	
}

function openItemMenu(){
	fightButton.disabled = true;
	shopButton.disabled  = true;
	itemButton.disabled  = true;
	runButton.disabled   = true;
	
	itemMenu = createItemMenu();
	background.appendChild(itemMenu);
}

function closeItemMenu(itemMenu){
	background.removeChild(itemMenu);
	sendMessage("You are now wielding " + hero.weapon.name, true);
	
	fightButton.disabled = false;
	shopButton.disabled  = false;
	itemButton.disabled  = false;
	runButton.disabled   = false;
	if(state == COMBAT){
		current_enemy.takeTurn();		
	}
}

function createShopMenu(){
	var shopMenu = document.createElement('div');
	
	shopMenu.setAttribute('class','game');
	shopMenu.setAttribute('id', 'shopMenu');
	shopMenu.innerHTML = '<h3>SHOP<h3>'
	
	var weaponList = document.createElement('div');
	var shopButtons = [];
	//adding weapons
	for(var weap = 0; weap < shopWeapons.length; weap++){
		shopButtons[weap] = document.createElement('button')
		shopButtons[weap].setAttribute('value', shopWeapons[weap].name);
		shopButtons[weap].innerHTML = shopWeapons[weap].name + " price " + shopWeapons[weap].cost + "gld";
		weaponList.appendChild(shopButtons[weap]);
	}
	
	//adding items
	var itemsToBuy = document.createElement('div');
	var itemButtons =[]
	var itemNo;
	for(itemNo = 0; itemNo < shopInventory.length; itemNo++ ){
		itemButtons[itemNo] = document.createElement('button');
		itemButtons[itemNo].textContent= shopInventory[itemNo].name;
		itemButtons[itemNo].addEventListener('click', buyItem(itemNo),false);
		
		itemsToBuy.appendChild(itemButtons[itemNo]);
	}
	
	var closeShop = document.createElement('button');
	closeShop.setAttribute('onclick', 'closeShopMenu(shopMenu)');
	closeShop.innerHTML = "CLOSE";
	shopMenu.appendChild(weaponList);
	shopMenu.appendChild(itemsToBuy);
	shopMenu.appendChild(closeShop);
	
	return shopMenu;	
}

function openShopMenu(){
	fightButton.disabled = true;
	shopButton.disabled  = true;
	runButton.disabled   = true;
	
	shopMenu = createShopMenu();
	background.appendChild(shopMenu);
}

function closeShopMenu(shopMenu){
	background.removeChild(shopMenu);
	
	fightButton.disabled = false;
	shopButton.disabled  = false;
	itemButton.disabled  = false;
	runButton.disabled   = false;
}