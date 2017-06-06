'use strict';

var registerService = require('services/register');

var name = 'services.firebase.info';

registerService('factory', name, [
function() {
  var databaseName = "undergroundsheq";
  var databaseProtocol = "https";

  function FirebaseInfo() {

  }

  FirebaseInfo.getDatabaseURL = function() {
    return databaseProtocol + "://" + databaseName + ".firebaseio.com/";
  }

  return FirebaseInfo;
}
]);

module.exports = name;
