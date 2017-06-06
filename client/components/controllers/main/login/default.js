'use strict';

var registerController = require('controllers/register');

var name = 'controllers.main.login.default';

registerController(name, ['$scope',
require('services/firebase/auth'),
require('services/state_service'),
function($scope, FirebaseAuth, StateService) {
  $scope.userInformation = {
    email: "",
    password: ""
  }

  $scope.doLogin = function() {
    var self = this;

    FirebaseAuth
    .loginWithUsernameAndPassword(
      self.userInformation.email, self.userInformation.password)
    .then(function() {
      // Redirect
      StateService.go('main.home');
    })
    .catch (function(error) {
      alert(error.message);
    })
  }
}]);

module.exports = name;
