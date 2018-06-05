(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  const ENJOY_MSG = "Enjoy!";
  const TOO_MUCH_MSG = "Too much!";
  const EMPTY_LIST_MSG = "Please enter data first";
  const GREEN_MESSAGE_CLASS = "message-green";
  const RED_MESSAGE_CLASS = "message-red";
  const GREEN_BORDER_CLASS = "border-green";
  const RED_BORDER_CLASS = "border-red";
  const HEALTHY_NUM_ITEMS = 3;

  $scope.lunchItemList = "";
  $scope.feedbackMessage = EMPTY_LIST_MSG;
  $scope.messageClass = RED_MESSAGE_CLASS;
  $scope.borderColor = RED_BORDER_CLASS;

  $scope.checkItems = function () {
    var numItems = countItems($scope.lunchItemList);
    if (numItems == 0) {
      $scope.feedbackMessage = EMPTY_LIST_MSG;
      $scope.messageClass = RED_MESSAGE_CLASS;
      $scope.borderColor = RED_BORDER_CLASS;
    }
    else {
      $scope.messageClass = GREEN_MESSAGE_CLASS;
      $scope.borderColor = GREEN_BORDER_CLASS;
      if (numItems > HEALTHY_NUM_ITEMS) {
        $scope.feedbackMessage = TOO_MUCH_MSG;
      }
      else {
        $scope.feedbackMessage = ENJOY_MSG;
      }
    }
  };

function countItems(itemString) {
  var itemArray = itemString.split(',');
  var numItems = itemArray.length;
  for (var i = 0; i < itemArray.length; i++ ) {
    if (itemArray[i].trim() == "") {
      numItems = numItems - 1;
    }
  }
  return numItems;
}

};


})();
