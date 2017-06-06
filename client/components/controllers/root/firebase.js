'use strict';

var registerController = require('controllers/register');

var firebase = require('firebase');

var name = 'controllers.root.firebase';

registerController(name, ['$rootScope',
function($rootScope) {
    var config = {
      apiKey: "AIzaSyB7pCtMVSKYfEgtg5nqCz6TfEQvf6kRZ3M",
      authDomain: "undergroundsheq.firebaseapp.com",
      databaseURL: "https://undergroundsheq.firebaseio.com",
      projectId: "undergroundsheq",
      storageBucket: "undergroundsheq.appspot.com",
      messagingSenderId: "623470805245"
    };
    firebase.initializeApp(config);
}]);

module.exports = name;
