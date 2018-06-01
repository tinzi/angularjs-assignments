(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  const ENJOY_MSG = "Enjoy!";
  const TOO_MUCH_MSG = "Too much!";
  const EMPTY_LIST_MSG = "Please enter data first";

  $scope.lunchItemList = "";
  $scope.feedbackMessage = EMPTY_LIST_MSG;

  $scope.checkItems = function () {
    if ($scope.lunchItemList == "") {
      $scope.feedbackMessage = EMPTY_LIST_MSG;
    }
    else {
      var numItems = countItems($scope.lunchItemList);
      if (numItems > 3) {
        $scope.feedbackMessage = TOO_MUCH_MSG;
      }
      else {
          $scope.feedbackMessage = ENJOY_MSG;
      }
    }
  };

function countItems(itemString) {
  var itemArray = itemString.split(',');
  return itemArray.length;
}

};


})();
