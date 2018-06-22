(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
function NarrowItDownController(MenuSearchService) {
  var nitc = this;

  nitc.items = undefined;
  nitc.searchTerm = "";

  nitc.narrowItDown = function () {
    nitc.items = [];
  	MenuSearchService.getMatchedMenuItems(nitc.searchTerm, nitc.items);
  }

  nitc.removeItem = function(index) {
    nitc.items.splice(index,1);
  }

  nitc.isProcessing = function() {
    return MenuSearchService.processing;
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.processing = false;

  service.getMatchedMenuItems = function(searchTerm, foundItems) {

    service.processing = true;

    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });

    return response.then (function(result) {
      // process result and only keep items that match
      // if (searchTerm == "") {
    	//   foundItems = [result.data.menu_items];
      // }
      // else {
      if (!(searchTerm == "")) {
        for (var i = 0; i < result.data.menu_items.length; i++) {
    	    var item = result.data.menu_items[i];
          if (item.description.match(searchTerm.toLowerCase())) {
            foundItems.push(item);
          }
        }
      }
      // return processed items
      service.processing = false;
    }
  );}
}

function FoundItemsDirective() {
	var ddo = {
        restrict: 'E',
		    templateUrl: 'narrowitdownList.html',
		    scope: {
		      items: '<',
		      onRemove: '&',
          isProcessing: '&'
		    }
		  };
		  return ddo;
}

})();
