'use strict';

var m = require('./module');

module.exports = function(controllerName, parameters) {
  m.controller(controllerName, parameters);
}
