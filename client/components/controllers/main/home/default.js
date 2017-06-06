'use strict';

var registerController = require('controllers/register');

var utils = require('utils');

var name = 'controllers.main.home.default';

registerController(name, ['$scope',
require('services/firebase/auth'),
require('services/firebase/peek'),
function($scope, FirebaseAuth, FirebasePeek) {
  var userInfo = {
    name: FirebaseAuth.getCurrentUser().email,
  };

  var firebaseInfo = {
    key: "",
    values: ""
  };

  $scope.userInfo = userInfo;
  $scope.firebaseInfo = firebaseInfo;

  $scope.peek = function() {
    var self = this;

    FirebasePeek.peekAtKey(self.firebaseInfo.key)
    .then(function(data) {
      self.firebaseInfo.values = utils.toJson(data);
    })
    .catch(function(error) {
      alert(error.text);
    })
  }


}]);

module.exports = name;
