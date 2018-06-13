(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemsToBuyList = this;

  itemsToBuyList.items = ShoppingListCheckOffService.getItemsToBuy();

  itemsToBuyList.addItemBought = function (itemIndex) {
    ShoppingListCheckOffService.addItemBought(itemIndex);
    itemsToBuyList.emptyBuyListMessage = ShoppingListCheckOffService.getEmptyBuyListMessage();
  }

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemsAlreadyBoughtList = this;

  itemsAlreadyBoughtList.emptyMessage = ShoppingListCheckOffService.getEmptyBoughtListMessage();

  itemsAlreadyBoughtList.items = ShoppingListCheckOffService.getItemsAlreadyBought();

}



function ShoppingListCheckOffService() {
  var service = this;

  // List of items to buy
  var itemsToBuy = [ { name: "cookies", quantity: 10 },
                     { name: "apples", quantity: 3 },
                     { name: "bananas", quantity: 2 },
                     { name: "tomatoes", quantity: 15 },
                     { name: "strawberries", quantity: 35 },
                     { name: "blueberries", quantity: 50 }
                   ];

  // List of items already bought
  var itemsAlreadyBought = [];

  var emptyBuyListMessage = undefined;
  var emptyBoughtListMessage = "Nothing bought yet.";

  service.addItemBought = function (itemIndex) {
    var boughtItems = itemsToBuy.splice(itemIndex, 1);
    itemsAlreadyBought.push(boughtItems[0]);
    if (itemsToBuy.length == 0) {
      emptyBuyListMessage = "Everything is bought!";
  	  console.log(emptyBuyListMessage);
  	}
    if (itemsAlreadyBought.length !== 0) {
    	emptyBoughtListMessage = undefined;
  	    console.log(emptyBoughtListMessage);
      }
  };

  service.getItemsToBuy = function() {
    console.log("Items to Buy: " + itemsToBuy);
    return itemsToBuy;
  };

  service.getItemsAlreadyBought = function() {
    console.log("Items already bought: " + itemsAlreadyBought);
    return itemsAlreadyBought;
  };

  service.getEmptyBuyListMessage = function() {
	  console.log(emptyBuyListMessage);
	  return emptyBuyListMessage;
  }

  service.getEmptyBoughtListMessage = function() {
	  console.log(emptyBoughtListMessage);
	  return emptyBoughtListMessage;
  }
}

})();
