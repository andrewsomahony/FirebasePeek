'use strict';

var registerService = require('services/register');

var name = 'services.firebase.peek';

registerService('factory', name, [
  require('services/firebase/info'),
  require('services/firebase/auth'),
  require('services/serial_promise'),
  require('services/promise'),
  require('services/http_service'),
function(FirebaseInfo,
  FirebaseAuth, SerialPromise, Promise, HTTPService) {
  function FirebasePeek() {

  }

  FirebasePeek.peekAtKey = function(key) {
    return Promise(function(resolve, reject, notify) {
      SerialPromise([
        function(data, index, isNotify) {
          return Promise(function(resolve, reject, notify) {
            FirebaseAuth.getToken()
            .then(function(token) {
              resolve({token: token});
            })
            .catch(function(error) {
              reject(error);
            });
          });
        },

        function(data, index, isNotify) {
          return Promise(function(resolve, reject, notify) {
            var keyURL = FirebaseInfo.getDatabaseURL() + key + ".json";

            keyURL += "?";
            keyURL += "shallow=true";
            keyURL += "&auth=";
            keyURL += data['token'];

            HTTPService.get(keyURL)
            .then(function(data) {
              resolve({peek: data.data});
            })
            .catch(function(error) {
              reject(error);
            });
          });
        }
      ], ['token'], [], true, false)
      .then(function(peekedData) {
        resolve(peekedData);
      })
      .catch(function(error) {
        reject(error);
      });
    });
  }

  return FirebasePeek;
}]);

module.exports = name;
