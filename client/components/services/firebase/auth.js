'use strict';

var registerService = require('services/register');

var firebase = require('firebase/app');
require('firebase/auth');

var name = 'services.firebase.auth';

registerService('factory', name, [require('services/promise'),
  function(Promise) {
    var _currentUser = null;

    function FirebaseAuth() {

    }

    FirebaseAuth.loginWithUsernameAndPassword
      = function(username, password) {
        return Promise(function(resolve, reject, notify) {
          firebase.auth().signInWithEmailAndPassword(username, password)
          .then(function(firebaseUser) {
            _currentUser = firebaseUser;
            resolve();
          })
          .catch (function(error) {
            reject(error);
          })
        })
      }

    FirebaseAuth.getCurrentUser = function() {
      return _currentUser;
    }

    FirebaseAuth.getToken = function() {
      var self = this;

      return Promise(function(resolve, reject, notify) {
        self.getCurrentUser().getIdToken()
        .then(function(token) {
          resolve(token);
        })
        .catch(function(error) {
          reject(error);
        })
      })
    }

    return FirebaseAuth;
  }
]);

module.exports = name;
